import { Box } from "@mui/material";
import DeckGL from "@deck.gl/react";
import { EditableGeoJsonLayer } from "@nebula.gl/layers";
import { DrawPolygonMode, ViewMode } from "@nebula.gl/edit-modes";
import { GeoJsonLayer, ScatterplotLayer } from "@deck.gl/layers";
import { Map, MapLayerMouseEvent } from "react-map-gl/maplibre";
import { useEffect, useMemo, useState } from "react";
import { useGeoStore } from "@/store/useGeoStore";
import { INITIAL_VIEW_STATE, MAP_STYLES, MAP_STYLE_URL } from "@/constants/map";
import {
  SELECTED_FEATURE_COLOR,
  DEFAULT_VIEW_LAYER_COLOR,
} from "@/constants/theme";
import { enrichFeature } from "@/utils/featureEnrichment";
import type {
  DeckGLViewState,
  DeckGLViewStateChangeEvent,
  EditableLayerEditEvent,
  LayerAccessorInfo,
  ScatterplotDataPoint,
} from "@/types/deckgl";
import type { ModeType } from "@/types/ui";

type Props = {
  mode: ModeType;
  searchLocation?: { lat: number; lon: number } | null;
};

export const MapView = ({ mode, searchLocation = null }: Props) => {
  const { geojson, setGeojson, selectedIndex, setSelectedIndex, style } =
    useGeoStore();
  const [viewState, setViewState] = useState<DeckGLViewState>({
    ...INITIAL_VIEW_STATE,
  });

  useEffect(() => {
    if (searchLocation) {
      setViewState((prevState) => ({
        ...prevState,
        latitude: searchLocation.lat,
        longitude: searchLocation.lon,
        zoom: MAP_STYLES.SEARCH_ZOOM,
      }));
    }
  }, [searchLocation]);

  const nebulaMode = useMemo(() => {
    return mode === "draw_polygon" ? DrawPolygonMode : ViewMode;
  }, [mode]);

  const editableLayer = useMemo(
    () =>
      new (EditableGeoJsonLayer as any)({
        id: "editable",
        data: geojson,
        mode: nebulaMode,
        pickable: true,
        selectedFeatureIndexes: selectedIndex !== null ? [selectedIndex] : [],
        onEdit: ({ updatedData }: EditableLayerEditEvent) => {
          if (!updatedData) return;

          const enriched = {
            ...updatedData,
            features: (updatedData.features || []).map(
              (feature: unknown, index: number) =>
                enrichFeature(
                  feature as Parameters<typeof enrichFeature>[0],
                  index
                )
            ),
          };

          setGeojson(enriched);
        },
        getFillColor: (info: LayerAccessorInfo) => {
          const index = info.index;
          return index === selectedIndex
            ? SELECTED_FEATURE_COLOR.fill
            : style.fillColor;
        },
        getLineColor: (info: LayerAccessorInfo) => {
          const index = info.index;
          return index === selectedIndex
            ? SELECTED_FEATURE_COLOR.line
            : style.lineColor;
        },
        getLineWidth: 2,
        lineWidthMinPixels: 2,
      }),
    [geojson, nebulaMode, selectedIndex, style, setGeojson]
  );

  const geoJsonViewLayer = useMemo(
    () =>
      new GeoJsonLayer({
        id: "geojson-view",
        data: geojson,
        pickable: true,
        stroked: true,
        filled: true,
        getFillColor: (_: unknown, { index }: LayerAccessorInfo) => {
          return index === selectedIndex
            ? SELECTED_FEATURE_COLOR.fill
            : DEFAULT_VIEW_LAYER_COLOR.fill;
        },
        getLineColor: (_: unknown, { index }: LayerAccessorInfo) => {
          return index === selectedIndex
            ? SELECTED_FEATURE_COLOR.line
            : DEFAULT_VIEW_LAYER_COLOR.line;
        },
      }),
    [geojson, selectedIndex]
  );

  const searchLayer = useMemo(() => {
    if (!searchLocation) return null;

    const data: ScatterplotDataPoint[] = [
      { position: [searchLocation.lon, searchLocation.lat] },
    ];

    return new ScatterplotLayer({
      id: "search-marker",
      data,
      getPosition: (d: ScatterplotDataPoint) => d.position,
      getRadius: MAP_STYLES.MARKER_RADIUS,
      radiusUnits: "meters",
      getFillColor: MAP_STYLES.MARKER_COLOR,
    });
  }, [searchLocation]);

  const layers = [
    editableLayer,
    geoJsonViewLayer,
    ...(searchLayer ? [searchLayer] : []),
  ].filter(Boolean);

  const handleViewStateChange = (evt: DeckGLViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  const handleMapClick = (e: MapLayerMouseEvent) => {
    const pickedObject = (e as unknown as { object?: { index?: number } })
      .object;
    if (pickedObject && typeof pickedObject.index === "number") {
      setSelectedIndex(pickedObject.index);
    } else {
      setSelectedIndex(null);
    }
  };

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers as unknown}
        onViewStateChange={handleViewStateChange}
      >
        <Map mapStyle={MAP_STYLE_URL} onClick={handleMapClick} />
      </DeckGL>
    </Box>
  );
};

export default MapView;

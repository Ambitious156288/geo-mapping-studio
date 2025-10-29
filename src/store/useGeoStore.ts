import { create } from "zustand";
import type { Feature, FeatureCollection } from "geojson";
import type { PartialFeature } from "@/types/geojson";
import { DEFAULT_FILL_COLOR, DEFAULT_LINE_COLOR } from "@/constants/theme";

type GeoState = {
  geojson: FeatureCollection;
  setGeojson: (g: FeatureCollection) => void;
  addFeature: (f: Feature) => void;
  clear: () => void;
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  style: {
    fillColor: [number, number, number, number];
    lineColor: [number, number, number, number];
  };
  setStyle: (s: Partial<GeoState["style"]>) => void;
};

const EMPTY_FEATURE_COLLECTION: FeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

const normalizeFeature = (feature: PartialFeature, index: number): Feature => {
  const geometry = feature.geometry || { type: "Point", coordinates: [] };
  const baseProps = feature.properties || {};
  const hasId = Object.prototype.hasOwnProperty.call(baseProps, "id");
  const hasLabel = Object.prototype.hasOwnProperty.call(baseProps, "label");

  const nextProps = { ...baseProps } as Record<string, unknown>;

  if (!hasId) {
    nextProps.id = index;
  }

  if (!hasLabel) {
    const geometryType = (geometry as { type?: string }).type || "Geometry";
    nextProps.label = `${geometryType} ${index}`;
  }

  return {
    type: "Feature",
    geometry: geometry as Feature["geometry"],
    properties: nextProps,
  };
};

export const useGeoStore = create<GeoState>((set) => ({
  geojson: EMPTY_FEATURE_COLLECTION,
  selectedIndex: null,
  style: {
    fillColor: DEFAULT_FILL_COLOR,
    lineColor: DEFAULT_LINE_COLOR,
  },

  setGeojson: (g: FeatureCollection) =>
    set(() => {
      const normalized: FeatureCollection = {
        type: "FeatureCollection",
        features: (g.features || []).map(normalizeFeature),
      };
      return { geojson: normalized };
    }),

  addFeature: (f: Feature) =>
    set((state: GeoState) => ({
      geojson: {
        ...state.geojson,
        features: [...state.geojson.features, f],
      },
    })),

  clear: () => set({ geojson: EMPTY_FEATURE_COLLECTION }),

  setSelectedIndex: (i: number | null) => set({ selectedIndex: i }),

  setStyle: (s) => set((state) => ({ style: { ...state.style, ...s } })),
}));

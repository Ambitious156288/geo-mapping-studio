import type { Feature } from "geojson";
import type { PartialFeature } from "@/types/geojson";
import {
  flattenCoordinates,
  calculateBoundingBox,
  calculateCentroid,
  countVertices,
} from "./geometry";

export const enrichFeature = (
  feature: PartialFeature,
  index: number
): Feature => {
  const geometry = feature.geometry || { type: "Point", coordinates: [] };
  const coordinates = (geometry as { coordinates?: unknown }).coordinates || [];
  const baseProps = feature.properties || {};

  const vertices = countVertices(geometry.type || "", coordinates);

  const flatCoords = flattenCoordinates(coordinates).filter(
    (p) => Array.isArray(p) && p.length >= 2
  );

  const bbox = calculateBoundingBox(flatCoords);

  const centroid = calculateCentroid(flatCoords);

  const ringCount =
    geometry.type === "Polygon" && Array.isArray(coordinates)
      ? coordinates.length || 0
      : undefined;

  const computedProps: Record<string, unknown> = {
    id: index,
    vertices,
    ringCount,
    createdAt: new Date().toISOString(),
  };

  if (bbox) {
    computedProps.bbox_minLon = isFinite(bbox.minLon) ? bbox.minLon : undefined;
    computedProps.bbox_minLat = isFinite(bbox.minLat) ? bbox.minLat : undefined;
    computedProps.bbox_maxLon = isFinite(bbox.maxLon) ? bbox.maxLon : undefined;
    computedProps.bbox_maxLat = isFinite(bbox.maxLat) ? bbox.maxLat : undefined;
  }

  if (centroid) {
    computedProps.centroid_lon = centroid.lon;
    computedProps.centroid_lat = centroid.lat;
  }

  const merged: Record<string, unknown> = {
    ...computedProps,
    ...baseProps,
  };

  Object.keys(merged).forEach(
    (key) => merged[key] === undefined && delete merged[key]
  );

  return {
    type: "Feature",
    geometry: geometry as Feature["geometry"],
    properties: merged,
  };
};

import type { Feature, Geometry, GeoJsonProperties } from "geojson";

export interface EnrichedFeature extends Feature {
  properties: Record<string, unknown>;
  geometry: Geometry;
}

export type PartialFeature = Partial<
  Pick<Feature, "type" | "geometry" | "properties">
> & {
  geometry?: Geometry;
  properties?: GeoJsonProperties;
};

export type Coordinate =
  | [number, number]
  | [number, number, number]
  | [number, number][]
  | [number, number][][];

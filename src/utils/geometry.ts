export const flattenCoordinates = (coords: unknown): number[][] => {
  if (!coords) return [];

  if (
    Array.isArray(coords) &&
    coords.length >= 2 &&
    typeof coords[0] === "number" &&
    typeof coords[1] === "number"
  ) {
    return [coords as number[]];
  }

  if (Array.isArray(coords)) {
    return coords.flatMap((x) => flattenCoordinates(x));
  }

  return [];
};

export const calculateBoundingBox = (
  coordinates: number[][]
): {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
} | null => {
  if (coordinates.length === 0) return null;

  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;

  coordinates.forEach(([lon, lat]) => {
    if (lon < minLon) minLon = lon;
    if (lat < minLat) minLat = lat;
    if (lon > maxLon) maxLon = lon;
    if (lat > maxLat) maxLat = lat;
  });

  return { minLon, minLat, maxLon, maxLat };
};

export const calculateCentroid = (
  coordinates: number[][]
): { lon: number; lat: number } | null => {
  if (coordinates.length === 0) return null;

  const sum = coordinates.reduce(
    (acc, [lon, lat]) => ({ lon: acc.lon + lon, lat: acc.lat + lat }),
    { lon: 0, lat: 0 }
  );

  return {
    lon: sum.lon / coordinates.length,
    lat: sum.lat / coordinates.length,
  };
};

export const countVertices = (
  geometryType: string,
  coordinates: unknown
): number => {
  if (!Array.isArray(coordinates)) return 0;

  if (geometryType === "Point") return 1;
  if (geometryType === "LineString") return coordinates.length || 0;
  if (geometryType === "Polygon") {
    return Array.isArray(coordinates[0]) ? coordinates[0].length || 0 : 0;
  }
  if (geometryType === "MultiLineString" || geometryType === "MultiPolygon") {
    if (typeof coordinates.flat === "function") {
      return (coordinates.flat() as unknown[]).length || 0;
    }
    return coordinates.length || 0;
  }
  return 0;
};

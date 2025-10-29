import axios from "axios";
import type { FeatureCollection } from "geojson";

export const loadGeoJsonFromUrl = async (
  url: string
): Promise<FeatureCollection> => {
  try {
    const response = await axios.get<FeatureCollection>(url);
    const data = response.data;

    if (!data || !data.type || data.type !== "FeatureCollection") {
      throw new Error("Invalid GeoJSON: expected FeatureCollection");
    }

    return data;
  } catch (error) {
    console.error("GeoJSON load error:", error);
    throw error;
  }
};

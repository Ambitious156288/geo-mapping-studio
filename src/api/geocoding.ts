import { API_URLS } from "@/constants/urls";

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

export const searchLocation = async (
  query: string
): Promise<GeocodingResult | null> => {
  try {
    const url = `${API_URLS.NOMINATIM}?format=json&q=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);
    const data = await response.json();
    return data && data[0] ? data[0] : null;
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

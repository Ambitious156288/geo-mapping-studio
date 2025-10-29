import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useGeoStore } from "@/store/useGeoStore";
import type { Feature } from "geojson";

export const GeoJsonTable: React.FC = () => {
  const { geojson, selectedIndex, setSelectedIndex } = useGeoStore();

  const rows = useMemo(() => {
    return geojson.features.map((feature: Feature, index: number) => {
      const properties = (feature.properties as Record<string, unknown>) || {};
      return {
        id: index,
        _type: feature.geometry?.type || "Unknown",
        ...properties,
      } as Record<string, unknown> & { id: number };
    });
  }, [geojson]);

  const columns: GridColDef[] = useMemo(() => {
    const keys = new Set<string>();
    keys.add("_type");

    geojson.features.forEach((feature: Feature) => {
      const properties = (feature.properties as Record<string, unknown>) || {};
      Object.keys(properties).forEach((key) => keys.add(key));
    });

    return Array.from(keys).map((key) => ({
      field: key,
      headerName: key === "_type" ? "geometry.type" : key,
      width: 160,
    }));
  }, [geojson]);

  const handleSelectionChange = (selection: GridRowSelectionModel) => {
    const selected = selection.length > 0 ? (selection[0] as number) : null;
    setSelectedIndex(selected);
  };

  return (
    <Box sx={{ height: "100%", width: "100%", p: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowSelectionModel={selectedIndex !== null ? [selectedIndex] : []}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </Box>
  );
};

export default GeoJsonTable;

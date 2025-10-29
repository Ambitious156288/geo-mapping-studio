import { Box } from "@mui/material";
import { GeoJsonTable } from "@/components/GeoJsonTable";

export const TableView = () => (
  <Box sx={{ height: "100%", pt: { xs: 7, sm: 8 }, px: { xs: 1, sm: 2 } }}>
    <GeoJsonTable />
  </Box>
);

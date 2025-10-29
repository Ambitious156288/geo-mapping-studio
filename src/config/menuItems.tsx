import SearchIcon from "@mui/icons-material/Search";
import PolylineIcon from "@mui/icons-material/Polyline";
import DownloadIcon from "@mui/icons-material/Download";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TableChartIcon from "@mui/icons-material/TableChart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useGeoStore } from "@/store/useGeoStore";
import { exportGeoJson } from "@/utils/exportGeoJson";
import type { MenuItem } from "@/types/menu";

export type ViewType = "map" | "table";
export type PanelType = "search" | "load" | "draw";

export const menuItems: MenuItem[] = [
  {
    id: "search",
    icon: <SearchIcon color="primary" />,
    title: "Search Location",
    subtitle: "Search coordinates or places",
    view: "map",
    panel: "search",
  },
  {
    id: "draw_polygon",
    icon: <PolylineIcon color="primary" />,
    title: "Draw Polygon",
    subtitle: "Draw shapes on map",
    view: "map",
    panel: "draw",
    mode: "draw_polygon",
  },
  {
    id: "clear",
    icon: <DeleteForeverIcon color="error" />,
    title: "Clear Geometry",
    subtitle: "Remove everything from map",
    action: () => {
      useGeoStore.getState().clear();
    },
  },
  {
    id: "export",
    icon: <DownloadIcon color="primary" />,
    title: "Export to GeoJSON",
    subtitle: "Download current data",
    action: () => {
      exportGeoJson(useGeoStore.getState().geojson);
    },
  },
  {
    id: "load",
    icon: <CloudDownloadIcon color="primary" />,
    title: "Load GeoJSON from URL",
    subtitle: "Import external data",
    view: "map",
    panel: "load",
  },
  {
    id: "table",
    icon: <TableChartIcon color="primary" />,
    title: "View Data Table",
    subtitle: "Open in table view",
    view: "table",
  },
];

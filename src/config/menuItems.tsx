import SearchIcon from "@mui/icons-material/Search";
import PolylineIcon from "@mui/icons-material/Polyline";
import DownloadIcon from "@mui/icons-material/Download";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TableChartIcon from "@mui/icons-material/TableChart";

export type ViewType = "map" | "table";

export const menuItems = [
  {
    icon: <SearchIcon color="primary" />,
    title: "Search Location",
    subtitle: "Search coordinates or places",
    view: "map" as ViewType,
  },
  {
    icon: <PolylineIcon color="primary" />,
    title: "Draw Polygon",
    subtitle: "Draw shapes on map",
    view: "map" as ViewType,
  },
  {
    icon: <DownloadIcon color="primary" />,
    title: "Export to GeoJSON",
    subtitle: "Download current data",
    action: () => {},
  },
  {
    icon: <CloudDownloadIcon color="primary" />,
    title: "Load GeoJSON from URL",
    subtitle: "Import external data",
    action: () => {},
  },
  {
    icon: <TableChartIcon color="primary" />,
    title: "View Data Table",
    subtitle: "Open table in dialog",
    view: "table" as ViewType,
  },
];

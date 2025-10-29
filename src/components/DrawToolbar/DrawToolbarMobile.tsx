import { Box, IconButton, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import DownloadIcon from "@mui/icons-material/Download";
import { exportGeoJson } from "@/utils/exportGeoJson";
import { useGeoStore } from "@/store/useGeoStore";
import type { ModeType } from "@/types/ui";

type Props = {
  mode: ModeType;
  onModeChange: (mode: ModeType) => void;
};

export const DrawToolbarMobile = ({ mode, onModeChange }: Props) => {
  const { geojson } = useGeoStore();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        alignItems: "center",
        p: 0.5,
        flexWrap: "wrap",
      }}
    >
      {mode === "draw_polygon" ? (
        <Tooltip title="View Mode">
          <IconButton
            color="primary"
            onClick={() => onModeChange("view")}
            size="small"
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Draw Polygon">
          <IconButton
            color="primary"
            onClick={() => onModeChange("draw_polygon")}
            size="small"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <CropSquareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Export GeoJSON">
        <IconButton
          color="primary"
          onClick={() => exportGeoJson(geojson)}
          size="small"
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <DownloadIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

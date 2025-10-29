import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import DownloadIcon from "@mui/icons-material/Download";
import { exportGeoJson } from "@/utils/exportGeoJson";
import { useGeoStore } from "@/store/useGeoStore";
import { ColorPicker } from "./ColorPicker";
import type { ModeType } from "@/types/ui";

type Props = {
  mode: ModeType;
  onModeChange: (mode: ModeType) => void;
};

type RGBA = [number, number, number, number];

export const DrawToolbarDesktop = ({ mode, onModeChange }: Props) => {
  const { geojson, style, setStyle } = useGeoStore();

  const handleFillColorChange = (color: RGBA) => {
    setStyle({ fillColor: color });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        p: 1,
        flexWrap: "wrap",
      }}
    >
      {mode === "draw_polygon" ? (
        <Button
          variant="outlined"
          size="small"
          startIcon={<SaveIcon />}
          onClick={() => onModeChange("view")}
        >
          View
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          startIcon={<CropSquareIcon />}
          onClick={() => onModeChange("draw_polygon")}
        >
          Draw Polygon
        </Button>
      )}

      <Button
        variant="outlined"
        size="small"
        startIcon={<DownloadIcon />}
        onClick={() => exportGeoJson(geojson)}
      >
        Export GeoJSON
      </Button>

      <ColorPicker
        fillColor={style.fillColor}
        onFillColorChange={handleFillColorChange}
      />
    </Box>
  );
};

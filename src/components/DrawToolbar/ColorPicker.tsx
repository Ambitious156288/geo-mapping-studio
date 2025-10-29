import { Box, TextField, Typography, Slider } from "@mui/material";
import { rgbToHex } from "@/utils/color";

type RGBA = [number, number, number, number];

type Props = {
  fillColor: RGBA;
  onFillColorChange: (color: RGBA) => void;
};

export const ColorPicker = ({ fillColor, onFillColorChange }: Props) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    const rgb = hex.replace("#", "");
    const r = parseInt(rgb.substring(0, 2), 16);
    const g = parseInt(rgb.substring(2, 4), 16);
    const b = parseInt(rgb.substring(4, 6), 16);
    onFillColorChange([r, g, b, fillColor[3]]);
  };

  const handleOpacityChange = (_: Event, value: number | number[]) => {
    const opacity = Array.isArray(value) ? value[0] : value;
    onFillColorChange([fillColor[0], fillColor[1], fillColor[2], opacity]);
  };

  return (
    <Box
      sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
    >
      <Typography variant="caption">Fill Color</Typography>
      <TextField
        type="color"
        size="small"
        sx={{
          "& input[type='color']": {
            cursor: "pointer",
          },
          width: "50px",
        }}
        value={rgbToHex([fillColor[0], fillColor[1], fillColor[2]])}
        onChange={handleColorChange}
      />
      <Typography variant="caption">Opacity</Typography>
      <Slider
        size="small"
        min={0}
        max={255}
        value={fillColor[3]}
        onChange={handleOpacityChange}
        sx={{ width: 120 }}
      />
    </Box>
  );
};

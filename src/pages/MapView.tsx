import { Box, Typography } from "@mui/material";

export const MapView = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" color="text.secondary">
        @TODO Map
      </Typography>
    </Box>
  );
};

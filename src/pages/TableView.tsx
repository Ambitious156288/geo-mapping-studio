import { Box, Typography } from "@mui/material";

export const TableView = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" color="text.secondary">
        @TODO Table
      </Typography>
    </Box>
  );
};

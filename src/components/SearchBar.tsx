import { useState } from "react";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useMedia } from "@/hooks/useMedia";
import { useSnackbar } from "@/hooks/useSnackbar";
import { searchLocation } from "@/api/geocoding";
import { SNACKBAR_CONFIG } from "@/constants/ui";

type Props = {
  onResult: (lat: number, lon: number) => void;
};

export const SearchBar = ({ onResult }: Props) => {
  const [query, setQuery] = useState("");
  const { isMobile } = useMedia();
  const { open, message, severity, showSnackbar, hideSnackbar } = useSnackbar();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const result = await searchLocation(query);

      if (result) {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        onResult(lat, lon);
        showSnackbar(`Found: "${query}". Centered on result.`, "success");
      } else {
        showSnackbar(`No results for: "${query}".`, "error");
      }
    } catch (error) {
      console.error("Search error:", error);
      showSnackbar(`Search failed for: "${query}".`, "error");
    }

    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        p: 1,
        flexDirection: isMobile ? "column" : "row",
        width: isMobile ? "calc(100vw - 32px)" : "auto",
        maxWidth: isMobile ? "calc(100vw - 32px)" : "400px",
      }}
    >
      <TextField
        size="small"
        fullWidth={isMobile}
        placeholder="Search place or coordinates"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: isMobile ? "100%" : "300px" }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        size={isMobile ? "medium" : "small"}
        fullWidth={isMobile}
        disabled={!query.trim()}
      >
        Search
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={SNACKBAR_CONFIG.AUTO_HIDE_DURATION}
        onClose={hideSnackbar}
        anchorOrigin={SNACKBAR_CONFIG.ANCHOR_ORIGIN}
      >
        <Alert
          onClose={hideSnackbar}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchBar;

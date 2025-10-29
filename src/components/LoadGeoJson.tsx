import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useMedia } from "@/hooks/useMedia";
import { useSnackbar } from "@/hooks/useSnackbar";
import { loadGeoJsonFromUrl } from "@/api/geojson";
import { useGeoStore } from "@/store/useGeoStore";
import { API_URLS } from "@/constants/urls";
import { SNACKBAR_CONFIG } from "@/constants/ui";

type Props = {
  onLoaded?: () => void;
};

export const LoadGeoJson = ({ onLoaded }: Props) => {
  const [url, setUrl] = useState("");
  const { isMobile } = useMedia();
  const { open, message, severity, showSnackbar, hideSnackbar } = useSnackbar();
  const { setGeojson } = useGeoStore();

  const handleLoad = async () => {
    if (!url.trim()) return;

    try {
      const data = await loadGeoJsonFromUrl(url);
      setGeojson(data);
      showSnackbar(`Loaded GeoJSON from: ${url}`, "success");
    } catch (error) {
      console.error("Load error:", error);
      showSnackbar(`Failed to load GeoJSON from: ${url}`, "error");
    }

    setUrl("");
  };

  const handleUseExample = () => {
    setUrl(API_URLS.EARTHQUAKE_EXAMPLE);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        alignItems: "stretch",
        p: 1,
        flexDirection: "column",
        width: "calc(100vw - 32px)",
        maxWidth: 480,
      }}
    >
      <TextField
        size="small"
        fullWidth
        placeholder="Paste GeoJSON URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ minWidth: "100%" }}
      />

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            alignItems: "flex-start",
            mt: 0.5,
          }}
        >
          <Typography variant="body2" sx={{ wordBreak: "break-all", flex: 1 }}>
            <Link
              href={API_URLS.EARTHQUAKE_EXAMPLE}
              target="_blank"
              rel="noreferrer"
            >
              {API_URLS.EARTHQUAKE_EXAMPLE}
            </Link>
          </Typography>
          <Button variant="outlined" size="small" onClick={handleUseExample}>
            Copy Example Url
          </Button>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={handleLoad}
        size={isMobile ? "medium" : "small"}
        fullWidth
        disabled={!url.trim()}
      >
        Load
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
          {severity === "success" && onLoaded && (
            <Button
              color="primary"
              size="small"
              onClick={onLoaded}
              sx={{ mt: 2, fontWeight: 600 }}
              variant="contained"
            >
              View Data Table
            </Button>
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoadGeoJson;

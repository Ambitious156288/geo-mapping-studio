import { useState } from "react";
import { menuItems, type PanelType } from "@config/menuItems";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  Box,
  Paper,
  Fab,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { MapView } from "@pages/MapView";
import { TableView } from "@pages/TableView";
import { MenuListItem } from "@components/MenuListItem";
import { DrawToolbar } from "@components/DrawToolbar";
import { LoadGeoJson } from "@components/LoadGeoJson";
import { SearchBar } from "@components/SearchBar";
import { useGeoStore } from "@/store/useGeoStore";
import { useMedia } from "@/hooks/useMedia";
import { useThemeMode } from "@/hooks/useThemeMode";
import { createAppTheme } from "@/styles/theme";
import { DRAWER_CONFIG } from "@/constants/ui";
import type { MenuItem } from "@/types/menu";

type ViewType = "map" | "table";

export const AppLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<ViewType>("map");
  const { isMobile } = useMedia();
  const { mode: themeMode, toggleMode: toggleThemeMode } =
    useThemeMode("light");

  const [drawMode, setDrawMode] = useState<"view" | "draw_polygon">("view");
  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [activePanel, setActivePanel] = useState<PanelType | null>("search");
  const { geojson } = useGeoStore();

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const changeView = (v: ViewType) => {
    setView(v);
    setDrawerOpen(false);
    if (v === "table") setActivePanel(null);
  };

  const handleBackToMap = () => {
    setView("map");
  };

  const handleMenuAction = (item: MenuItem) => {
    if (item.view) changeView(item.view);
    if (item.panel) {
      setActivePanel(item.panel);
      if (item.mode) setDrawMode(item.mode);
    }
    if (item.action) item.action();
  };

  const drawerTop = isMobile
    ? DRAWER_CONFIG.MOBILE_HEIGHT_OFFSET
    : DRAWER_CONFIG.DESKTOP_HEIGHT_OFFSET;

  const drawerHeight = isMobile
    ? `calc(100% - ${DRAWER_CONFIG.MOBILE_HEIGHT_OFFSET}px)`
    : `calc(100% - ${DRAWER_CONFIG.DESKTOP_HEIGHT_OFFSET}px)`;

  const drawerWidth = isMobile
    ? DRAWER_CONFIG.MOBILE_WIDTH
    : DRAWER_CONFIG.DESKTOP_WIDTH;

  return (
    <ThemeProvider theme={createAppTheme(themeMode)}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer}
              sx={{ mr: 2, cursor: "pointer" }}
            >
              {drawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Typography variant="h6">Geo Mapping Studio</Typography>

            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              color="inherit"
              onClick={toggleThemeMode}
              aria-label="toggle theme"
            >
              {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer}
          anchor="left"
          ModalProps={{
            keepMounted: true,
            BackdropProps: {
              sx: {
                top: `${drawerTop}px`,
                height: drawerHeight,
              },
            },
          }}
          sx={{
            "& .MuiDrawer-paper": {
              top: `${drawerTop}px`,
              height: drawerHeight,
              width: `${drawerWidth}px`,
            },
          }}
        >
          <Box sx={{ width: drawerWidth }}>
            <List>
              {menuItems.map((item) => (
                <MenuListItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  disabled={
                    item.id === "clear" && geojson.features.length === 0
                  }
                  onClick={() => handleMenuAction(item)}
                />
              ))}
            </List>
          </Box>
        </Drawer>

        <Box sx={{ flexGrow: 1, position: "relative" }}>
          {view === "map" ? (
            <>
              <MapView mode={drawMode} searchLocation={searchLocation} />
              {activePanel && (
                <Box
                  sx={{
                    position: "absolute",
                    top: isMobile ? 70 : 80,
                    left: isMobile ? 8 : 16,
                    right: isMobile ? 8 : "auto",
                    zIndex: 1000,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: { xs: 1, sm: 1.5 },
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: (theme) => theme.shadows[3],
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      {activePanel === "draw" && (
                        <DrawToolbar mode={drawMode} setMode={setDrawMode} />
                      )}
                      {activePanel === "load" && (
                        <LoadGeoJson onLoaded={() => setView("table")} />
                      )}
                      {activePanel === "search" && (
                        <SearchBar
                          onResult={(lat, lon) =>
                            setSearchLocation({ lat, lon })
                          }
                        />
                      )}
                    </Box>
                  </Paper>
                </Box>
              )}
            </>
          ) : (
            <>
              <TableView />
              <Fab
                color="primary"
                size="small"
                aria-label="back to map"
                onClick={handleBackToMap}
                sx={{
                  marginTop: 10,
                  position: "fixed",
                  top: "40%",
                  left: 16,
                  zIndex: (t) => t.zIndex.drawer - 1,
                }}
              >
                <ArrowBackIcon />
              </Fab>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

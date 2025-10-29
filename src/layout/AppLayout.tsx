import { useState } from "react";
import { menuItems } from "@config/menuItems";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { MapView } from "@pages/MapView";
import { TableView } from "@pages/TableView";
import { MenuListItem } from "@components/MenuListItem";

type ViewType = "map" | "table";

export const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewType>("map");

  const toggleDrawer = () => setOpen((prev) => !prev);

  const changeView = (v: ViewType) => {
    setView(v);
    setOpen(false);
  };

  return (
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
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Typography variant="h6">Geo Mapping Studio</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={toggleDrawer}
        hideBackdrop
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            top: "56px",
            height: "calc(100% - 56px)",
          },
        }}
      >
        <Box sx={{ width: 280 }}>
          <List>
            {menuItems.map((item) => (
              <MenuListItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onClick={() => {
                  if (item.view) changeView(item.view);
                  if (item.action) item.action();
                }}
              />
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, position: "relative" }}>
        {view === "map" && <MapView />}
        {view === "table" && <TableView />}
      </Box>
    </Box>
  );
};

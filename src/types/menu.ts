import type { ReactNode } from "react";
import type { ViewType, PanelType } from "@/config/menuItems";

export interface MenuItem {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  view?: ViewType;
  panel?: PanelType;
  mode?: "view" | "draw_polygon";
  action?: () => void;
}

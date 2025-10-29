import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
};

export const MenuListItem = ({ icon, title, subtitle, onClick }: Props) => {
  return (
    <ListItemButton onClick={onClick} sx={{ py: 2 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        secondary={subtitle}
        primaryTypographyProps={{ fontSize: 16, fontWeight: 600 }}
        secondaryTypographyProps={{ fontSize: 13, color: "text.secondary" }}
      />
    </ListItemButton>
  );
};

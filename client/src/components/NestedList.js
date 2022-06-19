import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import {
  AdminPanelSettings,
  Dashboard,
  Folder,
  Group,
  WorkHistory,
  WorkOutline,
} from "@mui/icons-material";
import { display } from "@mui/system";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton
        component="a"
        href="#customized-list"
        sx={{
          bgcolor: "#f6f8fa",
          margin: "10px",
          display: "flex",
        }}
      >
        <ListItemIcon sx={{ fontSize: 15 }}>
          <WorkOutline />
        </ListItemIcon>
        <ListItemText
          sx={{ my: 0 }}
          primary="Rapido"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary="Test Cases" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <WorkHistory />
        </ListItemIcon>
        <ListItemText primary="Releases" />
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <WorkOutline />
        </ListItemIcon>
        <ListItemText primary="All Projects" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary="Admin" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

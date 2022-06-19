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
import { Link } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

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
      <Link to="/dashboard" style={linkStyle}>
        <ListItemButton>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link to="/testcases" style={linkStyle}>
        <ListItemButton>
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText primary="Test Cases" />
        </ListItemButton>
      </Link>
      <Link to="/releases" style={linkStyle}>
        <ListItemButton>
          <ListItemIcon>
            <WorkHistory />
          </ListItemIcon>
          <ListItemText primary="Releases" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link to="/projects" style={linkStyle}>
        <ListItemButton>
          <ListItemIcon>
            <WorkOutline />
          </ListItemIcon>
          <ListItemText primary="All Projects" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary="Admin" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/users" style={linkStyle}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}

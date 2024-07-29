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
import { VerifiedUser } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useProject } from "../context/ProjectProvider";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const { selectedProject, selectProject } = useProject();

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
      {selectedProject ? (
        <>
          <ListItemButton
            component="a"
            href="#customized-list"
            sx={{
              bgcolor: "#F0F0F0",
              margin: "10px",
              display: "flex",
            }}
          >
            <ListItemIcon sx={{ fontSize: 15 }}>
              <WorkOutline />
            </ListItemIcon>
            <ListItemText
              sx={{ my: 0 }}
              primary={selectedProject?.name}
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: "medium",
                letterSpacing: 0,
              }}
            />
          </ListItemButton>
          <Link
            to={`/project/${selectedProject._id}/dashboard`}
            style={linkStyle}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Dashboard fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <Link
            to={`/project/${selectedProject._id}/testcases`}
            style={linkStyle}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Folder fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Test Cases" />
            </ListItemButton>
          </Link>
          <Link
            to={`/project/${selectedProject._id}/releases`}
            style={linkStyle}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <WorkHistory fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Releases" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      ) : (
        <></>
      )}
      ;
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
                <Group fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </Link>
          <Link to="/roles" style={linkStyle}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <VerifiedUser fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}

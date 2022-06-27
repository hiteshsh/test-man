import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const rolesAndPriviledgeList = [
  {
    id: "123",
    name: "Lead",
    priviledge: [],
  },
  {
    id: "124",
    name: "Manager",
    priviledge: [],
  },
  {
    id: "125",
    name: "Tester",
    priviledge: [],
  },
];

export default function RoleList() {
  var rolesEl = rolesAndPriviledgeList.map((role) => (
    <ListItemButton key={role.id}>
      <ListItemText inset primary={role.name} sx={{ paddingLeft: "2px" }} />
    </ListItemButton>
  ));
  return (
    <Box border="0px solid">
      <Grid container minHeight="315px" padding={2}>
        <Grid item md={4} padding={2}>
          <Paper elevation={0}>
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px",
                  justifyContent: "space-between",
                  minHeight: "50px",
                }}
              >
                <Typography variant="h6">Roles</Typography>
              </Box>
              <Divider />
              {rolesAndPriviledgeList.length > 0 ? (
                rolesEl
              ) : (
                <Typography
                  variant="body1"
                  color="rgb(101, 116, 139)"
                  minHeight={"300px"}
                  padding="20px"
                >
                  There are no Roles
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item md={8} padding={2}></Grid>
      </Grid>
    </Box>
  );
}

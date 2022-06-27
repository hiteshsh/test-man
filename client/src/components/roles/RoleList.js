import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
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
    priviledge: [
      {
        name: "view",
        modules: [
          { module: "project", allowed: true, disabled: true, show: true },
          { module: "Test Case", allowed: true, disabled: true, show: true },
          { module: "Release", allowed: true, disabled: true, show: true },
          { module: "Dashboard", allowed: true, disabled: true, show: true },
        ],
      },
      {
        name: "addEdit",
        modules: [
          { module: "project", allowed: true, disabled: true, show: true },
          { module: "Test Case", allowed: true, disabled: true, show: true },
          { module: "Release", allowed: true, disabled: true, show: true },
          { module: "Dashboard", allowed: true, disabled: true, show: false },
        ],
      },
      {
        name: "del",
        modules: [
          { module: "project", allowed: true, disabled: true,show: true },
          { module: "Test Case", allowed: true, disabled: true ,show: true},
          { module: "Release", allowed: true, disabled: true,show: false },
          { module: "Dashboard", allowed: true, disabled: true, show: false},
        ],
      },
    ],
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

function createData(priveldgeName, view, addEdit, del) {
  return { priveldgeName, view, addEdit, del };
}

const rows = [
  createData("Project", true, false, true),
  createData("Test Case", true, false, true),
  createData("Release", true, false, true),
  createData("Dashboard", true, false, true),
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
        <Grid item md={8} padding={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Permissions</TableCell>
                  <TableCell align="center">View</TableCell>
                  <TableCell align="center">Add & Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.priveldgeName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.priveldgeName}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox checked={row.view} />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox checked={row.addEdit} />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox checked={row.del} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

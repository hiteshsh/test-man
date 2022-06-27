import {
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RolePrivlege from "./RolePrivlege";

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
        name: "project",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: false, show: true },
          { name: "del", allowed: true, disabled: false, show: true },
        ],
      },
      {
        name: "test case",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: true, show: true },
          { name: "del", allowed: true, disabled: true, show: true },
        ],
      },
      {
        name: "Release",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: true, show: true },
          { name: "del", allowed: true, disabled: false, show: true },
        ],
      },
      {
        name: "Dashboard",
        type: [
          { name: "view", allowed: true, disabled: false, show: true },
          { name: "addEdit", allowed: false, disabled: true, show: false },
          { name: "del", allowed: false, disabled: true, show: false },
        ],
      },
    ],
  },
  {
    id: "124",
    name: "Manager",
    priviledge: [
      {
        name: "project",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: false, disabled: false, show: true },
          { name: "del", allowed: true, disabled: false, show: true },
        ],
      },
      {
        name: "test case",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: true, show: true },
          { name: "del", allowed: true, disabled: true, show: true },
        ],
      },
      {
        name: "Release",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: true, show: true },
          { name: "del", allowed: true, disabled: false, show: true },
        ],
      },
      {
        name: "Dashboard",
        type: [
          { name: "view", allowed: true, disabled: false, show: true },
          { name: "addEdit", allowed: false, disabled: true, show: false },
          { name: "del", allowed: false, disabled: true, show: false },
        ],
      },
    ],
  },
  {
    id: "125",
    name: "Tester",
    priviledge: [
      {
        name: "project",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: false, disabled: false, show: true },
          { name: "del", allowed: false, disabled: false, show: true },
        ],
      },
      {
        name: "test case",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: false, disabled: false, show: true },
          { name: "del", allowed: false, disabled: true, show: true },
        ],
      },
      {
        name: "Release",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: false, disabled: false, show: true },
          { name: "del", allowed: false, disabled: false, show: true },
        ],
      },
      {
        name: "Dashboard",
        type: [
          { name: "view", allowed: false, disabled: false, show: true },
          { name: "addEdit", allowed: false, disabled: true, show: false },
          { name: "del", allowed: false, disabled: true, show: false },
        ],
      },
    ],
  },
];

export default function RoleList() {
  const onClickRole = (id) => {
    const role = rolesAndPriviledgeList.find((e) => e.id === id);
    setValues(role);
    console.log(values);
  };

  const initialValues = rolesAndPriviledgeList.find((e) => e.name === "Lead");

  const [values, setValues] = useState(initialValues);

  var rolesEl = rolesAndPriviledgeList.map((role) => (
    <ListItemButton key={role.id}>
      <ListItemText
        inset
        primary={role.name}
        sx={{ paddingLeft: "2px" }}
        onClick={() => {
          onClickRole(role.id);
        }}
      />
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
                  There are no Roles created
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item md={8} padding={2}>
          <RolePrivlege role={values} id="123" />
        </Grid>
      </Grid>
    </Box>
  );
}

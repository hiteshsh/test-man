import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import RoleListData from "./RoleListData";
import RolePrivlege from "./RolePrivlege";

const rolesAndPriviledgeList = [
  {
    id: "123",
    name: "Lead",
    priviledge: [
      {
        name: "Project",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: false, show: true },
          { name: "del", allowed: true, disabled: false, show: true },
        ],
      },
      {
        name: "Test case",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: false, show: true },
          { name: "del", allowed: true, disabled: false, show: true },
        ],
      },
      {
        name: "Release",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: true, disabled: false, show: true },
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
        name: "Project",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: false, disabled: false, show: true },
          { name: "del", allowed: true, disabled: false, show: true },
        ],
      },
      {
        name: "Test case",
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
        name: "Project",
        type: [
          { name: "view", allowed: true, disabled: true, show: true },
          { name: "addEdit", allowed: false, disabled: false, show: true },
          { name: "del", allowed: false, disabled: false, show: true },
        ],
      },
      {
        name: "Test case",
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
  const initialIndex = 0;
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);

  const [values, setValues] = useState(rolesAndPriviledgeList[initialIndex]);

  const onClickRole = (id, e, index) => {
    console.log("index", index);
    e.preventDefault();
    setSelectedIndex(index);
    const role = rolesAndPriviledgeList.find((e) => e.id === id);
    setValues(role);
  };

  return (
    <Box border="0px solid">
      <Grid container minHeight="315px" padding={2}>
        <Grid item md={4} padding={2}>
          <RoleListData
            list={rolesAndPriviledgeList}
            values={values}
            onClickRole={onClickRole}
            selectedIndex={selectedIndex}
          />
        </Grid>
        <Grid item md={8} padding={2}>
          <RolePrivlege role={values} />
        </Grid>
      </Grid>
    </Box>
  );
}

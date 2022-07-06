import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import RoleListAPI from "./RoleListAPI";
import RoleListData from "./RoleListData";
import RolePrivlege from "./RolePrivlege";

export default function RoleList() {
  const { roles, error, isLoading, setRoles } = RoleListAPI();
  console.log("roles after", roles);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onClickRole = (_id, e, index) => {
    console.log("index", index);
    e.preventDefault();
    setSelectedIndex(index);
    console.log("roles in on click", roles);
  };

  const onChangeCheckbox = (e, key) => {
    e.preventDefault();
    const splitString = key.split("_");
    const roleName = splitString[0];
    const priveledge = splitString[1];
    const type = splitString[2];

    const rolesNew = [...roles];
    rolesNew.map((role) => {
      if (role.name === roleName) {
        role.priviledge.map((priv) => {
          if (priv.name === priveledge) {
            priv.ptype.map((ptype) => {
              if (ptype.name === type) {
                ptype.allowed = !ptype.allowed;
              }
            });
          }
        });
      }
    });
    setRoles(rolesNew);
  };

  return (
    <Box border="0px solid">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}

      <Grid container minHeight="315px" padding={2}>
        <Grid item md={4} padding={2}>
          {roles && (
            <RoleListData
              roles={roles}
              onClickRole={onClickRole}
              selectedIndex={selectedIndex}
            />
          )}
        </Grid>
        <Grid item md={8} padding={2}>
          {roles && roles.length > 0 && (
            <RolePrivlege
              roles={roles}
              selectedIndex={selectedIndex}
              onChangeCheckbox={onChangeCheckbox}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

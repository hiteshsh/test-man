import { Box } from "@mui/material";
import React from "react";
import RoleList from "./RoleList";
import RolesHeader from "./RolesHeader";

function Roles() {
  return (
    <Box sx={{ marginLeft: "250px" }}>
      <RolesHeader />
      <RoleList />
    </Box>
  );
}

export default Roles;

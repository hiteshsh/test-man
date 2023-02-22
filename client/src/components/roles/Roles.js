import { Box } from "@mui/material";
import React from "react";
import Header from "../Header";
import SideMenu from "../SideMenu";
import RoleList from "./RoleList";
import RolesHeader from "./RolesHeader";

function Roles() {
  return (
    <>
      <Header />
      <SideMenu />

      <Box sx={{ marginLeft: "250px" }}>
        <RolesHeader />
        <RoleList />
      </Box>
    </>
  );
}

export default Roles;

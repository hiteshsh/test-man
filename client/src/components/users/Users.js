import { Box } from "@mui/material";
import React from "react";
import Header from "../Header";
import SideMenu from "../SideMenu";
import UserList from "./UserList";
import UsersHeader from "./UsersHeader";

function Users() {
  return (
    <>
      <Header />
      <SideMenu />

      <Box sx={{ marginLeft: "250px" }}>
        <UsersHeader />
        <UserList />
      </Box>
    </>
  );
}

export default Users;

import { Box } from "@mui/material";
import React from "react";
import UserList from "./UserList";
import UsersHeader from "./UsersHeader";

function Users() {
  return (
    <Box sx={{ marginLeft: "250px" }}>
      <UsersHeader />
      <UserList />
    </Box>
  );
}

export default Users;

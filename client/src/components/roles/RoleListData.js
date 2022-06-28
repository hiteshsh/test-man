import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export default function RoleListData(props) {
  var rolesEl = props.list.map((role) => (
    <ListItemButton key={role.id}>
      <ListItemText
        inset
        primary={role.name}
        sx={{ paddingLeft: "2px" }}
        onClick={(e) => {
          props.onClickRole(role.id, e);
        }}
      />
    </ListItemButton>
  ));
  return (
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
        {props.list.length > 0 ? (
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
  );
}

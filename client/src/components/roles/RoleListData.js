import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export default function RoleListData(props) {
  var rolesEl = props.roles.map((role, index) => (
    <ListItemButton
      key={role._id}
      selected={props.selectedIndex === index}
      onClick={(e) => {
        props.onClickRole(role._id, e, index);
      }}
    >
      <ListItemText inset primary={role.name} sx={{ paddingLeft: "2px" }} />
      <ListItemSecondaryAction>
        <IconButton size="small">
          <Delete fontSize="inherit" />
        </IconButton>
        <IconButton size="small">
          <Edit fontSize="inherit" />
        </IconButton>
      </ListItemSecondaryAction>
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
        {props.roles.length > 0 ? (
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

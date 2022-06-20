import React from "react";
import { AddCircle } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";

function TestCaseListData() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Paper elevation={0}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <IconButton size="large" color="primary" aria-label="add test case">
          <AddCircle />
        </IconButton>

        <Typography>No Test case Found. Please add </Typography>
      </div>
    </Paper>
  );
}

export default TestCaseListData;

import React from "react";
import { AddCircle } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

function TestCaseListData() {
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
        <Link to="/testcase/new" style={linkStyle}>
          <IconButton size="large" color="primary" aria-label="add test case">
            <AddCircle />
          </IconButton>
        </Link>

        <Typography>No Test case Found. Please add </Typography>
      </div>
    </Paper>
  );
}

export default TestCaseListData;

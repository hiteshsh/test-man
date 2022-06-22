import React from "react";

import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const TestCaseHeader = () => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
      variant="body2"
    >
      Projects
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
      variant="body2"
    >
      Rapido
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
      variant="body2"
    >
      Test Cases
    </Link>,
    <Typography key="3" color="text.primary" variant="body2">
      Add Test cases
    </Typography>,
  ];
  return (
    <Paper
      elevation={0}
      square
      sx={{
        backgroundColor: "#f6f8fa",

        height: "70px",
        fontWeight: "medium",
        padding: "20px",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        border={"0px solid"}
        padding={2}
      >
        <Grid item md={4}>
          <Typography variant="h5">Add Test Case</Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </Paper>
  );
};

export default TestCaseHeader;

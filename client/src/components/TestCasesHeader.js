import React from "react";

import { CloudDownload, CloudUpload, NavigateNext } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const TestCasesHeader = () => {
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
    <Typography key="3" color="text.primary" variant="body2">
      Test cases
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
      >
        <Grid item md={4}>
          <Typography variant="h5">Test Cases</Typography>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Stack spacing={2} direction="row" sx={{ float: "right" }}>
            <Button
              variant="contained"
              size="medium"
              startIcon={<CloudDownload />}
              sx={{ textTransform: "none" }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              size="medium"
              startIcon={<CloudUpload />}
              sx={{ textTransform: "none" }}
            >
              Import
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Paper>
  );
};

export default TestCasesHeader;

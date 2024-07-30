import React from "react";

import { CloudDownload, CloudUpload, NavigateNext } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useProject } from "../../context/ProjectProvider";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const TestCasesHeader = () => {
  const { selectedProject, selectProject } = useProject();
  console.log("selectedProject", selectedProject);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/projects"
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
      {selectedProject.name}
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
        padding={2}
      >
        <Grid item md={4}>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Test Cases
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
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
    </Paper>
  );
};

export default TestCasesHeader;

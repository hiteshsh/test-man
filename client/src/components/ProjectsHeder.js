import { Add } from "@mui/icons-material";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

function ProjectsHeader() {
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
          <Typography variant="h5">Projects</Typography>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Stack spacing={2} direction="row" sx={{ float: "right" }}>
            <Button
              variant="contained"
              size="medium"
              startIcon={<Add />}
              sx={{ textTransform: "none" }}
            >
              Add Project
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProjectsHeader;

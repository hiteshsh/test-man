import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ProjectsList from "./ProjectList";
import ProjectsHeader from "./ProjectsHeder";

function Projects() {
  return (
    <Box sx={{ marginLeft: "250px" }}>
      <ProjectsHeader />
      <ProjectsList />
    </Box>
  );
}

export default Projects;

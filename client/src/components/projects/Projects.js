import { Box } from "@mui/material";
import React from "react";
import ProjectsList from "./ProjectList";
import ProjectsHeader from "./ProjectsHeader";

function Projects() {
  return (
    <Box sx={{ marginLeft: "250px" }}>
      <ProjectsHeader />
      <ProjectsList />
    </Box>
  );
}

export default Projects;

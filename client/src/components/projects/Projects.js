import { Box } from "@mui/material";
import React from "react";
import Header from "../Header";
import SideMenu from "../SideMenu";
import ProjectsList from "./ProjectList";
import ProjectsHeader from "./ProjectsHeader";

function Projects() {
  return (
    <>
      <Header />
      <SideMenu />
      <Box sx={{ marginLeft: "250px" }}>
        <ProjectsHeader />
        <ProjectsList />
      </Box>
    </>
  );
}

export default Projects;

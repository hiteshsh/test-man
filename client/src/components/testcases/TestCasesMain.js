import { Box } from "@mui/material";
import React from "react";
import TestCasesHeader from "./TestCasesHeader";
import TestSuiteList from "../testsuites/TestSuiteList";
import Header from "../Header";
import SideMenu from "../SideMenu";
import { useParams } from "react-router-dom";
import { useProject } from "../../context/ProjectProvider";
import GetProjectDetails from "../projects/GetProjectDetailsAPI";

const TestCases = () => {
  const { projectId } = useParams();
  //const { selectedProject, selectProject } = useProject();

  console.log("projectId inside test cases", projectId);
  //console.log("selectedProject", selectedProject);
  // if (!selectedProject || (projectId != selectedProject._id)) {
  //   const { project, error, isLoading } = GetProjectDetails({ projectId });
  //   console.log("New project Id", project);
  //   selectProject(project);
  // }
  return (
    <>
      <Header />
      <SideMenu />
      <Box sx={{ marginLeft: "250px" }}>
        <TestCasesHeader />
        <TestSuiteList projectId={projectId} />
      </Box>
    </>
  );
};

export default TestCases;

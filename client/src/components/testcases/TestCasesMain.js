import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestCasesHeader from "./TestCasesHeader";
import TestSuiteList from "../testsuites/TestSuiteList";
import Header from "../Header";
import SideMenu from "../SideMenu";
import { useParams } from "react-router-dom";
import { useProject } from "../../context/ProjectProvider";
import GetProjectDetails from "../projects/GetProjectDetailsAPI";

const TestCases = () => {
  const { projectId } = useParams();
  const { selectedProject, selectProject } = useProject();

  console.log("projectId inside test cases", projectId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedProject || (projectId !== selectedProject._id)) {
      setIsLoading(true);
      GetProjectDetails(projectId)
        .then((project) => {
          selectProject(project);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [projectId, selectedProject, selectProject]);
  
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

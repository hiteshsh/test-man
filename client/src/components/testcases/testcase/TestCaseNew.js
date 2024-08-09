import { Box } from "@mui/material";
import React, { useEffect } from "react";
import TestSuiteListAPI from "../../testsuites/TestSuiteListAPI";
import TestCaseForm from "./TestCaseForm";
import TestCaseHeader from "./TestCaseHeader";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import { useProject } from "../../../context/ProjectProvider";
import GetProjectDetails from "../../projects/GetProjectDetailsAPI";
import { useLocation, useParams } from "react-router-dom";

function TestCaseNew() {
  const location = useLocation();
  console.log("location.state", location.state);

  const { projectId } = location.state || {};
  const { testcaseId } = useParams();
  console.log("projectId inside new test cases", projectId);
  const { testsuites, error, isLoading } = TestSuiteListAPI({ projectId });
  const { selectedProject, selectProject } = useProject();

  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedProject || projectId !== selectedProject._id) {
      //setIsLoading(true);
      GetProjectDetails(projectId)
        .then((project) => {
          selectProject(project);
          //setIsLoading(false);
        })
        .catch((err) => {
          //setError(err.message);
          //setIsLoading(false);
        });
    }
  }, [projectId, selectedProject, selectProject]);

  return (
    <>
      <Header />
      <SideMenu />
      <Box sx={{ marginLeft: "250px" }}>
        <TestCaseHeader />
        <TestCaseForm
          projectId={projectId}
          testsuites={testsuites}
          testcaseId={testcaseId}
        />
      </Box>
    </>
  );
}

export default TestCaseNew;

import React, { useEffect } from "react";
import Axios from "axios";

const TestSuiteListAPI = () => {
  const [testsuites, setTestSuites] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    // invalid url will trigger an 404 error
    function getAllProjects() {
      Axios.get("/project/projectId/testsuites")
        .then((response) => {
          setTestSuites(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
    getAllProjects();
  }, []);

  return { testsuites, error };
};

export default TestSuiteListAPI;

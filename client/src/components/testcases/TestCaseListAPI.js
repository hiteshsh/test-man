import React, { useEffect } from "react";
import Axios from "axios";

const TestCaseListAPI = ({ projectId, testsuiteId, sectionId }) => {
  const [testcases, setTestCases] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const params = {
    projectId: projectId,
    testsuiteId: testsuiteId,
    sectionId: sectionId,
  };
  console.log("params", params);
  console.log("testsuiteId", testsuiteId);

  useEffect(() => {
    function getTestCases() {
      console.log("params inside useeffect", params);
      Axios.get("/testcases", {
        params,
      })
        .then((response) => {
          console.log("response:", response);
          if (!response.status === 200) {
            console.log("error", response);
            throw Error("Couldn't load data");
          }
          console.log("test cases response", response);
          setTestCases(response.data);
          console.log(testcases);
          setIsLoading(false);
          setError(null);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }
    getTestCases();
  }, [projectId, testsuiteId, sectionId]);

  return { testcases, error, isLoading };
};

export default TestCaseListAPI;

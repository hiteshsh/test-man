import React, { useEffect } from "react";
import Axios from "axios";
import { axiosPrivate } from "../../utils/axios";

const TestCaseListAPI = ({ projectId, testsuiteId, sectionId }) => {
  const [testcases, setTestCases] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const params = {
    projectId: projectId,
    testsuiteId: testsuiteId,
    sectionId: sectionId,
  };

  useEffect(() => {
    function getTestCases() {
      axiosPrivate
        .get("/testcases", {
          params,
        })
        .then((response) => {
          if (!response.status === 200) {
            throw Error("Couldn't load data");
          }
          setTestCases(response.data);
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

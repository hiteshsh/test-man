import React, { useEffect } from "react";
import Axios from "axios";

const TestSuiteListAPI = () => {
  const [testsuites, setTestSuites] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // invalid url will trigger an 404 error
    function getTestSuitesForProject() {
      Axios.get("/testsuites?projectId=62e02165cc1c8782f8b4188b")
        .then((response) => {
          if (!response.status === 200) {
            console.log("error", response);
            throw Error("Couldn't load data");
          }
          setTestSuites(response.data);
          console.log(testsuites);
          setIsLoading(false);
          setError(null);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }
    getTestSuitesForProject();
  }, []);

  return { testsuites, error, isLoading };
};

export default TestSuiteListAPI;

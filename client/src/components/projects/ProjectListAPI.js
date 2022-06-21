import React, { useEffect } from "react";
import Axios from "axios";

const ProjectListAPI = () => {
  const [projects, setProjects] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    // invalid url will trigger an 404 error
    function fetchMyAPI() {
      Axios.get("/projects")
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
    fetchMyAPI();
  }, []);

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     let response = await fetch('api/data')
  //     response = await response.json()
  //     dataSet(response)
  //   }

  //   fetchMyAPI()
  // }, [])

  return { projects, error };
};

export default ProjectListAPI;

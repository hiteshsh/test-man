import React, { useEffect } from "react";
import Axios from "axios";

const ProjectListAPI = () => {
  const [projects, setProjects] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // invalid url will trigger an 404 error
    function getAllProjects() {
      Axios.get("/projects")
        .then((response) => {
          console.log(response);
          if (!response.status === 200) {
            console.log("error", response);
            throw Error("Couldn't load data");
          }
          setProjects(response.data);
          setIsLoading(false);
          setError(null);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }
    getAllProjects();
  }, []);

  return { projects, error, isLoading };
};

export default ProjectListAPI;

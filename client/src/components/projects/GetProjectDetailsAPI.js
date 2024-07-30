import React, { useEffect } from "react";
import Axios from "axios";
import axios, { axiosPrivate } from "../../utils/axios";

const GetProjectDetails = async (projectId) => {
  try {
    const response = await axiosPrivate.get("/project/" + projectId);
    if (response.status !== 200) {
      throw new Error("Couldn't load data");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }

  //     const [project, setProject] = React.useState(null);
  //   const [error, setError] = React.useState(null);
  //   const [isLoading, setIsLoading] = React.useState(true);

  //   useEffect(() => {
  //     // invalid url will trigger an 404 error
  //     function getProject() {
  //       axiosPrivate
  //         .get("/project/" + projectId)
  //         .then((response) => {
  //           console.log(response);
  //           if (!response.status === 200) {
  //             console.log("error", response);
  //             throw Error("Couldn't load data");
  //           }
  //           setProject(response.data);
  //           setIsLoading(false);
  //           setError(null);
  //         })
  //         .catch((error) => {
  //           setIsLoading(false);
  //           setError(error.message);
  //         });
  //     }
  //     getProject();
  //   }, []);

  //   return { project, error, isLoading };
};

export default GetProjectDetails;

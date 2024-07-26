import React, { useEffect } from "react";
import Axios from "axios";
import { axiosPrivate } from "../../utils/axios";

const RoleListAPI = () => {
  const [roles, setRoles] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  console.log("api called");

  useEffect(() => {
    // invalid url will trigger an 404 error
    function getAllRoles() {
      axiosPrivate
        .get("/roles")
        .then((response) => {
          if (!response.status === 200) {
            throw Error("Couldn't load data");
          }
          setRoles(response.data);
          setIsLoading(false);
          setError(null);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }
    getAllRoles();
  }, []);

  return { roles, error, isLoading, setRoles };
};

export default RoleListAPI;

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../Header";
import SideMenu from "../SideMenu";
import ProjectsList from "./ProjectList";
import ProjectsHeader from "./ProjectsHeader";
import { axiosPrivate } from "../../utils/axios";

function Projects() {
  const [userData, setUserData] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosPrivate.get("/me");
        if (!response.status === 200) {
          console.log("error", response);
          throw Error("Couldn't load data");
        }
        setUserData(response.data);
        setCurrentProject(response.data.applicationState.currentProject);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <>
      <Header />
      <SideMenu currentProject={currentProject} />
      <Box sx={{ marginLeft: "250px" }}>
        <ProjectsHeader />
        <ProjectsList />
      </Box>
    </>
  );
}

export default Projects;

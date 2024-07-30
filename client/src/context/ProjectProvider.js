import React, { createContext, useEffect, useState } from "react";

const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(() => {
    const project = localStorage.getItem("selectedProject");
    return project || null;
  });

  useEffect(() => {
    // Load the default project from localStorage if it exists
    const savedProject = localStorage.getItem("selectedProject");
    console.log("savedProject", savedProject);
    if (savedProject) {
      setSelectedProject(JSON.parse(savedProject));
    }
  }, [selectedProject]);

  const selectProject = (project) => {
    setSelectedProject(project);
    localStorage.setItem("selectedProject", JSON.stringify(project));
  };

  return (
    <ProjectContext.Provider value={{ selectedProject, selectProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => React.useContext(ProjectContext);

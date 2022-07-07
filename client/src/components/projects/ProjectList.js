import { AddCircle, Close } from "@mui/icons-material";
import {
  Box,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import ProjectForm from "./ProjectForm";
import Project from "./Project";
import ProjectListAPI from "./ProjectListAPI";
import Handlepopup from "../common/Handlepopup";

const linkStyle = {
  textDecoration: "none",
};

function ProjectsList() {
  const { projects, error, isLoading } = ProjectListAPI();

  console.log("projects:", projects);
  const { openPopup, handleOpenPopup, handleClosePopup } = Handlepopup();
  return (
    <Box>
      <Grid container minHeight="315px" padding={2}>
        <Grid item md={3} padding={2}>
          <Link style={linkStyle} onClick={handleOpenPopup}>
            <Paper
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="add project"
                >
                  <AddCircle fontSize="inherit" />
                </IconButton>
                <Typography>New Project</Typography>
              </CardContent>
            </Paper>
          </Link>
          <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Add Project</Typography>
                <IconButton onClick={handleClosePopup}>
                  <Close />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              <ProjectForm />
            </DialogContent>
          </Dialog>
        </Grid>
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {projects &&
          projects.map((project) => (
            <Grid item md={3} padding={2} key={project._id}>
              <Project name={project.name} id={project._id} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default ProjectsList;

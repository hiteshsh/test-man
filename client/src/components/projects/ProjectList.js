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
import React, { useEffect } from "react";
import ProjectForm from "./ProjectForm";
import Axios from "axios";
import Project from "./Project";

const linkStyle = {
  textDecoration: "none",
};

function getAllProjects() {
  Axios.get("projects").then((response) => {
    console.log(response);
  });
}

function ProjectsList() {
  const [projects, setProjects] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    // invalid url will trigger an 404 error
    Axios.get("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  console.log(projects);
  const [openPopup, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClosePopup = () => setOpen(false);
  return (
    <Box>
      <Grid
        container
        direction="row"
        sx={{ display: "flex" }}
        minHeight="250px"
        marginTop={4}
        marginLeft={3}
        marginRight={3}
      >
        <Grid item md={3}>
          <Link style={linkStyle} onClick={handleOpen}>
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
        <Grid item md={3} paddingLeft="24px">
          <Project />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectsList;

import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ProjectForm from "./ProjectForm";

function ProjectsHeader() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Paper
      elevation={0}
      square
      sx={{
        backgroundColor: "#f6f8fa",

        height: "70px",
        fontWeight: "medium",
        padding: "20px",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        border={"0px solid"}
      >
        <Grid item md={4}>
          <Typography variant="h5">Projects</Typography>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Stack spacing={2} direction="row" sx={{ float: "right" }}>
            <Button
              variant="contained"
              size="medium"
              startIcon={<Add />}
              sx={{ textTransform: "none" }}
              onClick={handleOpen}
            >
              Add Project
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">Add Project</Typography>
                  <IconButton onClick={handleClose}>
                    <Close />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
                <ProjectForm />
              </DialogContent>
            </Dialog>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProjectsHeader;

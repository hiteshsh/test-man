import {
  Close,
  Dashboard,
  Folder,
  MoreVert,
  WorkHistory,
} from "@mui/icons-material";
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Axios from "axios";
import ProjectForm from "./ProjectForm";
import Handlepopup from "../common/Handlepopup";
import { axiosPrivate } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../context/ProjectProvider";

function Project({ project, onSelect }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { openPopup, handleOpenPopup, handleClosePopup } = Handlepopup();
  const { selectedProject, selectProject } = useProject();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleClose();
    setOpenDialog(true);
  };
  const handleEdit = () => {
    handleClose();
    handleOpenPopup();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteSubmit = (event) => {
    const projectId = event.currentTarget.id;
    axiosPrivate
      .delete("/project/" + projectId)
      .then((response) => {
        if (!response.status === 200) {
          throw Error("Error deleting project");
        }
        window.location = "/projects";
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRedirect = (page) => {
    // update the application state here
    const applicationState = { currentProject: project._id };
    axiosPrivate
      .post("/user/application-state", applicationState)
      .then((response) => {
        if (!response.status === 200) {
          throw Error("Error deleting project");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    selectProject(project);
    navigate(`/project/${project._id}/${page}`);
  };

  return (
    <Paper
      sx={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "15px",
        }}
      >
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={handleClick}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVert />
            </IconButton>
          }
          title={project.name}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete the project?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting this project will remove the project from the list
              forever
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>No</Button>
            <Button id={project._id} onClick={handleDeleteSubmit} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openPopup} onClose={handleClosePopup}>
          <DialogTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Edit Project</Typography>
              <IconButton onClick={handleClosePopup}>
                <Close />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <ProjectForm project={project} editForm />
          </DialogContent>
        </Dialog>

        <CardContent
          sx={{
            height: "100px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={1} direction="row" alignItems={"center"}>
            <LinearProgress
              variant="determinate"
              color="info"
              value={50}
              sx={{
                height: "8px",
                width: "70%",
              }}
            ></LinearProgress>
            <Typography variant="body2">50%</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Tooltip title="Dashboard" placement="bottom">
            <IconButton
              aria-label="Dashboard"
              onClick={() => handleRedirect("dashboard")}
            >
              <Dashboard />
            </IconButton>
          </Tooltip>

          <Tooltip title="Test cases" placement="bottom">
            <IconButton
              aria-label="Test Cases"
              onClick={() => handleRedirect("testcases")}
            >
              <Badge badgeContent={4} color="primary">
                <Folder />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Active Release" placement="bottom">
            <IconButton
              aria-label="Active Releases"
              onClick={() => handleRedirect("releases")}
            >
              <Badge badgeContent={1} color="error">
                <WorkHistory />
              </Badge>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Paper>
  );
}

export default Project;

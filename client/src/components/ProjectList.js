import {
  AddCircle,
  Close,
  Dashboard,
  Folder,
  MoreVert,
  WorkHistory,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import ProjectForm from "./ProjectForm";

const linkStyle = {
  textDecoration: "none",
};

function ProjectsList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                title="Rapido"
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
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Copy</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>

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
                  <IconButton aria-label="Dashboard">
                    <Dashboard />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Test cases" placement="bottom">
                  <IconButton aria-label="Test Cases">
                    <Badge badgeContent={4} color="primary">
                      <Folder />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Active Release" placement="bottom">
                  <IconButton aria-label="Active Releases">
                    <Badge badgeContent={1} color="error">
                      <WorkHistory />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectsList;

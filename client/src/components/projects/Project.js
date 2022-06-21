import { Dashboard, Folder, MoreVert, WorkHistory } from "@mui/icons-material";
import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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

function Project() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  );
}

export default Project;

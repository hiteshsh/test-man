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
import Handlepopup from "../common/Handlepopup";
import UserForm from "./UserForm";

function UsersHeader() {
  const { openPopup, handleOpenPopup, handleClosePopup } = Handlepopup();
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
        padding={2}
      >
        <Grid item md={4}>
          <Typography variant="h5">Users</Typography>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Stack direction="row" sx={{ float: "right" }}>
            <Button
              variant="contained"
              size="medium"
              startIcon={<Add />}
              sx={{ textTransform: "none" }}
              onClick={handleOpenPopup}
            >
              Add User
            </Button>
            <Dialog open={openPopup} onClose={handleClosePopup}>
              <DialogTitle>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">Add User</Typography>
                  <IconButton onClick={handleClosePopup}>
                    <Close />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
                <UserForm />
              </DialogContent>
            </Dialog>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UsersHeader;

import React from "react";
import { Close, CreateNewFolder } from "@mui/icons-material";
import { Box } from "@mui/system";

import {
  ButtonBase,
  IconButton,
  List,
  Modal,
  Paper,
  Typography,
  Backdrop,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import TestSuiteForm from "./TestSuiteForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TestSuiteListData() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Paper elevation={0}>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Test Suites</Typography>
          <div>
            <ButtonBase>
              <IconButton
                color="primary"
                aria-label="add test suite"
                style={{ float: "right" }}
                onClick={handleOpen}
              >
                <CreateNewFolder />
              </IconButton>
            </ButtonBase>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">Add Test Suite</Typography>
                  <ButtonBase>
                    <IconButton onClick={handleClose}>
                      <Close />
                    </IconButton>
                  </ButtonBase>
                </div>
              </DialogTitle>
              <DialogContent>
                <TestSuiteForm />
              </DialogContent>
            </Dialog>
          </div>
        </Box>
        <Divider />
        <Typography
          variant="body1"
          color="rgb(101, 116, 139)"
          minHeight={"300px"}
          padding="20px"
        >
          There are no Suites
        </Typography>
      </List>
    </Paper>
  );
}

export default TestSuiteListData;

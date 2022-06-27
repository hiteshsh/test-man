import { Close, CreateNewFolder } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import Handlepopup from "../common/Handlepopup";
import TestSuiteForm from "./TestSuiteForm";

function TestSuiteListDataHeader() {
  const { openPopup, handleOpenPopup, handleClosePopup } = Handlepopup();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        justifyContent: "space-between",
        minHeight: "50px",
      }}
    >
      <Typography variant="h6">Test Suites</Typography>
      <div>
        <IconButton
          color="primary"
          aria-label="add test suite"
          style={{ float: "right" }}
          onClick={handleOpenPopup}
        >
          <CreateNewFolder />
        </IconButton>
        <Dialog open={openPopup} onClose={handleClosePopup}>
          <DialogTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Add Test Suite</Typography>
              <IconButton onClick={handleClosePopup}>
                <Close />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <TestSuiteForm />
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
}

export default TestSuiteListDataHeader;

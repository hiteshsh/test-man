import React, { useCallback, useState } from "react";
import {
  Edit,
  FolderOutlined,
  Group,
  Delete,
  ExpandLess,
  ExpandMore,
  PostAdd,
  Close,
} from "@mui/icons-material";

import {
  Box,
  Paper,
  List,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Popper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import TestSuiteListDataHeader from "./TestSuiteListDataHeader";
import { useProject } from "../../context/ProjectProvider";
import { onDeleteSuite } from "./TestSuiteAPI";
import TestSuiteSectionForm from "./TestSuiteSectionForm";
import Handlepopup from "../common/Handlepopup";

function TestSuiteListData({
  testsuites,
  handleClick,
  selectedIndex,
  onSublistClick,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [suiteToDelete, setSuiteToDelete] = useState(null);
  const [suiteToEdit, setSuiteToEdit] = useState(null); // Added state to hold the suite ID for the "Add Section" form
  const { selectedProject } = useProject();
  const { openPopup, handleOpenPopup, handleClosePopup } = Handlepopup();

  const handleMouseEnter = useCallback((event, index) => {
    setAnchorEl(event.currentTarget);
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setAnchorEl(null);
    setHoveredIndex(null);
  }, []);

  const openTestSectionForm = useCallback(
    (event, suiteId) => {
      event.stopPropagation();
      setSuiteToEdit(suiteId);
      handleOpenPopup();
    },
    [handleOpenPopup]
  );

  const open = Boolean(anchorEl);

  const handleDeleteClick = useCallback((event, suiteId) => {
    event.stopPropagation();
    setSuiteToDelete(suiteId);
    setOpenDialog(true);
  }, []);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSuiteToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (suiteToDelete) {
      try {
        await onDeleteSuite(suiteToDelete); // API call to delete the suite

        window.location = `/project/${selectedProject._id}/testcases`;

        // Close the dialog
        handleDialogClose();
      } catch (error) {
        console.error("Failed to delete test suite or navigate:", error);
      }
    }
  };

  return (
    <Paper elevation={0}>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <TestSuiteListDataHeader />
        <Divider />

        {testsuites && testsuites.length > 0 ? (
          testsuites.map((suite, index) => (
            <React.Fragment key={suite._id}>
              <ListItemButton
                id={suite._id}
                selected={selectedIndex === index}
                onClick={(e) => {
                  handleClick(e, index, suite._id);
                }}
                onMouseEnter={(e) => handleMouseEnter(e, index)}
                onMouseLeave={handleMouseLeave}
              >
                <ListItemIcon>
                  <FolderOutlined />
                </ListItemIcon>
                <ListItemText inset primary={suite.name} sx={{ pl: 0 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                </Box>

                {hoveredIndex === index && (
                  <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement="right"
                    disablePortal
                  >
                    <Paper elevation={2} sx={{ display: "flex", padding: 1 }}>
                      <IconButton
                        onClick={(event) =>
                          openTestSectionForm(event, suite._id)
                        }
                        sx={{ color: "#3b82f6" }}
                      >
                        <PostAdd />
                      </IconButton>
                      <IconButton
                        onClick={(event) => event.stopPropagation()}
                        sx={{ color: "#3b82f6" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={(event) => handleDeleteClick(event, suite._id)}
                        sx={{ color: "#3b82f6" }}
                      >
                        <Delete />
                      </IconButton>
                    </Paper>
                  </Popper>
                )}
              </ListItemButton>

              {suite.sections && (
                <Collapse
                  in={index === selectedIndex}
                  timeout="auto"
                  unmountOnExit
                  key={suite._id}
                >
                  <List component="div" disablePadding>
                    {suite.sections.map((section) => (
                      <ListItemButton
                        key={section._id}
                        id={suite._id + "_" + section._id}
                        onClick={(e) => {
                          onSublistClick(e);
                        }}
                      >
                        <ListItemText primary={section.name} sx={{ pl: 8 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))
        ) : (
          <Typography
            variant="body1"
            color="rgb(101, 116, 139)"
            minHeight={"300px"}
            padding="20px"
          >
            There are no Suites
          </Typography>
        )}
      </List>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Test Suite</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this test suite? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Section Dialog */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Add Section</Typography>
            <IconButton onClick={handleClosePopup}>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <TestSuiteSectionForm testSuiteId={suiteToEdit} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default TestSuiteListData;

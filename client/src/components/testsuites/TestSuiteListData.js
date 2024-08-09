import React from "react";
import { Edit, FolderOutlined, Group } from "@mui/icons-material";
import { Box } from "@mui/system";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  List,
  Paper,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Tooltip,
} from "@mui/material";
import TestSuiteListDataHeader from "./TestSuiteListDataHeader";
import TestSuiteListAPI from "./TestSuiteListAPI";

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

function TestSuiteListData({
  testsuites,
  handleClick,
  selectedIndex,
  onSublistClick,
}) {
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
              >
                <ListItemIcon>
                  <FolderOutlined />
                </ListItemIcon>
                <ListItemText inset primary={suite.name} sx={{ pl: 0 }} />
                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              {suite.sections && (
                <Collapse
                  in={index === selectedIndex}
                  timeout="auto"
                  unmountOnExit
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
    </Paper>
  );
}

export default TestSuiteListData;

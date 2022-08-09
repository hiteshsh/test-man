import React from "react";
import { FolderOutlined, Group } from "@mui/icons-material";
import { Box } from "@mui/system";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  List,
  Paper,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
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

const testSuiteList = [
  {
    _id: "1234",
    name: "test suite 1",
    sections: [
      { _id: "sec1", name: "listing1" },
      { _id: "sec2", name: "finding1" },
    ],
    key: false,
  },
  {
    _id: "1235",
    name: "test suite 2",
    sections: [
      { _id: "sec3", name: "listing2" },
      { _id: "sec4", name: "finding2" },
    ],
    key: false,
  },
];

function TestSuiteListData() {
  const [open, setOpen] = React.useState(false);
  //const { testSuiteList, error, isLoading } = TestSuiteListAPI();

  const handleClick = () => {
    setOpen(!open);
  };

  function SectionListUI(suite) {
    return suite.sections.map((section) => (
      <ListItemButton key={section._id} sx={{ pl: 8 }}>
        <ListItemText primary={section.name} />
      </ListItemButton>
    ));
  }

  var testSuiteListEl = testSuiteList.map((suite) =>
    suite.sections.length < 0 ? (
      <ListItemButton key="new_project">
        <ListItemIcon>
          <FolderOutlined />
        </ListItemIcon>
        <ListItemText inset primary={suite.name} />
      </ListItemButton>
    ) : (
      <div key={suite._id}>
        <ListItemButton onClick={handleClick} key={suite._id}>
          <ListItemIcon>
            <FolderOutlined />
          </ListItemIcon>
          <ListItemText primary={suite.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          key={suite.sections._id}
          in={open}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {SectionListUI(suite)}
          </List>
        </Collapse>
      </div>
    )
  );

  //console.log("Testsuites ", testsuites);

  return (
    <Paper elevation={0}>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <TestSuiteListDataHeader />
        <Divider />
        {testSuiteList.length > 0 ? (
          testSuiteListEl
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

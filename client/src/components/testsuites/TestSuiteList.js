import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TestCaseListData from "../testcases/TestCaseListData";
import TestSuiteListAPI from "./TestSuiteListAPI";
import TestSuiteListData from "./TestSuiteListData";

const TestSuiteList = () => {
  const { testsuites, error, isLoading } = TestSuiteListAPI(
    "62e02165cc1c8782f8b4188b"
  );
  console.log("testsuites", testsuites);
  const [selectedIndex, setSelectedIndex] = React.useState("");
  const [sectionId, setSectionId] = React.useState("");
  const [testsuiteId, setTestSuiteId] = React.useState("");
  //const [selected]

  const handleClick = (e, index) => {
    //setOpen(!open);
    e.preventDefault();
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
    setTestSuiteId(e.currentTarget.id);
    setSectionId("");
  };

  const onSublistClick = (e) => {
    //setOpen(!open);
    e.preventDefault();
    const splitIds = e.currentTarget.id.split("_");
    setTestSuiteId(splitIds[0]);
    setSectionId(splitIds[1]);
  };

  return (
    <Box border="0px solid">
      <Grid container minHeight="315px" padding={2}>
        <Grid item md={3} padding={2}>
          <TestSuiteListData
            testsuites={testsuites}
            handleClick={handleClick}
            selectedIndex={selectedIndex}
            onSublistClick={onSublistClick}
          />
        </Grid>
        <Grid item md={9} padding={2}>
          <TestCaseListData
            projectId={"62e02165cc1c8782f8b4188b"}
            testsuiteId={testsuiteId}
            sectionId={sectionId}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestSuiteList;

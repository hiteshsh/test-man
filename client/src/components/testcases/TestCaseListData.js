import React from "react";
import { AddCircle } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TestCasesData from "./TestCasesData";
import TestCaseListAPI from "./TestCaseListAPI";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const testCaseList = [
  {
    id: "tc1",
    key: "TC-1",
    name: "test case 1",
    description: "test case 2",
    steps: [
      {
        instructions: "",
        expectedResult: "",
      },
      {
        instructions: "",
        expectedResult: "",
      },
    ],
    project: {
      id: "1234",
      name: "project1",
    },
    testsuite: {
      _id: "suite1",
    },
    section: {
      id: "sec1",
      name: "Listing",
    },
    type: "functional",
    createdBy: "",
    lastModifiedBy: "",
  },
];

function TestCaseListData({ projectId, testsuiteId, sectionId }) {
  const { testcases, error, isLoading } = TestCaseListAPI({
    projectId,
    testsuiteId,
    sectionId,
  });
  console.log("TestCaseListData projectId", projectId);

  return (
    <Paper elevation={0}>
      {testcases && testcases.length < 1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Link
            to="/testcase/new"
            state={{ projectId: projectId }}
            style={linkStyle}
          >
            <IconButton size="large" color="primary" aria-label="add test case">
              <AddCircle />
            </IconButton>
          </Link>

          <Typography>No Test case Found. Please add </Typography>
        </div>
      )}
      {testcases && testcases.length > 0 && (
        <TestCasesData testcases={testcases} projectId={projectId} />
      )}
    </Paper>
  );
}

export default TestCaseListData;

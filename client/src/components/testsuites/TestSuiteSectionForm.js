/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, TextField, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../utils/axios";
import { useProject } from "../../context/ProjectProvider";

const mainForm = css`
  root: {
    "& .MuiTextField-root": { m: 1, pb: 3, pr: 2 },
  }
`;

const initialValues = {
  name: "",
  testSuiteId: "",
};

function TestSuiteSectionForm({ testSuiteId }) {
  console.log("testSuiteId", testSuiteId);
  const { selectedProject, selectProject } = useProject();
  const [values, setValues] = useState(initialValues);

  //useEffect(() => {}, [values]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = (e) => {
    const { name, value } = e.target;
    setValues({
      ...initialValues,
      [name]: value,
    });
  };

  const saveSuiteSection = (e) => {
    e.preventDefault();

    const testSuiteSection = {
      name: values.name,
      testSuiteId: testSuiteId,
    };
    console.log("testSuiteSection", testSuiteSection);

    axiosPrivate.post("/section", testSuiteSection).then((res) => {
      window.location = "/project/" + selectedProject._id + "/testcases";
    });
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      sx={{
        "& .MuiTextField-root": { m: 1, pb: 3, pr: 2 },
      }}
    >
      <TextField
        variant="outlined"
        required
        label="Name"
        value={values.name}
        name="name"
        fullWidth
        onChange={handleInputChange}
        size="small"
      />

      <div>
        <Stack spacing={2} direction="row" sx={{ float: "right" }}>
          <Button variant="outlined" onClick={reset}>
            Reset
          </Button>
          <Button variant="contained" type="submit" onClick={saveSuiteSection}>
            Save
          </Button>
        </Stack>
      </div>
    </Box>
  );
}

export default TestSuiteSectionForm;

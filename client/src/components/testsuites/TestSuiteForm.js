/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, TextField, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

const mainForm = css`
  root: {
    "& .MuiTextField-root": { m: 1, pb: 3, pr: 2 },
  }
`;

const initialValues = {
  name: "",
  description: "",
  projectId: "",
};

function TestSuiteForm() {
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

      <TextField
        name="description"
        variant="outlined"
        label="Description"
        value={values.description}
        fullWidth
        onChange={handleInputChange}
        multiline
        rows={4}
        size="small"
      />

      <div>
        <Stack spacing={2} direction="row" sx={{ float: "right" }}>
          <Button variant="outlined" onClick={reset}>
            Reset
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Stack>
      </div>
    </Box>
  );
}

export default TestSuiteForm;

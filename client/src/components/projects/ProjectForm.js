/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, TextField, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { axiosPrivate } from "../../utils/axios";

const mainForm = css`
  root: {
    "& .MuiTextField-root": { m: 1, pb: 3, pr: 2 },
  }
`;

const initialValues = {
  name: "",
  description: "",
};

function ProjectForm({ project, editForm }) {
  const [values, setValues] = useState(
    editForm
      ? {
          id: project._id,
          name: project.name,
          description: project.description,
        }
      : initialValues
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const project = {
      description: values.description,
      name: values.name,
    };
    if (editForm) {
      const projectId = values.id;
      axiosPrivate.put("/project/" + projectId, project).then((res) => {
        window.location = "/projects";
      });
    } else {
      axiosPrivate.post("/project", project).then((res) => {
        window.location = "/projects";
      });
    }
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
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            id={values.id}
          >
            Save
          </Button>
        </Stack>
      </div>
    </Box>
  );
}

export default ProjectForm;

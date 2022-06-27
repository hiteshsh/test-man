import { Box, Button, Stack, TextField } from "@mui/material";
import { Axios } from "axios";
import React, { useState } from "react";

const initialValues = {
  name: "",
};

export default function RoleForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = {
      name: values.name,
    };
    console.log("submit", role);
    Axios.post("/role", role).then((res) => {
      console.log(res);
      console.log(res.data);
      window.location = "/roles";
    });
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      sx={{
        "& .MuiTextField-root": { m: 1, pb: 3, pr: 2 },
        minWidth: "500px",
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
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </div>
    </Box>
  );
}

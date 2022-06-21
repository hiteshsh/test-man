import { Box, TextField, Button, Stack, Grid, Paper } from "@mui/material";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const initialValues = {
  name: "",
  description: "",
  type: "",
  sectionId: "",
  suiteId: "",
  priority: "",
  expectedResult: "",
};

function TestCaseForm() {
  const [values, setValues] = useState(initialValues);

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
      marginTop={4}
      marginLeft={3}
      marginRight={3}
      border="0px solid"
      width="70%"
    >
      <Paper elevation={0}>
        <Grid container padding={2}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="description"
              required
              variant="outlined"
              label="Description"
              value={values.description}
              fullWidth
              onChange={handleInputChange}
              multiline
              rows={4}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="expectedResult"
              required
              variant="outlined"
              label="Expected Result"
              value={values.expectedResult}
              fullWidth
              onChange={handleInputChange}
              multiline
              rows={4}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 465 }} size="small" required>
              <InputLabel>Suite</InputLabel>
              <Select
                required
                name="suite"
                variant="outlined"
                value={values.suiteId}
                label="Suite"
                onChange={handleInputChange}
              >
                <MenuItem value={"functional"}>Suite1</MenuItem>
                <MenuItem value={"performance"}>Suite2</MenuItem>
                <MenuItem value={"security"}>Suite3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 465 }} size="small" required>
              <InputLabel>Section</InputLabel>
              <Select
                required
                name="section"
                variant="outlined"
                value={values.sectionId}
                label="Section"
                onChange={handleInputChange}
              >
                <MenuItem value={"functional"}>Section1</MenuItem>
                <MenuItem value={"performance"}>Section2</MenuItem>
                <MenuItem value={"security"}>Section3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 465 }} size="small">
              <InputLabel>Type</InputLabel>
              <Select
                required
                name="type"
                variant="outlined"
                value={values.type}
                label="Type"
                onChange={handleInputChange}
              >
                <MenuItem value={"functional"}>Functional</MenuItem>
                <MenuItem value={"performance"}>Performance</MenuItem>
                <MenuItem value={"security"}>Security</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 465 }} size="small" required>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                variant="outlined"
                value={values.priority}
                label="Priority"
                onChange={handleInputChange}
              >
                <MenuItem value={"functional"}>High</MenuItem>
                <MenuItem value={"performance"}>Medium</MenuItem>
                <MenuItem value={"security"}>Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div style={{ float: "right", margin: "10px" }}>
              <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={reset}>
                  Reset
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default TestCaseForm;

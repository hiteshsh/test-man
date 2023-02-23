import {
  Box,
  TextField,
  Button,
  Stack,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { Axios } from "axios";
import { axiosPrivate } from "../../../utils/axios";

const initialValues = {
  name: "",
  description: "",
  type: "",
  sectionId: "",
  suiteId: "",
  priority: "",
  expectedResult: "",
  isAutomated: false,
};

const label = { inputprops: { "aria-label": "Checkbox" } };

function TestCaseForm(props) {
  const [values, setValues] = useState(initialValues);
  const [checked, setChecked] = React.useState(false);
  console.log("test suite in form", props.testsuites);
  const testsuites = props.testsuites;
  const [suiteId, setSuiteId] = useState("");
  const [section, setSection] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDropDownChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setSuiteId(value);
    console.log("suiteId", suiteId);
    const filteredSuites =
      testsuites && testsuites.length > 0
        ? testsuites.filter((ts) => ts._id === suiteId)
        : [];
    console.log("filteredSuites", filteredSuites);

    if (filteredSuites.length > 0) {
      console.log("section", filteredSuites[0].sections);
      setSection(filteredSuites[0].sections);
    }
  };

  const reset = (e) => {
    const { name, value } = e.target;
    setValues({
      ...initialValues,
      [name]: value,
    });
    setChecked(false);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const testcase = {
      description: values.description,
      name: values.name,
      automated: checked,
      testsuiteId: values.suiteId,
      sectionId: values.sectionId,
      prjectId: "62e02165cc1c8782f8b4188b",
      type: values.type,
      priority: values.priority,
      status: "active",
      title: values.name,
      instructions: [],
    };
    console.log("submit", testcase);
    axiosPrivate.post("/testcase", testcase).then((res) => {
      window.location = "/testcases";
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
          <Grid item xs={12} padding={1}>
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
          <Grid item xs={6} padding={1}>
            <TextField
              name="description"
              required
              variant="outlined"
              label="Steps"
              value={values.description}
              fullWidth
              onChange={handleInputChange}
              multiline
              rows={4}
              size="small"
            />
          </Grid>
          <Grid item xs={6} padding={1}>
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
          <Grid item xs={6} padding={1}>
            <FormControl
              sx={{ m: 1, minWidth: 150, width: "97%" }}
              size="small"
              required
            >
              <InputLabel>Suite</InputLabel>
              <Select
                required
                name="suiteId"
                variant="outlined"
                value={values.suiteId}
                label="Suite"
                onChange={handleDropDownChange}
              >
                <MenuItem value="">
                  <em>-- Select Suite --</em>
                </MenuItem>
                {testsuites &&
                  testsuites.length > 0 &&
                  testsuites.map((suite) => (
                    <MenuItem key={suite._id} value={suite._id}>
                      {suite.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} padding={1}>
            <FormControl
              sx={{ m: 1, minWidth: 150, width: "97%" }}
              size="small"
              required
            >
              <InputLabel>Section</InputLabel>
              <Select
                required
                name="sectionId"
                variant="outlined"
                value={values.sectionId}
                label="Section"
                onChange={handleInputChange}
                defaultValue=""
              >
                <MenuItem value="">
                  <em>-- Select Section --</em>
                </MenuItem>
                {section &&
                  section.length > 0 &&
                  section.map((section) => (
                    <MenuItem key={section._id} value={section._id}>
                      {section.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} padding={1}>
            <FormControl
              sx={{ m: 1, minWidth: 150, width: "97%" }}
              size="small"
            >
              <InputLabel>Type</InputLabel>
              <Select
                required
                name="type"
                variant="outlined"
                value={values.type}
                label="Type"
                onChange={handleInputChange}
                defaultValue=""
              >
                <MenuItem value={"functional"}>Functional</MenuItem>
                <MenuItem value={"performance"}>Performance</MenuItem>
                <MenuItem value={"security"}>Security</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} padding={1}>
            <FormControl
              sx={{ m: 1, minWidth: 150, width: "97%" }}
              size="small"
              required
            >
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                variant="outlined"
                value={values.priority}
                label="Priority"
                onChange={handleInputChange}
              >
                <MenuItem value={"high"}>High</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} padding={1}>
            <FormControl sx={{ m: 1, minWidth: 150, width: "97%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...label}
                    name="isAutomated"
                    color="primary"
                    onChange={handleChange}
                    checked={checked}
                  />
                }
                label="Automated"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} padding={2}>
            <div style={{ float: "right", margin: "10px" }}>
              <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={reset}>
                  Reset
                </Button>

                <Button variant="outlined" type="submit">
                  Save & Add more
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

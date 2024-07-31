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
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import { useProject } from "../../../context/ProjectProvider";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [checked, setChecked] = React.useState(false);
  const testsuites = props.testsuites;
  const projectId = props.projectId;
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
    const filteredSuites =
      testsuites && testsuites.length > 0
        ? testsuites.filter((ts) => ts._id === suiteId)
        : [];

    if (filteredSuites.length > 0) {
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
      title: values.name,
      prerequisite: values.prerequisite,
      steps: [],
      automated: checked,
      testsuiteId: values.suiteId,
      sectionId: values.sectionId,
      projectId: projectId,
      type: values.type,
      priority: values.priority,
    };

    axiosPrivate.post("/testcase", testcase).then((res) => {
      navigate(`/project/${projectId}/testcases`);
    });
  };

  return (
    <>
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
            <Grid item xs={12} padding={1}>
              <TextField
                variant="outlined"
                label="Prerequisite"
                value={values.prerequisite}
                name="prerequisite"
                fullWidth
                multiline
                rows={4}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={6} padding={1}>
              <TextField
                name="steps"
                variant="outlined"
                label="Steps"
                value={values.instruction}
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
              >
                <InputLabel>Section</InputLabel>
                <Select
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
                  <Button variant="contained" type="submit" onClick={onSubmit}>
                    Save
                  </Button>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default TestCaseForm;

import {
  Box,
  TextField,
  Button,
  Stack,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { axiosPrivate } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { RemoveCircle } from "@mui/icons-material";

const initialValues = {
  name: "",
  description: "",
  type: "",
  sectionId: "",
  suiteId: "",
  priority: "",
  isAutomated: false,
};

const label = { inputprops: { "aria-label": "Checkbox" } };

function TestCaseForm(props) {
  const navigate = useNavigate();
  const { testcaseId, testsuites, projectId } = props; // testcaseId is passed as prop
  console.log("testsuite", testsuites);
  const [values, setValues] = useState(initialValues);
  const [checked, setChecked] = useState(false);
  const [stepsFields, setStepsFields] = useState([
    { step: "", expectedResult: "" },
  ]);
  const [suiteId, setSuiteId] = useState("");
  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (testcaseId) {
      // If testcaseId is provided, fetch the test case data
      setLoading(true);
      axiosPrivate
        .get(`/testcase/${testcaseId}`)
        .then((response) => {
          const testCaseData = response.data;
          console.log("testData", testCaseData);
          // Populate the form with the fetched data
          setValues({
            name: testCaseData.title,
            description: testCaseData.prerequisite,
            type: testCaseData.type,
            sectionId: testCaseData.sectionId,
            suiteId: testCaseData.testsuiteId,
            priority: testCaseData.priority,
            isAutomated: testCaseData.automated,
          });
          setChecked(testCaseData.automated);
          setStepsFields(
            testCaseData.steps || [{ step: "", expectedResult: "" }]
          );
          setSuiteId(testCaseData.testsuiteId);

          const filteredSuites =
            testsuites && testsuites.length > 0
              ? testsuites.filter((ts) => ts._id === testCaseData.testsuiteId)
              : [];
          if (filteredSuites.length > 0) {
            setSection(filteredSuites[0].sections);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch test case data:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading once data is fetched
        });
    }
  }, [testcaseId, testsuites]);

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
        ? testsuites.filter((ts) => ts._id === value)
        : [];

    console.log("filteredSuites", filteredSuites);
    //console.log("sections", filteredSuites[0].sections);

    if (filteredSuites.length > 0) {
      setSection(filteredSuites[0].sections);
    } else {
      setSection([]); // Clear sections if no suites are found
    }
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const newStepsFields = [...stepsFields];
    newStepsFields[index][name] = value;
    setStepsFields(newStepsFields);
  };

  const addStepField = () => {
    setStepsFields([...stepsFields, { step: "", expectedResult: "" }]);
  };

  const deleteStepField = (index) => {
    const newStepsFields = [...stepsFields];
    newStepsFields.splice(index, 1);
    setStepsFields(newStepsFields);
  };

  const reset = () => {
    setValues(initialValues);
    setStepsFields([{ step: "", expectedResult: "" }]);
    setChecked(false);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const testcase = {
      title: values.name,
      prerequisite: values.description,
      steps: stepsFields,
      automated: checked,
      testsuiteId: values.suiteId,
      sectionId: values.sectionId,
      projectId: projectId,
      type: values.type,
      priority: values.priority,
    };

    if (testcaseId) {
      // Update existing test case
      axiosPrivate.put(`/testcase/${testcaseId}`, testcase).then((res) => {
        navigate(`/project/${projectId}/testcases`);
      });
    } else {
      // Create new test case
      axiosPrivate.post("/testcase", testcase).then((res) => {
        navigate(`/project/${projectId}/testcases`);
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

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
        marginRight={4}
        border="0px solid"
        width="90%"
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
                value={values.description}
                name="description"
                fullWidth
                multiline
                rows={4}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>

            {stepsFields.map((stepField, index) => (
              <React.Fragment key={index}>
                <Grid item xs={5.5} padding={1}>
                  <TextField
                    name="step"
                    variant="outlined"
                    label={`Step ${index + 1}`}
                    value={stepField.step}
                    fullWidth
                    onChange={(e) => handleStepChange(index, e)}
                    multiline
                    rows={4}
                    size="small"
                  />
                </Grid>
                <Grid item xs={5.5} padding={1}>
                  <TextField
                    name="expectedResult"
                    variant="outlined"
                    label={`Expected Result ${index + 1}`}
                    value={stepField.expectedResult}
                    fullWidth
                    onChange={(e) => handleStepChange(index, e)}
                    multiline
                    rows={4}
                    size="small"
                  />
                </Grid>
                <Grid item xs={0.5} padding={5}>
                  {stepsFields.length > 1 && (
                    <IconButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteStepField(index)}
                    >
                      <RemoveCircle />
                    </IconButton>
                  )}
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12} padding={1}>
              <Grid container justifyContent="center">
                <Button
                  variant="contained"
                  justifyContent="center"
                  onClick={addStepField}
                >
                  Add Step
                </Button>
              </Grid>
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

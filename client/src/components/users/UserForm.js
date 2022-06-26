import {
  Box,
  TextField,
  Button,
  Stack,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const names = [
  "Project 1",
  "Project 2",
  
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, projectName, theme) {
  return {
    fontWeight:
      projectName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const initialValues = {
  emailIds: [],
  roleId: "",
  projects: [],
};

function UserForm() {
  const theme = useTheme();
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
  const [projectName, setProjectName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjectName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
        name="emailId"
        variant="outlined"
        label="EmailId"
        value={values.emailIds}
        fullWidth
        onChange={handleInputChange}
        size="small"
      />
      <FormControl
        sx={{ m: 1, minWidth: 150, width: "97%", pb: 2 }}
        size="small"
        required
      >
        <InputLabel>Role</InputLabel>
        <Select
          required
          name="roleId"
          variant="outlined"
          value={values.roleId}
          label="Role"
          onChange={handleInputChange}
        >
          <MenuItem value={"tester"}>Tester</MenuItem>
          <MenuItem value={"Lead"}>Lead</MenuItem>
          <MenuItem value={"Manager"}>Manager</MenuItem>
        </Select>
      </FormControl>

      <div>
        <FormControl sx={{ m: 1, width: "97%", pb: 2 }} size="small">
          <InputLabel id="demo-multiple-chip-label">Projects</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={projectName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, projectName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <Stack
          spacing={2}
          direction="row"
          sx={{ float: "right", margin: "10px" }}
        >
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

export default UserForm;

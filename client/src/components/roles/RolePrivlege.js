import {
  Button,
  Checkbox,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function RolePrivlege(props) {
  const role = props.roles[props.selectedIndex];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: "#F0F0F0" }}>
            <TableCell>{role?.name} &gt; Permissions</TableCell>
            <TableCell align="center">View</TableCell>
            <TableCell align="center">Add & Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {role?.priviledge.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {row.ptype.map((type) => (
                <TableCell align="center" key={type.name + "_" + row.name}>
                  {type.show ? (
                    <Checkbox
                      key={role.name + "_" + type.name + "_" + row.name}
                      checked={type.allowed}
                      disabled={type.disabled}
                      onChange={(e) => {
                        props.onChangeCheckbox(
                          e,
                          role.name + "_" + row.name + "_" + type.name
                        );
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="4">
              <Stack
                spacing={2}
                padding={2}
                direction="row"
                sx={{
                  float: "right",
                }}
              >
                <Button variant="outlined">Reset</Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default RolePrivlege;

import {
  Button,
  Checkbox,
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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Permissions</TableCell>
            <TableCell align="center">View</TableCell>
            <TableCell align="center">Add & Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.role.priviledge.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {row.type.map((type) => (
                <TableCell align="center" key={type.name + "_" + row.name}>
                  {type.show ? (
                    <Checkbox
                      key={type.name + "_" + row.name}
                      checked={type.allowed}
                      disabled={type.disabled}
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

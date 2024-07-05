import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  {
    id: 1,
    instructions: "open the app\nhello app",
    expectedResult: "app should be opened\nhello app",
  },
  {
    id: 2,
    instructions: "another aoo",
    expectedResult: "another aoo",
  },
];

const StepsTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="steps table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#E6E8F0" }}>
            <TableCell></TableCell>
            <TableCell sx={{ fontWeight: "400" }}>Instructions</TableCell>
            <TableCell sx={{ fontWeight: "400" }}>Expected Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {steps.map((step) => (
            <TableRow key={step.id}>
              <TableCell scope="row">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    filled
                    label={step.id}
                    size="small"
                    sx={{ background: "#10B981", color: "#FFFFFF" }}
                  ></Chip>
                </Box>
              </TableCell>
              <TableCell scope="row" sx={{ whiteSpace: "pre-line" , width:"40%" }}>
                {step.instructions}
              </TableCell>
              <TableCell scope="row" sx={{ borderLeft: "1px solid #E6E8F0" }}>
                {step.expectedResult}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StepsTable;

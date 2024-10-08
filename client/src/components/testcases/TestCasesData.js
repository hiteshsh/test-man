import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

import {
  Add, Delete,
  Edit
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TestCaseDetail from "./testcase/TestCaseDetail";

const linkStyle = {
  textDecoration: "underline",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
    color: "red",
  },
};

const headCells = [
  {
    id: "key",
    numeric: false,
    disablePadding: true,
    label: "Key",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "actions",
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  //onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  //order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  //orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, projectId } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 70%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All test cases
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button
            component={Link}
            to="/testcase/new"
            variant="contained"
            state={{ projectId: projectId }}
            size="small"
            startIcon={<Add />}
            sx={{ textTransform: "none", mt: 1, mb: 1 }}
          >
            Add test
          </Button>

          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TestCasesData({ testcases, projectId }) {
  const navigate = useNavigate();

  const handleRedirect = (id) => {
    navigate(`/testcase/${id}`);
  };
  //console.log("rows", testcases);
  const tests = testcases;
  let rows = [];
  tests.map((test) => {
    //const rowData = createData(test.title, test._id);
    rows.push(test);
  });
  console.log("all tests", rows);

  const [open, setOpen] = React.useState([]);

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    event.preventDefault();
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleDrawerOpen = (e, key) => {
    if (!open.includes(key)) {
      setOpen([...open, key]);
    }
    //setOpen([...open, key]);
    console.log("state of open", open);
  };
  //const navigate = useNavigate();
  const handleDrawerClose = (e, key) => {
    console.log("key", key);
    setOpen((prevOpen) => {
      const newOpen = prevOpen.filter((t) => t !== key);
      console.log("after closing update of open", newOpen);
      return newOpen;
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          projectId={projectId}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.title);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      {row.key === "testcaseHeader" ? (
                        <TableRow
                          key={row.key}
                          selected={isItemSelected}
                          hover
                          onClick={(event) => handleClick(event, row.title)}
                          role="checkbox"
                          sx={{ backgroundColor: "#E8E8E8" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell colSpan={3} padding="none" align="left">
                            <Typography sx={{ fontWeight: 500 }}>
                              {row.title}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.key}
                          selected={isItemSelected}
                        >
                          <TableCell
                            padding="checkbox"
                            onClick={(event) => handleClick(event, row.title)}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            key={row.key}
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.key}
                          </TableCell>
                          <TableCell
                            align="left"
                            key={row.title}
                            onClick={(e) => handleDrawerOpen(e, row.key)}
                            style={{ cursor: "pointer" }}
                          >
                            <Typography fontWeight={500}>
                              {row.title}
                            </Typography>

                            {open.indexOf(row.key) > -1 ? (
                              <TestCaseDetail
                                open={open}
                                setOpen={setOpen}
                                testDetail={row}
                                handleDrawerClose={handleDrawerClose}
                              ></TestCaseDetail>
                            ) : (
                              <></>
                            )}
                          </TableCell>

                          <TableCell align="right">
                            <Link
                              to={`/testcase/${row._id}`}
                              state={{ projectId: row.projectId }}
                              style={linkStyle}
                            >
                              <IconButton
                                
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Link>
                            <IconButton>
                              <Delete fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

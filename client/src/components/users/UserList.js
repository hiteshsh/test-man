import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const rows = [
  {
    id: 1,
    emailId: "jonSnow@gmail.com",
    name: "Jon",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    emailId: "jonSnow@gmail.com",
    name: "Jon",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    emailId: "jonSnow@gmail.com",
    name: "Jon",
    role: "Tester",
    status: "Active",
  },
  {
    id: 4,
    emailId: "jonSnow@gmail.com",
    name: "Jon",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 5,
    emailId: "jonSnow@gmail.com",
    name: "Jon",
    role: "Lead",
    status: "Active",
  },
  {
    id: 6,
    emailId: "jonSnow@gmail.com",
    name: "Jon",
    role: "Manager",
    status: "Active",
  },
  {
    id: 7,
    emailId: "jonSnow@gmail.com",
    name: "Jon",
    role: "Admin",
    status: "Inactive",
  },
];

// function getChipProps(params: GridRenderCellParams): ChipProps {
//   if (params.value === "Active") {
//     return {
//       icon: <WarningIcon style={{ fill: red[500] }} />,
//       label: params.value,
//       style: {
//         borderColor: red[500],
//       },
//     };
//   } else {
//     return {
//       icon: <CheckCircleIcon style={{ fill: blue[500] }} />,
//       label: params.value,
//       style: {
//         borderColor: blue[500],
//       },
//     };
//   }
// }

export default function UserList() {
  //const [rows, setRows] = React.useState(rows);
  const deleteUser = (e) => {};
  const editUser = (e) => {};

  const columns = [
    { field: "id", headerName: "Id", width: 70 },
    { field: "emailId", headerName: "Email Id", width: 300 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        if (params.value === "Active") {
          return (
            <Chip
              label={params.value}
              size="small"
              style={{
                backgroundColor: "rgb(20, 184, 166)",
                color: "rgb(255, 255, 255)",
              }}
            />
          );
        } else {
          return (
            <Chip
              label={params.value}
              size="small"
              style={{
                color: "rgb(255, 255, 255)",
                backgroundColor: "rgb(209, 67, 67)",
              }}
            />
          );
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={deleteUser(params.id)}
        />,

        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={editUser(params.id)}
        />,
      ],
      width: 150,
    },
  ];

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      sx={{
        "& .MuiTextField-root": { m: 1, pb: 3, pr: 2 },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#F0F0F0",
          fontSize: 16,
        },
      }}
      marginTop={4}
      marginLeft={3}
      marginRight={3}
      border="0px solid"
      width="80%"
    >
      <div style={{ height: 400, width: "100%", backgroundColor: "#ffff" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
              backgroundColor: "#000",
            },
          }}
        />
      </div>
    </Box>
  );
}

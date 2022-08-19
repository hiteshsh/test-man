import {
  CheckBoxOutlineBlankOutlined,
  Close,
  Delete,
  DraftsOutlined,
  Edit,
  HomeOutlined,
  InboxOutlined,
  MailOutline,
  ReceiptOutlined,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const data = [
  {
    name: "Home",
    icon: <HomeOutlined />,
  },
  { name: "Inbox", icon: <InboxOutlined /> },
  { name: "Outbox", icon: <CheckBoxOutlineBlankOutlined /> },
  { name: "Sent mail", icon: <MailOutline /> },
  { name: "Draft", icon: <DraftsOutlined /> },
  { name: "Trash", icon: <ReceiptOutlined /> },
];

export default function TestCaseDetail({ open, setOpen, testDetail }) {
  //const [open, setOpen] = React.useState(true);
  console.log("testDetail", testDetail);
  return (
    <div sx={{ backgroundColor: "#000", color: "#fff", opacity: 0.5 }}>
      <Drawer
        open={open}
        anchor={"right"}
        onClose={() => setOpen(false)}
        variant="permanent"
      >
        <Paper style={{ width: 750 }} onClick={() => setOpen(false)}>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h4">{testDetail.name}</Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              <IconButton aria-label="edit" disabled color="primary">
                <Edit />
              </IconButton>

              <IconButton aria-label="delete" disabled color="primary">
                <Delete />
              </IconButton>
              <IconButton aria-label="close" disabled color="primary">
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Drawer>
    </div>
  );
}

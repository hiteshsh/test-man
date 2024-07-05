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
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  Typography,
} from "@mui/material";
import React from "react";
import StepsTable from "./TestCaseSteps";

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

export default function TestCaseDetail({
  open,
  setOpen,
  testDetail,
  handleDrawerClose,
}) {
  //const [open, setOpen] = React.useState(true);
  console.log("testDetail", testDetail);
  return (
    <div sx={{ color: "#fff" }}>
      <Drawer
        open={open}
        anchor={"right"}
        onClose={handleDrawerClose}
        variant="permanent"
      >
        <Paper
          style={{
            width: "670px",
            padding: "16px",
            backgroundColor: "#f6f8fa",
            height: "100%",
          }}
          onClick={(e) => handleDrawerClose(e, testDetail.key)}
        >
          <Grid container alignItems="center" padding={2}>
            <Grid item xs={9}>
              <Typography variant="h5" fontWeight={500}>
                {testDetail.name}
              </Typography>
            </Grid>

            <Grid item xs={3} container justifyContent="flex-end">
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
          <Box>
            <Paper>
              <Grid container padding={2}>
                <Grid item xs={3}>
                  <Box>
                    <Typography h6>Type</Typography>
                    <div>Functional</div>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography h6>Priority</Typography>
                    <div>High</div>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography h6>Automated</Typography>
                    <div>yes</div>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography h6>Estimated</Typography>
                    <div>15 min</div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Divider flex></Divider>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={6}>
                  <Box>
                    <Typography h6>Created By</Typography>
                    <div>Hitesh Sharma</div>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography h6>Last Updated By</Typography>
                    <div>Hitesh Sharma</div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Divider flex></Divider>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Typography h6>Pre-requisite</Typography>
                    <div>Steps for the pre conditions</div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Divider flex></Divider>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Typography h6>Steps</Typography>
                    <StepsTable />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Paper>
      </Drawer>
    </div>
  );
}

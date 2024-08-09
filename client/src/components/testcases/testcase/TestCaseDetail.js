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
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import StepsTable from "./TestCaseSteps";
import { useNavigate } from "react-router-dom";

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
  // Determine if the drawer should be open based on the key
  const isDrawerOpen = Array.isArray(open) && open.includes(testDetail.key);

 

  return (
    <div sx={{ color: "#fff" }}>
      <Drawer
        open={isDrawerOpen}
        anchor={"right"}
        onClose={(e) => handleDrawerClose(e, testDetail.key)}
        variant="temporary"
      >
        <Paper
          style={{
            width: "670px",
            padding: "16px",
            backgroundColor: "#f6f8fa",
            height: "100%",
          }}
        >
          <Grid container alignItems="center" padding={2}>
            <Grid item xs={9}>
              <Typography variant="h5" fontWeight={500}>
                {testDetail.title}
              </Typography>
            </Grid>

            <Grid item xs={3} container justifyContent="flex-end">
              <IconButton aria-label="edit" color="primary">
                <Edit />
              </IconButton>

              <IconButton aria-label="delete" color="primary">
                <Delete />
              </IconButton>
              <IconButton
                aria-label="close"
                color="primary"
                onClick={(e) => handleDrawerClose(e, testDetail.key)}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Box>
            <Paper>
              <Grid container padding={2}>
                <Grid item xs={3}>
                  <Box>
                    <Typography variant="h6">Type</Typography>
                    <div>{testDetail.type}</div>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography variant="h6">Priority</Typography>
                    <div>{testDetail.priority}</div>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography variant="h6">Automated</Typography>
                    <div>{testDetail?.automated ? "yes" : "no"}</div>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography variant="h6">Estimated</Typography>
                    <div>15 min</div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Divider />
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="h6">Created By</Typography>
                    <div>Hitesh Sharma</div>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="h6">Last Updated By</Typography>
                    <div>Hitesh Sharma</div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Divider />
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="h6">Pre-requisite</Typography>
                    <div>Steps for the pre conditions</div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Divider />
                  </Box>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="h6">Steps</Typography>
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

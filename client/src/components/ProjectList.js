import { Add, AddCircle } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const linkStyle = {
  textDecoration: "none",
};

function ProjectsList() {
  return (
    <Box>
      <Grid
        container
        direction="row"
        sx={{ display: "flex" }}
        minHeight="250px"
        marginTop={4}
        marginLeft={3}
        marginRight={3}
      >
        <Grid item md={3}>
          <Link style={linkStyle}>
            <Paper
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="add project"
                >
                  <AddCircle fontSize="inherit" />
                </IconButton>
                <Typography>New Project</Typography>
              </CardContent>
            </Paper>
          </Link>
        </Grid>
        <Grid item md={3} paddingLeft="24px">
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card>
              <CardHeader></CardHeader>
              <CardContent></CardContent>
              <CardActions></CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectsList;

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { AppBar, Grid, Grow, Typography } from "@mui/material";
import testman from "./images/testman.png";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <AppBar position="static" color="inherit">
          <Typography align="center" variant="h2">
            TestMan
          </Typography>
          <img src={testman} height="60" width="60" alt="testman"></img>
        </AppBar>
        <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}></Grid>
                <Grid item xs={12} sm={4}></Grid>
              </Grid>
            </Container>
        </Grow>
      </Container>
    </React.Fragment>
  );
};

export default App;

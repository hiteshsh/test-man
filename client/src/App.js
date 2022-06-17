import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AddIcon from "@mui/icons-material/Add";
import SideMenu from "./components/SideMenu";
import { Button, ThemeProvider, createTheme } from "@mui/material";
//import testman from "./images/testman.png";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
          <SideMenu />
          <Button variant="contained" startIcon={<AddIcon />}>
            Add test Case
          </Button>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default App;

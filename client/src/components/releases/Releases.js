import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import SideMenu from "../SideMenu";
import { Box } from "@mui/material";

class Releases extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <SideMenu />
        <Box sx={{ marginLeft: "250px" }}></Box>
      </>
    );
  }
}

Releases.propTypes = {};

export default Releases;

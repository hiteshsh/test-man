import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Box } from "@mui/system";

const Dashboard = (props) => {
  return (
    <>
      <Header />
      <SideMenu />
      <Box sx={{ marginLeft: "250px" }}></Box>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;

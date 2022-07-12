import {
  AccountBox,
  AccountCircle,
  AccountCircleOutlined,
  AccountCircleTwoTone,
  Menu,
} from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const appBar = css`
  background-color: #24292f;
`;

function Header() {
  return (
    <AppBar position="static" css={appBar}>
      <Toolbar>
        <Grid container alignItems="center" >
          <Grid item md={0}>
            <IconButton>
              <Menu style={{ color: "#fff" }} />
            </IconButton>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6">Test-Man</Typography>
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <IconButton style={{ float: "right" }} size="large">
              <AccountCircle style={{ color: "#fff" }}></AccountCircle>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

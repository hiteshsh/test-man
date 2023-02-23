import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Axios from "axios";
import useAuth from "../../hooks/useAuth";
import axios from "../../utils/axios";

const theme = createTheme();

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  //const { setAuth } = useAuth();
  const [values, setValues] = React.useState(initialValues);
  const [error, setError] = React.useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const login = {
      emailId: values.email,
      password: values.password,
    };
    console.log("submit", login);
    axios
      .post("/login", login, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const emailId = login.emailId;
        console.log(res);
        if (!res.status === 200) {
          console.log("error", res);
          throw Error("Couldn't load data");
        }
        const accesstoken = res?.data?.token;
        const roles = res?.data?.roles;
        const user = { emailId, roles, accesstoken };
        //setAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
        //const user1 = localStorage.getItem("user");
        //console.log("get item", user1);
        //console.log("before login", emailId);
        setError(null);
        window.location = "/projects";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {error && <div>{error}</div>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              value={values.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              value={values.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;

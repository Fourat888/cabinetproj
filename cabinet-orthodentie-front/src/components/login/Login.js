import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { queryApi } from "../../utils/queryApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const theme = createTheme();


export default function Login() {
 
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
     const [res, err] =   queryApi("User/login", {     email: data.get("email"),   password: data.get("password") }, "POST", false).then((res)=>
     {
      console.log(res)

      if(res[0].admin){	
       
        localStorage.setItem('token', res[0].admin)

        window.location.href='/'
      }
   else if(res[0].authUser){
    			localStorage.setItem('token', res[0].authUser)
          window.location.href='/clients'
          // navigate("/clients");
        }
  })
     if (err) {

      console.log(err)
    } 
    else
    {
console.log(res)
      if (res.admin){

      }
    }
console.log(data)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img.freepik.com/vecteurs-libre/patient-assis-dans-chaise-medicale-lors-visite-traitement-isole-illustration-vectorielle-plane-dentiste-dessin-anime-travaillant-dans-armoire-diagnostic-concept-stomatologie-clinique-dentaire_74855-13192.jpg?t=st=1654989957~exp=1654990557~hmac=92b92f350c86e1a91ad7f15521c5866f13be6d4bbbf581ade2ae95e62600ec56&w=1060)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#21C1BE" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              se connecter
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Address email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Se Connecter
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

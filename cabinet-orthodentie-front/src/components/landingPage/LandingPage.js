import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Fonctionalite from "./fonctionalite/Fonctionalite";
import Avantages from "./avantage/Avantages";
import style from './style.css'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright Â© "}
      <Link color="inherit" href="#">
      Orthodentiste
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "FonctionnalitÃ©s",
    description: [
      "Dossier Patient",
      "Historique",
      "Rappel des RDV",
      "Facturation",
      "Imagerie",
    ],
  },
  {
    title: "Avantages",
    description: ["RapiditÃ©", "Performance", "ConvivialitÃ©"],
  },
];

function LandingContent() {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Ortho<span style={{ color: "green" }}>dontiste</span>
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Acceuil
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              FonctionnalitÃ©s
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Avantages
            </Link>
          </nav>
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Grid container spacing={2}>
  <Grid item xs={8}>
  <div
      className="img-responsive"
        style={{

          marginBottom: "3%",
          height:'100vh'
        }}
      >
        
      </div>  </Grid>
  <Grid item xs={4}>
  <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6,mt:10 ,backgroundColor:'white',radius:10}}

        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Logiciel de gestion de Cabinet d'Orthodontie
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            RÃ©pondre aux usages spÃ©cifiques du mÃ©decin orthodontiste. De la
            prise de rendez-vous jusquâ€™Ã  la facturation, il va Ãªtre le lien
            entre le mÃ©decin et ses patients
          </Typography>
        </Container>  </Grid>
 
</Grid>







    
      {/* End hero unit */}
      <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Orthodentiste Fonctionalites
          </Typography>
      <Grid container spacing={5} alignItems="flex-end">
        <Fonctionalite></Fonctionalite>
      </Grid>
      <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Orthodentiste Avantages
          </Typography>
      <Grid container spacing={5} alignItems="flex-end">
        <Avantages></Avantages>
      </Grid>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6 }}
        >
          <Typography
            component="h5"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Orthodentiste{" "}
          </Typography>
          <Typography
            variant="p"
            align="center"
            color="text.secondary"
            component="p"
          >
            ogiciel de gestion de Cabinet d'Orthodentie RÃ©pondre aux usages
            spÃ©cifiques du mÃ©decin orthodontiste. De la prise de rendez-vous
            jusquâ€™Ã  la facturation, il va Ãªtre le lien entre le mÃ©decin et ses
            patients
          </Typography>
        </Container>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function LandingPage() {
  return <LandingContent />;
}

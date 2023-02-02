import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  ExitToApp,
} from "@material-ui/icons";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Schedule from '../calendar/Calendar';
import ClientTable from '../client/ClientTable';
import ClientInfo from '../client/ClientInfo';
import AddClient from '../client/AddClient';
import AjouterConsultation from '../consultation/AjouterConsultation';
import AjouterFacture from '../Facture/AjouterFacture';
import AjoutRendezVous from '../rendez-vous/AjoutRendezVous';
import EditClient from '../client/Editclient';
import Editconsultation from '../consultation/Editconsultation';
import Editfacture from '../Facture/Editfacture';
import Editrdv from '../rendez-vous/Editrdv';
import { Button } from '@mui/material';
const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: '#21C1BE',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Menu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
function logout(){
  localStorage.removeItem('token')
window.location.href='/login'
}
  return (
    <Box sx={{ display: 'flex' }}>
               <Router>

      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Button onClick={logout} color="inherit">Logout </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

<Link to="/calendar">
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
           <GroupsIcon /> 
        </ListItemIcon>
        <ListItemText primary="Calendrier" sx={{ opacity: open ? 1 : 0,textDecoration:'none' }} />
      </ListItemButton>
    </ListItem>
    </Link>
    <Link to="/clients">

    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
<CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Patient" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
    </Link>

</List>
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      <Routes>

        <Route path="/calendar" caseSensitive={false} element={<Schedule />} />
        <Route path="/clients" caseSensitive={false} element={<ClientTable />} />
        <Route path="/clients/edit/:id" caseSensitive={false} element={<EditClient />} />
        <Route path="/Consultation/edit/:id" caseSensitive={false} element={<Editconsultation />} />
        <Route path="/Facture/edit/:id" caseSensitive={false} element={<Editfacture />} />
        <Route path="/RDV/edit/:id" caseSensitive={false} element={<Editrdv />} />
        <Route path="/clientInfo/:id" caseSensitive={false} element={<ClientInfo />} />
        <Route path="/ajouterPatient" caseSensitive={false} element={<AddClient />} />
        <Route path="/ajouterConsultation" caseSensitive={false} element={<AjouterConsultation />} />
        <Route path="/ajouterFacture" caseSensitive={false} element={<AjouterFacture />} />
        <Route path="/ajoutRendezVous/:id" caseSensitive={false} element={<AjoutRendezVous />} />
      </Routes>
      </Box>
      </Router>

    </Box>
    
  );
}

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import EventIcon from "@mui/icons-material/Event";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import RendezVousTable from "../rendez-vous/RendezVousTable";
import Avatar from '@mui/material/Avatar';
import Consultation from "../consultation/Consultation";
import FactureTable from "../Facture/FactureTable";
import DossierTable from "../Dossier/DossierTable";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
           <div style={{display:'inline-block'}}>
           <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/1249/1249910.png?w=740"/>
          <h5>Nom Client</h5>
           </div>
    
      <Grid container>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon tabs example"
            centered
          >
            <Tab
              icon={<EventIcon />}
              label="Rendez-Vous"
              iconPosition="start"
            />
            <Tab
              icon={<DensitySmallIcon />}
              iconPosition="start"
              label="Consultation"

            />
            <Tab
              icon={<FactCheckIcon />}
              iconPosition="start"
              label="Facture"

            />
            <Tab
              icon={<CreateNewFolderIcon />}
              iconPosition="start"
              label="Dossier Medicale"

            />
          </Tabs>{" "}
          <TabPanel value={value} index={0}>
            <RendezVousTable></RendezVousTable>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Consultation></Consultation>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <FactureTable></FactureTable>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DossierTable></DossierTable>
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}

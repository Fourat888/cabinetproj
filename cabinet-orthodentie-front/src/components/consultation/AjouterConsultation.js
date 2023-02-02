import React from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { queryApi } from "../../utils/queryApi";

function AjouterConsultation() {
  const formik = useFormik({
    initialValues: {
      Date: "",
      Etatactuelle: "",
      Actionjour: "",
      Decision: "",
  
    },
    onSubmit: (values) => {
      const [, err] =   queryApi("Consultation/add", JSON.stringify(values, null, 2), "POST", false);

    },
  });
  const [age, setAge] = React.useState("");

  const handleSubmit = () => {
   console.log(JSON.stringify(formik.initialValues));
  };
  return (
    <Box
      sx={{
                width: "100ch" ,
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"


    >
         <div style={{ display:'inline'}}>
        <PersonAddIcon fontSize="large" color="info" /> <h2>Ajouter Consultation</h2>
        </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {" "}
          <TextField
            required
            id="outlined-required"
            label="Action de Jour"
            onChange={formik.handleChange}
            value={formik.values.Actionjour}
            name="Actionjour"
            style={{backgroundColor:'#fff'}}
          />
          <TextField
            required
            id="outlined-required"
            label="Decision"
            onChange={formik.handleChange}
            value={formik.values.Decision}
            name="Decision"
          />
        </div>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Etat Actuelle"
            name="Etatactuelle"
            placeholder="Etat Actuelle"
            onChange={formik.handleChange}
            value={formik.values.Etatactuelle}
            style={{ width: 220 }}
          >
            <MenuItem value={"En cours"}selected >En cours</MenuItem>
            <MenuItem value={"Terminer"}>Terminer</MenuItem>
          </Select>
          <TextField
            id="Date"
            label="Date de Consultation"
            type="date"
            onChange={formik.handleChange}
            defaultValue={formik.values.Date}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        
        <Button color="primary" variant="contained" type="submit" >
          Ajouter
        </Button>{" "}
      </form>
    </Box>
  );
}

export default AjouterConsultation;

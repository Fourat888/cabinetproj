import React from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from "@mui/material/Box";
import { queryApi } from "../../utils/queryApi";

function AjouterFacture() {
  const formik = useFormik({
    initialValues: {
      Date: "",
      Montantpaye: "",
      Restpaye: "",
    },
    onSubmit: (values) => {
      const [, err] =   queryApi("Facture/add", JSON.stringify(values, null, 2), "POST", false);

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
      noValiDate
      autoComplete="off"


    >
         <div style={{ display:'inline'}}>
        <PersonAddIcon fontSize="large" color="info" /> <h2>Ajouter Facture</h2>
        </div>
      <form onSubmit={formik.handleSubmit}>
      <div>
          {" "}
          <TextField
            required
            id="outlined-required"
            label="Montantpaye"
            onChange={formik.handleChange}
            value={formik.values.Montantpaye}
            name="Montantpaye"
            style={{backgroundColor:'#fff'}}
          />
          </div>
          <div>
          <TextField
            required
            id="outlined-required"
            label="Montantpaye Restant"
            onChange={formik.handleChange}
            value={formik.values.Restpaye}
            name="Restpaye"
          />
        
        </div>
          <div>
          <TextField
            id="Date"
            label="Date"
            type="Date"
            onChange={formik.handleChange}
            defaultValue={formik.values.Date}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
           </div>
          <div>
        <Button color="primary" variant="contained" type="submit" >
          Ajouter
        </Button>{" "}
        </div>
      </form>
    </Box>
  );
}

export default AjouterFacture;

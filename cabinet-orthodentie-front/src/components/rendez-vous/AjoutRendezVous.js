import React from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { queryApi } from "../../utils/queryApi";
import { useParams } from "react-router-dom";

function AjoutRendezVous() {

  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      Heure: "",
      Date: "",
      Patient: {"_id": id},

  
    },
    onSubmit: (values) => {
      const [, err] =   queryApi("RDV/add", JSON.stringify(values, null, 2), "POST", false);

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
        <PersonAddIcon fontSize="large" color="info" /> <h2>Ajouter Rendez Vous</h2>
        </div>
      <form onSubmit={formik.handleSubmit}>
      <div>
          {" "}
          <TextField
        id="Heure"
        label="Heure"
        type="time"
        onChange={formik.handleChange}
        defaultValue={formik.values.Heure}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
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

export default AjoutRendezVous;

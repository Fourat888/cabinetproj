import React from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { queryApi } from "../../utils/queryApi";

function AddClient() {
  const formik = useFormik({
    initialValues: {
      Nom: "",
      Prenom: "",
      Date: "",
      Sexe: "",
      Numtel: "",
      Addresse: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const [, err] =   queryApi("Patient/add", JSON.stringify(values, null, 2), "POST", false);
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
        <PersonAddIcon fontSize="large" color="info" /> <h2>Ajouter Patient</h2>
        </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {" "}
          <TextField
            required
            id="outlined-required"
            label="Nom"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="Nom"
          />
          <TextField
            required
            id="outlined-required"
            label="Prenom"
            onChange={formik.handleChange}
            value={formik.values.Prenom}
            name="Prenom"
          />
        </div>
        <div>
          <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sexe"
            name="Sexe"
            onChange={formik.handleChange}
            value={formik.values.Sexe}
            style={{ width: 220 }}
          >
            <MenuItem value={"Homme"}>Homme</MenuItem>
            <MenuItem value={"Femme"}>Femme</MenuItem>
          </Select>
          <TextField
            id="Date"
            label="Birthday"
            type="date"
            onChange={formik.handleChange}
            defaultValue={formik.values.Date}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          {" "}
          <TextField
            required
            id="outlined-required"
            label="Telephone"
            onChange={formik.handleChange}
            value={formik.values.Numtel}
            name="Numtel"
          />
          <TextField
            required
            id="outlined-required"
            label="Adresse"
            onChange={formik.handleChange}
            value={formik.values.Addresse}
            name="Addresse"
          />
        </div>
        <Button color="primary" variant="contained" type="submit" >
          Ajouter
        </Button>{" "}
      </form>
    </Box>
  );
}

export default AddClient;

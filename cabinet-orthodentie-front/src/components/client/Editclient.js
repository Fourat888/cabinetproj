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
import { useState,useEffect } from "react";
import moment from 'moment';

function EditClient() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Nom: "",
        Prenom: "",
        Date: "",
        Sexe: "",
        Numtel: "",
        Addresse: ""
    });
    let date_modified

    if (formData.Date!=''){
        date_modified= new Date(formData.Date).toLocaleDateString('en-CA')
    }
    async function fetchData() {
        console.log("aaaaaaa")
        const [res, err] = await queryApi("Patient/find/" + id);
        console.log(res)
        setFormData({
            Nom: res.Nom,
            Prenom: res.Prenom,
            Date: res.Date,
            Sexe: res.Sexe,
            Numtel: res.Numtel,
            Addresse: res.Addresse,
        });
      }
      useEffect(() => {
        fetchData();
      }, [id]);
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const onChangeDate = (e) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setValue(newDate);
        setFormData({ ...formData, [e.target.name]: newDate });
        console.log(newDate); //value picked from date picker
      };
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
      alert(JSON.stringify(values, null, 2));
      const [, err] =   queryApi("Patient/edit/"+id, JSON.stringify(values, null, 2), "POST", false);
    },
  });
  const [age, setAge] = React.useState("");

  const handleSubmit = () => {
   console.log(JSON.stringify(formik.initialValues));
   const [, err] =   queryApi("Patient/edit/"+id, formData, "POST", false);

  };
  const [value, setValue] = useState(moment().format('YYYY-MM-DD'));

  
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
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          <TextField
            required
            id="outlined-required"
            label="Nom"
            onChange={(e) => onChange(e)}
            value={formData.Nom}
            name="Nom"
          />
          <TextField
            required
            id="outlined-required"
            label="Prenom"
            onChange={(e) => onChange(e)}
            value={formData.Prenom}
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
            onChange={(e) => onChange(e)}
            value={formData.Sexe}
            style={{ width: 220 }}
          >
            <MenuItem value={"Homme"}>Homme</MenuItem>
            <MenuItem value={"Femme"}>Femme</MenuItem>
          </Select>
          <TextField
            label="Birthday"
            type="date"
            name="Date"
            onChange={(e) => onChange(e)}
            value={date_modified}
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
            onChange={(e) => onChange(e)}
            value={formData.Numtel}
            name="Numtel"
          />
          <TextField
            required
            id="outlined-required"
            label="Adresse"
            onChange={(e) => onChange(e)}
            value={formData.Addresse}
            name="Addresse"
          />
        </div>
        <Button color="primary" variant="contained" type="submit" >
          Modifier
        </Button>{" "}
      </form>
    </Box>
  );
}

export default EditClient;

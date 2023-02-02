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

function Editfacture() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Restpaye: "",
        Montantpaye: "",
        Date: "",
       
    });
    let date_modified
    if (formData.Date!=''){
        date_modified= new Date(formData.Date).toLocaleDateString('en-CA')
    }

    async function fetchData() {
        console.log("aaaaaaa")
        const [res, err] = await queryApi("Facture/find/" + id);
        console.log(res)
        setFormData({
            Restpaye: res.Restpaye,
            Montantpaye: res.Montantpaye,
            Date: res.Date,         
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
      Restpaye: "",
      Montantpaye: "",
      Date: "",
      Sexe: "",
      Numtel: "",
      Addresse: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const [, err] =   queryApi("Facture/edit/"+id, JSON.stringify(values, null, 2), "POST", false);
    },
  });
  const [age, setAge] = React.useState("");

  const handleSubmit = () => {
   console.log(JSON.stringify(formik.initialValues));
   const [, err] =   queryApi("Facture/edit/"+id, formData, "POST", false);

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
            label="Restpaye"
            onChange={(e) => onChange(e)}
            value={formData.Restpaye}
            name="Restpaye"
          />
          <TextField
            required
            id="outlined-required"
            label="Montantpaye"
            onChange={(e) => onChange(e)}
            value={formData.Montantpaye}
            name="Montantpaye"
          />
        </div>
        <div>
          <TextField
            label="Date"
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
     
        <Button color="primary" variant="contained" type="submit" >
          Modifier
        </Button>{" "}
      </form>
    </Box>
  );
}

export default Editfacture;

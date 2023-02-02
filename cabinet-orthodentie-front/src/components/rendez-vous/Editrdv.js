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

function Editrdv() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Heure: "",
        Date: "",
    });

    let date_modified
  
    if (formData.Date!=''){
        date_modified= new Date(formData.Date).toLocaleDateString('en-CA')
    }

    async function fetchData() {
        console.log("aaaaaaa")
        const [res, err] = await queryApi("RDV/find/" + id);
        console.log(res)
        setFormData({
            Heure: res.Heure,
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
      Heure: "",
      Montantpaye: "",
      Date: "",
      Sexe: "",
      Numtel: "",
      Addresse: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const [, err] =   queryApi("RDV/edit/"+id, JSON.stringify(values, null, 2), "POST", false);
    },
  });
  const [age, setAge] = React.useState("");

  const handleSubmit = () => {
   console.log(JSON.stringify(formik.initialValues));
   const [, err] =   queryApi("RDV/edit/"+id, formData, "POST", false);
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
        <PersonAddIcon fontSize="large" color="info" /> <h2>Modifier Rdv</h2>
        </div>
      <form onSubmit={handleSubmit}>
      <TextField
        name="Heure"
        label="Heure"
        type="time"
        onChange={(e) => onChange(e)}
        value={formData.Heure}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
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

export default Editrdv;

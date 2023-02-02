import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from "@mui/icons-material/Event";
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect,Suspense } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RendezVousTable() {
  const navigate = useNavigate();

  const { id } = useParams();

  const deleteclientComponent = async (id) => {
    setTest(true)
    console.log("yes")
    const [, err] = await queryApi("RDV/delete/" + id, {}, "GET");
    if (err) {
      console.log(err);
    } else
    setTest(false)
      };
  
  const [rdv,setrdv]= useState(null)
  const [test,setTest] = useState(false)
  async function fetchData() {
    console.log("aaaaaaa")

    const [res, err] = await queryApi("RDV");
    console.log(res)
    setrdv(res);
  }
  useEffect( () => {
    fetchData()
       }, [test]);
  const columns = [
    { field: 'Heure', headerName: 'Heure',    width: 450,
  },
    { field: 'Date', headerName: 'Date' ,    width: 450,
  },
  {
    field: "Action",
    renderCell: (cellValues) => {
      return (<div>
          <DeleteIcon
      color="error"
      onClick={() => {
        deleteclientComponent(cellValues.row._id);
      }}
    />
            
        <EditIcon  color="info" onClick={() => {
          onRowSelect( cellValues);
        }}/>
        </div>
      );
    } ,
    width : 350
  }
];
const onDelete = (value) => {
  console.log(value.row);
  };
  const onRowSelect = (value) => {
      console.log(value.row);
      navigate("/RDV/edit/" + value.row._id);

      };
  
  const rows = [
    { id: 1, heure: '10:30', date: "23/07/2000"},
  
  ];
  
  
  return (
    <div style={{ height: 400  }}>
      <a href={`/ajoutRendezVous/${id}`}  >
        <Button
          variant="contained"
          endIcon={<EventIcon />}
          style={{ marginBottom: "5%" }}
        >
          {" "}
          Ajouter Rendez Vous
        </Button>
      </a>
      {rdv ?  ( 

      <DataGrid 
      getRowId={(row) => row._id}
        rows={rdv}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[2]} 
        />):('<p>dafad</p>')}
        </div>
  );
}

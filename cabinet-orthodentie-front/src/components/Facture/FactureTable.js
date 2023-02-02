import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FactCheckIcon from "@mui/icons-material/FactCheck";

import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect,Suspense } from "react";
import { useNavigate } from "react-router-dom";

export default function FactureTable() {
  const navigate = useNavigate();

  const deleteclientComponent = async (id) => {
    setTest(true)
    console.log("yes")
    const [, err] = await queryApi("Facture/delete/" + id, {}, "GET");
    if (err) {
      console.log(err);
    } else
    setTest(false)
      };
   
  const [factures,setfactures]= useState(null)
  const [test,setTest] = useState(false) 
  async function fetchData() {
    console.log("aaaaaaa")

    const [res, err] = await queryApi("Facture");
    console.log(res)
    setfactures(res);
  }
  useEffect( () => {
    fetchData()
       }, [test]);

const columns = [

    { field: 'Date', headerName: 'Date' ,    width: 200,
  },
  { field: 'Montantpaye', headerName: 'Montant ' ,    width: 300,
  },
  { field: 'Restpaye', headerName: 'Montant Restant' ,    width: 300,
  },
  {
    field: "Action",
    width: 300,
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
    }
  }
];
const onDelete = (value) => {
  console.log(value.row);
  };
  const onRowSelect = (value) => {
      console.log(value.row);
      navigate("/Facture/edit/" + value.row._id);
      };
  
  const rows = [
    { id: 1,  date: "23/07/2000",montant: '1000',montantRestant: '100'},
  
  ];

  
  return (
    <div style={{ height: 400 }}>
      
      <a href="/ajouterFacture">
        <Button
          variant="contained"
          endIcon={<FactCheckIcon />}
          style={{ marginBottom: "5%" }}
        >
          {" "}
          Ajouter Facture
        </Button>
      </a>
      {factures ? (
      <DataGrid 
      getRowId={(row) => row._id}
        rows={factures}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[3]} 
     />):('<p>dafad</p>')}

    </div>
  );
}

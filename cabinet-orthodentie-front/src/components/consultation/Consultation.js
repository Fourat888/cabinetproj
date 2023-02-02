import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import EditIcon from '@mui/icons-material/Edit';

import { Button } from "@mui/material";
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect,Suspense } from "react";
import { useNavigate } from "react-router-dom";


function Consultation() {
  const [Consultation,setconsultation]= useState(null)
  const [test,setTest] = useState(false)

  async function fetchData() {
    console.log("aaaaaaa")

    const [res, err] = await queryApi("Consultation");
    console.log(res)
    setconsultation(res);
  }
  const deleteclientComponent = async (id) => {
    setTest(true)
    console.log("yes")
    const [, err] = await queryApi("Consultation/delete/" + id, {}, "GET");
    if (err) {
      console.log(err);
    } else
    setTest(false)
      };
      const navigate = useNavigate();

  useEffect( () => {
    fetchData()
       }, [test]);
       const columns = [
        { field: "Date", headerName: "Date", width: 200 },
        { field: "Etatactuelle", headerName: "Etat Actuelle", width: 200 },
        { field: "Actionjour", headerName: "Action Jour", width: 350 },
        { field: "Decision", headerName: "Decision", width: 350 },
      
        {
          field: "Action",
          width: 200,
          renderCell: (cellValues) => {
            return (
              <div>
                  <DeleteIcon
      color="error"
      onClick={() => {
        deleteclientComponent(cellValues.row._id);
      }}
    />
      
                <EditIcon
                  color="info"
                  onClick={() => {
                    onRowSelect(cellValues);
                  }}
                />
              </div>
            );
          },
        },
      ];
      const onDelete = (value) => {
        console.log(value.row);
      };
      const onRowSelect = (value) => {
        console.log(value.row);
        navigate("/Consultation/edit/" + value.row._id);

      };
      
      const rows = [
        {
          id: 1,
          date: "10/12/2015",
          etatActuelle: "en cours",
          actionJour: "action jour",
          decision: "Decision",
        },
        {
          id: 2,
          date: "10/12/2015",
          etatActuelle: "en cours",
          actionJour: "action jour",
          decision: "Decision",
        },
      ];
  return (
    <div style={{ height: 400 }}>
      <a href="/ajouterConsultation">
        <Button
          variant="contained"
          endIcon={<DensitySmallIcon />}
          style={{ marginBottom: "5%" }}
        >
          {" "}
          Ajouter Consultation
        </Button>
      </a>
      {Consultation ? (
      <DataGrid
      getRowId={(row) => row._id}

        rows={Consultation}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        />):('<p>dafad</p>')}
        </div>
  );
}

export default Consultation;

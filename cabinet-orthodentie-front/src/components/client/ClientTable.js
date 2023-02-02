import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect,Suspense } from "react";
import { Link } from "react-router-dom";

export default function ClientTable() {
  const [clients,setclients]= useState(null)
  const [test,setTest] = useState(false)

  async function fetchData() {
    console.log("aaaaaaa")

    const [res, err] = await queryApi("Patient");
    console.log(res)
    setclients(res);
  }
  useEffect( () => {
    fetchData()
       }, [test]);

       const deleteclientComponent = async (id) => {
        setTest(true)
        console.log("yes")
        const [, err] = await queryApi("Patient/delete/" + id, {}, "GET");
        if (err) {
          console.log(err);
        } else
        setTest(false)
          };
      
  const columns = [
    { field: "Nom", headerName: "Nom", width: 200 },
    { field: "Prenom", headerName: "Prenom", width: 200 },
    { field: "Date", headerName: "Date de Naissance", width: 200 },
    {
      field: "Sexe",
      headerName: "Sexe",
      width: 200,
    },
    {
      field: "Addresse",
      headerName: "Addresse",
      description: "This column has a value getter and is not sortable.",
      width: 200,
    },
    {
      field: "Numtel",
      headerName: "Numero Telephone",
      type: "number",
      width: 200,
    },
    {
      field: "Action",
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

<RemoveRedEyeIcon
              color="info"
              onClick={() => {
                test2(cellValues);
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
    navigate("/clients/edit/" + value.row._id);

  };
  const test2 = (value) => {
    console.log(value.row);
    navigate("/clientInfo/" + value.row._id);

  };
  const rows = [
    {
      id: 1,
      nom: "siwar",
      prenom: "hame",
      dateNaissance: "23/07/2000",
      sexe: "Femme",
      addresse: "Tunis",
      tel: "123445678",
    },
  ];

  const navigate = useNavigate();

  const handleOnCellClick = (params) => {
    navigate("/clientInfo/" + params.row.id);
  };

  return (
    <div style={{ height: 400 }}>
      <div style={{ display: "inline" }}>
        <GroupsIcon fontSize="large" color="info" /> <h2>Liste des Patients</h2>
      </div>
      <a href="/ajouterPatient">
        <Button
          variant="contained"
          endIcon={<PersonAddIcon />}
          style={{ marginBottom: "5%" }}
        >
          {" "}
          Ajouter Patient
        </Button>
      </a>

      {clients ?  ( 
      <DataGrid
      getRowId={(row) => row._id}

        rows={clients}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // onCellClick={handleOnCellClick}
      />):('<p>dafad</p>')}
    </div>
  );
}

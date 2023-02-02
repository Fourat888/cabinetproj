import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect,Suspense } from "react";
export default function DossierTable() {
  const [Dossier,setdossiers]= useState(null)
  const [test,setTest] = useState(false)

  async function fetchData() {
    console.log("aaaaaaa")

    const [res, err] = await queryApi("DossierPatient");
    console.log(res)
    setdossiers(res);
  }
  const deleteclientComponent = async (id) => {
    setTest(true)
    console.log("yes")
    const [, err] = await queryApi("DossierPatient/delete/" + id, {}, "GET");
    if (err) {
      console.log(err);
    } else
    setTest(false)
      };
  
  useEffect( () => {
    fetchData()
       }, [test]);

    const columns = [
        { field: 'DateCreation', headerName: 'Date de Creation',     width: 300,
      },
        { field: 'Couttotal', headerName: 'Cout total' ,    width: 300,
      },
      { field: 'Duree', headerName: 'Duree' ,     width: 300,
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
            };
      const rows = [
        { id: 1, date: "23/07/2000", coutTotal: '1000',duree:'120'},
      
      ];
   
  return (
    <div style={{ height: 400 }}>
      
{Dossier? (
      <DataGrid 
      getRowId={(row) => row._id}

        rows={Dossier}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[2]} 
        />):('<p>dafad</p>')}

    </div>
  );
}

import React from "react";
import {
  DataGrid,
  GridRowData,
  GridColDef,
  GridSelectionModel,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { AppState, stateContext } from "../App";

const useStyles = makeStyles({
  root: {
    borderColor: "#F3F3F3",
    "& .selected-datagrid-row": {
      background: "#F3F3F3",
      "&:hover": {
        background: "#F3F3F3",
      },
    },
    "& .datagrid-row": {
      "&:hover": {
        background: "none",
      },
    },
  },
});

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Mission",
    width: 200,
  },
  {
    field: "col2",
    headerName: "Date",
    width: 150,
  },
  {
    field: "col3",
    headerName: "Success",
    width: 100,
    align: "right",
  },
  {
    field: "col4",
    headerName: "Rocket",
    width: 200,
    align:"right"
  },
];

const DataTable = () => {
  const classes = useStyles();
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const {selected, setSelected, data, setToCompare} = React.useContext<AppState>(stateContext);

  let rows: GridRowData[] = [];

  function selectionModelChanged(selectionModel: GridSelectionModel) {
    if (selectionModel.length > 2) {
      selectionModel.shift();
    }
    setSelectionModel(selectionModel);
    setToCompare(selectionModel);
    
  }

  function onRowClick(params: GridRowParams, event: MuiEvent) {
    setSelectionModel([]);
    setSelected(parseInt(params.id.toString()));
    setToCompare([])
  }

  data!.forEach((val, index: number) => {
    rows.push({
      id: index,
      col1: val!.mission_name,
      col2: new Date(val!.launch_date_local).toDateString(),
      col3: val!.launch_success ? "Yes" : "No",
      col4: val!.rocket?.rocket_name
    });
  });

  return (
    <DataGrid
      style = {{height:"100%"}}
      className={classes.root}
      rows={rows}
      columns={columns}
      onRowClick={onRowClick}
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={selectionModelChanged}
      selectionModel={selectionModel}
      getRowClassName={(params) => params.id == selected ? "selected-datagrid-row" : "datagrid-row"}
    />
  );
};

export default DataTable;

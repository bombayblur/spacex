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

// Custom classes for row colour of selected launch
//
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
  const {selectedLaunchId, setSelectedLaunchId, data, setToCompare} = React.useContext<AppState>(stateContext);

  let rows: GridRowData[] = [];

  // Logic for making sure only two items can be selected at any given time.
  //
  function onRowSelect(selectionModel: GridSelectionModel) {
    if (selectionModel.length > 2) {
      selectionModel.shift();
    }
    setSelectionModel(selectionModel);
    setToCompare(selectionModel);
  }

  function onRowClick(params: GridRowParams, event: MuiEvent) {
    setSelectionModel([]); // deselects any previously selected rows
    setSelectedLaunchId(parseInt(params.id.toString()));
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
      style = {{height:"60%"}}
      className={classes.root}
      rows={rows}
      columns={columns}
      onRowClick={onRowClick}
      pageSize={10}
      autoHeight
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={onRowSelect}
      selectionModel={selectionModel}
      getRowClassName={(params) => params.id === selectedLaunchId ? "selected-datagrid-row" : "datagrid-row"} // This sets row color for selected row
    />
  );
};

export default DataTable;

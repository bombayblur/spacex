import { Grid, Box } from "@mui/material";
import DataDisplay from "./datadisplay";
import DataTable from "./datatable";

const TableAndDisplay = () => {
  return (
    <Box style={{padding: 20,}}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
         <DataTable/>
        </Grid>
        <Grid item xs={12} md={6}>
          <DataDisplay/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableAndDisplay;


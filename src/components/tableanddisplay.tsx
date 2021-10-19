import { Grid, Box } from "@mui/material";
import DataDisplay from "./datadisplay";
import DataTable from "./datatable";

// This component mereley serves as a wrapper to efficiently apply the grid system to descendant components.
//
const TableAndDisplay = () => {
  return (
    <Box style={{padding: 20,}}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
        <Box sx={{height:"400"}}>
          <DataTable/>
        </Box> 
        </Grid>
        <Grid item xs={12} md={6}>
        <Box sx={{height:"400"}}>
          <DataDisplay/>
        </Box> 
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableAndDisplay;


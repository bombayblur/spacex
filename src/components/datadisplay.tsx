import React from "react";
import { AppState, stateContext } from "../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataDisplay = () => {
  const { selectedLaunch } = React.useContext<AppState>(stateContext);
  return (
    <div style={{ padding: 20, background: "#F3F3F3", height: "80vh" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mission Name</TableCell>
              <TableCell align="right">{selectedLaunch.mission_name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
                <TableCell>Date of Launch</TableCell>
                <TableCell align="right">{new Date(selectedLaunch.launch_date_local).toDateString()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Success</TableCell>
                <TableCell align="right">{selectedLaunch.launch_success ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Launch Site</TableCell>
                <TableCell align="right">{selectedLaunch.launch_site?.site_name_long}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Link</TableCell>
                <TableCell align="right"><a href={selectedLaunch.links!.wikipedia!}>Wikipedia</a></TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Rocket</TableCell>
                <TableCell align="right">{selectedLaunch.rocket?.rocket_name}</TableCell>
            </TableRow>
            {selectedLaunch.rocket?.first_stage?.cores?.map((item)=>(
                <>
                <TableRow>
                    <TableCell>Flight</TableCell>
                    <TableCell align="right">{item?.flight}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Reuse Count</TableCell>
                    <TableCell align="right">{item?.core?.reuse_count}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">{item?.core?.status}</TableCell>
                </TableRow>
                </>
            ))}
            {selectedLaunch.rocket?.second_stage?.payloads?.map((item)=>(
                <>
                <TableRow>
                    <TableCell>Payload Mass (Kg)</TableCell>
                    <TableCell align="right">{item?.payload_mass_kg}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Payload Type</TableCell>
                    <TableCell align="right">{item?.payload_type}</TableCell>
                </TableRow>
                </>
            ))}
            <TableRow>
                <TableCell>Rocket Type</TableCell>
                <TableCell align="right">{selectedLaunch.rocket?.rocket_type}</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataDisplay;

import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { AppState, stateContext } from "../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const Compare = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, toCompare } = useContext<AppState>(stateContext);
  const comp1 = data![toCompare![0] as number];
  const comp2 = data![toCompare![1] as number];

  const comp1Cores = comp1?.rocket?.first_stage?.cores;
  const comp2Cores = comp2?.rocket?.first_stage?.cores;

  const comp1Payloads = comp1?.rocket?.second_stage?.payloads;
  const comp2Payloads = comp2?.rocket?.second_stage?.payloads;

  return (
    <Box>
      <Button
        disabled={!props.active}
        onClick={handleOpen}
        variant="contained"
        size="large"
        sx={{ mx: 3 }}
      >
        Compare
      </Button>
      {comp1 && comp2 ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
            >
              Comaprison
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Mission Name</TableCell>
                    <TableCell align="right">{comp1?.mission_name}</TableCell>
                    <TableCell align="right">{comp2?.mission_name}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Date of Launch</TableCell>
                    <TableCell align="right">
                      {new Date(comp1?.launch_date_local).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(comp2?.launch_date_local).toDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Success</TableCell>
                    <TableCell align="right">
                      {comp1?.launch_success ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="right">
                      {comp2?.launch_success ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Launch Site</TableCell>
                    <TableCell align="right">
                      {comp1?.launch_site?.site_name_long}
                    </TableCell>
                    <TableCell align="right">
                      {comp2?.launch_site?.site_name_long}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Link</TableCell>
                    <TableCell align="right">
                      <a href={comp1?.links!.wikipedia!}>Wikipedia</a>
                    </TableCell>
                    <TableCell align="right">
                      <a href={comp2?.links!.wikipedia!}>Wikipedia</a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rocket</TableCell>
                    <TableCell align="right">
                      {comp1?.rocket?.rocket_name}
                    </TableCell>
                    <TableCell align="right">
                      {comp2?.rocket?.rocket_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Flight</TableCell>
                    <TableCell align="right">{comp1Cores![0]?.flight}</TableCell>
                    <TableCell align="right">{comp2Cores![0]?.flight}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Reuse Count</TableCell>
                    <TableCell align="right">
                      {
                        comp1Cores![0]?.core?.reuse_count
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        comp2Cores![0]?.core?.reuse_count
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">
                      {
                       comp1Cores![0]?.core?.status
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        comp2Cores![0]?.core?.status
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mass (Kg)</TableCell>
                    <TableCell align="right">
                      {
                        comp1Payloads![0]?.payload_mass_kg
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        comp2Payloads![0]?.payload_mass_kg
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">
                      {
                        comp1Payloads![0]?.payload_type
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        comp2Payloads![0]?.payload_type
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rocket Type</TableCell>
                    <TableCell align="right">
                      {comp1?.rocket?.rocket_type}
                    </TableCell>
                    <TableCell align="right">
                      {comp2?.rocket?.rocket_type}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Compare;

import {
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppState, stateContext } from "../App";

const Filter = () => {
  const {missionFilter, setMissionFilter, rocketFilter, setRocketFilter} = useContext<AppState>(stateContext);
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{ display: "inline-block", margin: 5}}
      >
        Filter By
      </Typography>
      <TextField
        id="mission-filter"
        label="Mission"
        variant="outlined"
        size="small"
        sx={{ mx: 0.5}}
        value = {missionFilter}
        onChange={(e)=>setMissionFilter(e.currentTarget.value)}
      />
      <TextField
        id="rocket-filter"
        label="Rocket"
        variant="outlined"
        size="small"
        sx={{ mx: 0.5}}
        value = {rocketFilter}
        onChange={(e)=>setRocketFilter(e.currentTarget.value)}
      />
    </>
  );
};

export default Filter;

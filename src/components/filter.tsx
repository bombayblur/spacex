import {
  FormControl,
  TextField,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppState, stateContext } from "../App";

const Filter = () => {
  const {mission, setMission, rocket, setRocket} = useContext<AppState>(stateContext);
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{ display: "inline-block", margin: 5 }}
      >
        Filter By
      </Typography>
      <TextField
        id="mission-filter"
        label="Mission"
        variant="outlined"
        size="small"
        sx={{ mx: 0.5}}
        value = {mission}
        onChange={(e)=>setMission(e.currentTarget.value)}
      />
      <TextField
        id="rocket-filter"
        label="Rocket"
        variant="outlined"
        size="small"
        sx={{ mx: 0.5}}
        value = {rocket}
        onChange={(e)=>setRocket(e.currentTarget.value)}
      />
    </>
  );
};

export default Filter;

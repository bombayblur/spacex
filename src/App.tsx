import { gql, useQuery } from "@apollo/client";
import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridSelectionModel } from "@mui/x-data-grid";
import { createContext, useState } from "react";
import Compare from "./components/compare";
import Filter from "./components/filter";
import TableAndDisplay from "./components/tableanddisplay";
import { GetLaunchesQuery, Launch } from "./generated/graphql";

export const spacexQuery = gql`
  query getLaunches {
    launchesPast {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      launch_success
      links {
        wikipedia
      }
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
          }
        }
        rocket_type
      }
    }
  }
`;

export interface AppState {
  selected: number;
  setSelected: (n: number) => void;
  selectedLaunch: Launch;
  data: GetLaunchesQuery['launchesPast'];
  toCompare: GridSelectionModel | null;
  setToCompare: (a: GridSelectionModel) => void;
  compareModal: boolean;
  setCompareModal:(c:boolean)=>void;
  mission:string,
  setMission:(m:string)=> void,
  rocket:string,
  setRocket:(r:string)=> void
}

export const stateContext = createContext<AppState>({} as AppState);

export default function App() {
  const { loading, error, data } = useQuery<GetLaunchesQuery>(spacexQuery);
  const [selected, setSelected] = useState<number>(0);
  const [toCompare, setToCompare] = useState<GridSelectionModel>([]);
  const [compareModal, setCompareModal] = useState<boolean>(false)
  const [mission, setMission] = useState<string>('');
  const [rocket, setRocket] = useState<string>('');

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    console.log(error);
    return <div>{error?.message}</div>;
  }

  const selectedLaunch: Launch = data!.launchesPast![selected]! as Launch;
  let launchesPast = data!.launchesPast!.filter((item)=>item?.mission_name!.includes(mission));
  launchesPast = launchesPast!.filter((item)=>item?.rocket!.rocket_name!.includes(rocket));

  return (
    <stateContext.Provider
      value={{
        selected: selected,
        setSelected: setSelected,
        selectedLaunch: selectedLaunch,
        data: launchesPast,
        toCompare: toCompare,
        setToCompare: setToCompare,
        compareModal: compareModal,
        setCompareModal: setCompareModal,
        mission:mission,
        setMission:setMission,
        rocket:rocket,
        setRocket:setRocket
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "60vw", mx: "auto", pt: 5 }}>
        <Typography variant="h1" component="div" gutterBottom align="center">
          SpaceX Launches
        </Typography>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2} alignContent="center">
          <Compare active={toCompare.length === 2} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Filter />
        </Grid>
      </Grid>
      <TableAndDisplay/>
    </stateContext.Provider>
  );
}

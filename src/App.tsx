import { gql, useQuery } from "@apollo/client";
import {
  Grid,
  Typography,
  CircularProgress
} from "@mui/material";
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

// Type definition for app state.
//
export interface AppState {
  selectedLaunchId: number;
  setSelectedLaunchId: (n: number) => void;
  selectedLaunch: Launch;
  data: GetLaunchesQuery["launchesPast"];
  toCompare: GridSelectionModel | null;
  setToCompare: (a: GridSelectionModel) => void;
  showCompareModal: boolean;
  setShowCompareModal: (c: boolean) => void;
  missionFilter: string;
  setMissionFilter: (m: string) => void;
  rocketFilter: string;
  setRocketFilter: (r: string) => void;
}

// using React's context for state management as the project is small/
//
export const stateContext = createContext<AppState>({} as AppState);

export default function App() {
  const { loading, error, data } = useQuery<GetLaunchesQuery>(spacexQuery);

  const [selectedLaunchId, setSelectedLaunchId] = useState<number>(0); // currently selected launch Id

  const [toCompare, setToCompare] = useState<GridSelectionModel>([]); // items to be comapred
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false); // compare button active or not

  const [missionFilter, setMissionFilter] = useState<string>(""); // mission filter
  const [rocketFilter, setRocketFilter] = useState<string>(""); // rocket filter

  // Loading animation while query is being fetched.
  //
  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    );
  }
  //
  if (error || !data) {
    return <div>{error?.message}</div>;
  }

  const selectedLaunch: Launch = data!.launchesPast![selectedLaunchId]! as Launch;

  // This is where the filtering mechanism resides.
  //
  let launchesPast = data!.launchesPast!.filter((item) =>
    item?.mission_name!.includes(missionFilter)
  );
  launchesPast = launchesPast!.filter((item) =>
    item?.rocket!.rocket_name!.includes(rocketFilter)
  );

  return (
    // This is where the global state originates from.
    <stateContext.Provider
      value={{
        selectedLaunchId: selectedLaunchId,
        setSelectedLaunchId: setSelectedLaunchId,
        selectedLaunch: selectedLaunch,
        data: launchesPast,
        toCompare: toCompare,
        setToCompare: setToCompare,
        showCompareModal: showCompareModal,
        setShowCompareModal: setShowCompareModal,
        missionFilter: missionFilter,
        setMissionFilter: setMissionFilter,
        rocketFilter: rocketFilter,
        setRocketFilter: setRocketFilter,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "60vw", mx: "auto", pt: 5 }}>
        <Typography variant="h1" component="div" gutterBottom align="center">
          SpaceX Launches
        </Typography>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={12} style={{ margin: "20 0" }}>
          <Compare active={toCompare.length === 2} />
        </Grid>
        <Grid item xs={12} style={{ margin: 20 }}>
          <Filter />
        </Grid>
      </Grid>
      <TableAndDisplay />
    </stateContext.Provider>
  );
}

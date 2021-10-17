# SpaceX Launches Tracker

This project was created using React, Typescript, Apollo, Graphql. Just run the project using `yarn start` or `npm start` to get started.

## Available Scripts

### `yarn generate --watch`

This will run the code generator to generate the types before hand.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000]

### `yarn test:e2e`

Launches the test runner with a headfull chrome. This also runs the test that was requested in the challenge. The test picks two random launches and then compares them and returns back to the previous screen.

# Personal Notes

If I had more time I would have paid more attention to the styling of the application. I also couldn't get the ships section of the graphql api to work and hence I had to omit it. No matter what I did including the ships section would return a 400 bad request from the spaceX server. I would also have liked to add better filtering, which read the fetched data in advance and generated appropriate filters to choose from rather than just having a text input.
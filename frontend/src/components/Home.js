import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';

const Home = () => {
  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" compact="h2">
            PASSTHEAUX
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              JOIN ROOM
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              CREATE ROOM
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

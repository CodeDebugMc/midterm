import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid2,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  hero: {
    padding: 32,
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginTop: 16,
  },
}));

function Homepage() {
  const classes = useStyles();

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Website
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <div className={classes.hero}>
        <Typography variant="h2" gutterBottom>
          Welcome to My Website
        </Typography>
        <Typography variant="h6" color="textSecondary">
          A modern and responsive design using Material-UI
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
          Get Started
        </Button>
      </div>

      {/* Main Content */}
      <Container>
        <Grid2 container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid2 item xs={12} sm={6} md={4} key={item}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Card Title {item}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    This is a simple card description. Use it to display
                    relevant information.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  );
}

export default Homepage;

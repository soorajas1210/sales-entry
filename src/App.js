import {  Grid } from "@mui/material";
import "./App.css";
import Detail from "./Components/Detail";
import Header from "./Components/Header";
import SalesEntryForm from "./Components/SalesEntryForm";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Header />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Detail />
      </Grid>
      <Grid item xs={12}>
        <SalesEntryForm />
      </Grid>
    </Grid>
  );
}

export default App;

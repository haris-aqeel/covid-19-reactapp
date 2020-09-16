import React from 'react';
import Paper from '@material-ui/core/Paper';




function Stats(props) {
  
  return (
    <div className={props.classes.root} id='Paper'>
    <Paper className={props.classes.Paper} style={{backgroundColor: 'lightblue'}}>
        <h1 className="paper-head">Total Patients</h1>
        <h3>{props.patients}</h3>

      </Paper>
      <Paper className={props.classes.Paper}  style={{backgroundColor: 'red'}}>
        <h1 className="paper-head">Total Deaths</h1>
        <h3>{props.deaths}</h3>
      </Paper>
      <Paper className={props.classes.Paper}  style={{backgroundColor: 'lightgreen'}}>
        <h1 className="paper-head">Total Recovered</h1>
        <h3>{props.recovered}</h3>
      </Paper>
      
    </div>
  );
}

export default Stats;
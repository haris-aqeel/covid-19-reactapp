import React from 'react';
import {Line} from 'react-chartjs-2';



export default function LineChart(props) {

    return (
      <div>
        <h2>Line Example</h2>
        <Line data={props.data}  />
      </div>
    );
  }

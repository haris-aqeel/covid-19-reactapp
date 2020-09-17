import React from 'react';
import {Line} from 'react-chartjs-2';



export default function LineChart(props) {

    return (
      <div>
        <h2> Top 10 Corona Patient Countries </h2>
        <Line data={props.data} height={270} options={{maintainAspectRatio: false}}/>
      </div>
    );
  }

import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export default function Donought(props){

    return (
      <div className='Dougnut'>
        <h2 style={{fontSize:"42px", marginTop:"35px", marginBottom:"25px"}}>Stats</h2>
        <Doughnut data={props.data} className='pic' height={100} options={{maintainAspectRatio: false}}/>
      </div>
    );
    }
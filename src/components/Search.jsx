import React , { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Stats from '../components/Stats';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DonoughtChart from './DonoghtChart'
import LineChart from './Line Chart'

export default function Search() {
  // Material UI Styles
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '45px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },},
    Paper: {
        width: '300px',
        height: '250px'
    }}))

    
    

  const classes = useStyles();
  
  // State Variables using Use State
  const [Modes, setMode]= useState("Global");
  const [country, setCountry]= useState("");
  const [countryarr, setCountryArr] = useState([]);
  const [patient, setPatient] = useState()
  const [death, setDeath] = useState()
  const [recover, setRecovered] = useState()
  const [topTrendCountryName, setTopTrendCountryName] = useState();
  const [topTrendCountryConfirmed,setTopTrendCountryConfirmed] = useState()
  const [topTrendCountryDeaths,setTopTrendCountryDeaths] = useState()
  const [topTrendCountryRecovered,setTopTrendCountryRecovered] = useState()


  useEffect(()=>{
    async function loadData(){
      
        var api = 'https://api.covid19api.com/summary'
        const data = await fetch(api);
        const convertJSON = await data.json();
        setCountryArr(convertJSON.Countries) 
        setTopTrendCountryName(convertJSON.Countries.filter((curr)=>curr.TotalConfirmed>450000).map((current)=>current.Country))        
        setTopTrendCountryConfirmed(convertJSON.Countries.filter((curr)=>curr.TotalConfirmed>450000).map((current)=>current.TotalConfirmed))
        setTopTrendCountryDeaths(convertJSON.Countries.filter((curr)=>curr.TotalConfirmed>450000).map((current)=>current.TotalDeaths))
        setTopTrendCountryRecovered(convertJSON.Countries.filter((curr)=>curr.TotalConfirmed>450000).map((current)=>current.TotalRecovered))
        //Assessing of Global Data
        const {TotalConfirmed, TotalDeaths, TotalRecovered} = convertJSON.Global;
        setPatient(TotalConfirmed);
        setDeath(TotalDeaths);
        setRecovered(TotalRecovered);
        
        
        


        }

    loadData()
  },[])


  const checkInputs = (e) => {
    
    e.preventDefault();
    
    if (Modes === 'Country' & country!==undefined & country.length>1){
        var selectedCountry = countryarr.filter(curr=> curr.Country === (country[0].toUpperCase()+ country.slice(1).toLowerCase()))
        

        if (selectedCountry[0] === undefined){
          alert('Enter A Valid Country Name')
        }else{
          const {TotalConfirmed, TotalDeaths, TotalRecovered} = selectedCountry[0];
          setPatient(TotalConfirmed);
          setDeath(TotalDeaths);
          setRecovered(TotalRecovered);
        }

      }else if(Modes === 'Country'){
        alert('Enter A Country Name')
      }else if (Modes === 'Global' & country.length>1){
        alert('Please Select Country Option From Area')
      }
  }

  const datass = {
    labels: [
      'Deaths',
      'Recovered',
      'Total Patients'
    ],
    datasets: [{
      data: [death,recover,patient],
      backgroundColor: [
      '#8D021F',
      '#00BFFF',
      '#9ACD32'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#00FA9A',
      '#36A2EB'
      ]
    }]
  };
  
  // topTrendCountry.map((current)=>current.Country)
  const datal = {
    labels: topTrendCountryName,
    datasets: [
      {
        label: 'Corona Cases',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: topTrendCountryConfirmed
      },
      {
        label: 'Corona Deaths',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgb(255,0,0)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,0.4)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: topTrendCountryDeaths
      },
      {
        label: 'Corona Recovered',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,255,0,0.4)',
        borderColor: 'rgb(0,255,0)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,255,0,0.4)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: topTrendCountryRecovered
      }

    ]
  };

  return (
    <>
    <div style={{textAlign: 'center', margin: '10px auto'}}>
      
    
      <form onSubmit= {checkInputs}>
        <FormControl variant="outlined" style={{ width: '350px', textAlign: 'center',margin: '10px auto'}}>
          <InputLabel htmlFor="outlined-age-native-simple">Area</InputLabel>
          <Select
            native
            value={Modes}
            onChange={(e)=>{setMode(e.target.value)}}
            label="Area"         
          >
            <option value='Global'>Global</option>
            <option value='Country'>Country</option>
          </Select>
        </FormControl><br />
      

      

        <TextField 
          id="outlined-basic" 
          label="Enter Country Name" 
          variant="outlined"
          value={country} 
          onChange={(e)=>{setCountry(e.target.value)}}
          style={{ width: '350px', textAlign: 'center',margin: '20px auto'}} /><br />

        <Button type="submit" variant="contained" color="primary">Search Stats</Button>

      </form>
      

      
    </div>

    <Stats classes={classes}  patients={patient}  deaths ={death} recovered={recover}/>
    <DonoughtChart data={datass}/>
    <div className="lineChart">
      <LineChart data={datal}/>
    </div>
    
    </>
  );
}

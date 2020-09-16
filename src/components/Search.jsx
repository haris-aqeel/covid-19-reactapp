import React , { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Stats from '../components/Stats';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
  


  useEffect(()=>{
    async function loadData(){
      
        var api = 'https://api.covid19api.com/summary'
        const data = await fetch(api);
        const convertJSON = await data.json();
        setCountryArr(convertJSON.Countries) 
        
        if (Modes === 'Global'){
        //Assessing of Global Data
        const {TotalConfirmed, TotalDeaths, TotalRecovered} = convertJSON.Global;
        setPatient(TotalConfirmed);
        setDeath(TotalDeaths);
        setRecovered(TotalRecovered);}
      }

    loadData()

  },[])


  const checkInputs = (e) => {
    
    e.preventDefault();

    if (Modes === 'Country' & country!==undefined & country.length>1){
        let selectedCountry = countryarr.filter((curr)=>{
        if (curr.Country === (country[0].toUpperCase()+ country.slice(1).toLowerCase())){
            return curr.Country
            }
            
        })

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
    
    </>
  );
}

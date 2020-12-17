import React, { Component } from 'react';
import './main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
  } from '@fortawesome/free-solid-svg-icons';

import {onCitySearch} from './../Redux/weather/weatherAction';

class mainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            city:"",
        }
    }

    onHandleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit=()=>{
        // console.log(this.state);
        const {city} = this.state;
        const obj = { city };
        this.props.onCitySearch(obj);

        }

    render() {
        const{city} = this.state;
        
        // console.log(this.props.weather);
        const weather = this.props.weather;
        console.log("temp",weather);
        let weatherIcon = null;
        let currnt_time = "";
        let sunrise = "";
        let sunset = "";
        if(weather.data_state!="NOT_INITIALIZE"){

            // let time1 = weather.weather.city.timezone
            // let date1 = new Date(time1 * 1000)
            // currnt_time = date1.toString()

            const main = weather.weather.list[0].weather[0].main

            console.log(main)
          

            if (main === 'Thunderstorm') {
                weatherIcon = <FontAwesomeIcon icon={faBolt} />;
            } else if (main === 'Drizzle') {
                weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
            } else if (main === 'Rain') {
                weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
            } else if (main === 'Snow') {
                weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
            } else if (main === 'Clear') {
                weatherIcon = <FontAwesomeIcon icon={faSun} />;
            } else if (main === 'Clouds') {
                weatherIcon = <FontAwesomeIcon icon={faCloud} />;
            } else {
                weatherIcon = <FontAwesomeIcon icon={faSmog} />;
            }
        }

        console.log(weatherIcon)
        
        
        

        // this.setState({load:"true"});
        if(weather.data_state=="NOT_INITIALIZE"){
            return (
                <div className="container center">
                    <h1 className="display-1 text-center text-light">Welcome</h1>
                <div className="col-md-12 col-lg-12 col-11 mx-auto my-auto">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter City" aria-label="Enter CIty" name="city" value={city} onChange={this.onHandleChange}></input>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={this.onSubmit}>Search</button>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
        else if(weather.data_state=="FETCHED_SUCCESS"){
            
        return (
            
            <div>

                <div className="container py-5">
                <div className="col-md-12 col-lg-12 col-12 mx-auto my-auto">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter City" aria-label="Enter CIty" name="city" value={city} onChange={this.onHandleChange}></input>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={this.onSubmit}>Search</button>
                        </div>
                    </div>
                </div>
                </div><br></br>
                <div className="container-fluid">
                    <div className="row"> 
                        <div className="col-md-6">
                            <div className="card city_name_card h-100 h-sm-50">
                                <div className="card-body text-left">
                                    <h1 className="text-dark">{weather.weather.city.name},{weather.weather.city.country}</h1>
                                    {/* <h4 className="text-dark">{weather.weather.list[0].dt_txt.slice(0,11)}</h4> */}
                                    <h4 className="text-dark">{Date(weather.weather.city.timezone).toString().slice(0,16)}</h4>
                                    
                                    <h1 className="text-dark text-sm-center justify-content-center temp"><weatherIcon>{weatherIcon}</weatherIcon> {weather.weather.list[0].main.temp}°</h1>

                                       
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 justify-content-center">
                            <div className="card city_name_card h-100 h-sm-50">
                                <div className="card-body text-left">
                                    <div className="container text-center ">
                                    <div className="container text-center">    
                                    <div className="row">
                                        <div className="col-sm-6 info "><div className="sunrise"><h3>{new Date(weather.weather.city.sunrise * 1000).toString().slice(16,21)}</h3><h7>Sunrise</h7></div></div>
                                        <div className="col-sm-6 infi"><div className="sunrise"><h3>{new Date(weather.weather.city.sunset * 1000).toString().slice(16,21)}</h3><h7>Sunset</h7></div></div>
                                    </div>
                                   
                                    <div className="row">
                                        <div className="col-sm-6 info pt-4"><div className="sunrise"><h3>{weather.weather.city.population}</h3><h7>Population</h7></div></div>
                                        <div className="col-sm-6 info pt-4"><div className="sunrise"><h3>{weather.weather.list[0].wind.speed}mph</h3><h7>Wind Speed</h7></div></div>
                                    </div>
                                    </div>
                                    </div>

                                       
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    
                </div>

                <div className="container-fluid my-4 ml-0 scrolling-wrapper">
                <h2 className="display-4 text-left text-light">Forecast </h2>   
                    <div className="row mt-4 text-center ">
                        {weather.weather.list.map((el,index)=>(

                            <div className="col-md-2 m-2 h-30 p-4 forecast ">
                                <h3>{new Date(el.dt*1000).toString().slice(16,21)}</h3>
                                {(el.weather[0].main=='Thunderstorm')?<h3><FontAwesomeIcon icon={faBolt} /></h3>:
                                el.weather[0].main==='Drizzle'?<h3><FontAwesomeIcon icon={faCloudRain} /></h3>:
                                el.weather[0].main==='Rain'?<h3><FontAwesomeIcon icon={faCloudShowersHeavy} /></h3>:
                                el.weather[0].main==='Snow'?<h3><FontAwesomeIcon icon={faSnowflake} /></h3>:
                                el.weather[0].main==='Clear'?<h3><FontAwesomeIcon icon={faSun} /></h3>:
                                el.weather[0].main==='Clouds'?<h3><FontAwesomeIcon icon={faCloud} /></h3>:
                                <h3><FontAwesomeIcon icon={faSmog} /></h3>}
                                
                                <h5>{el.weather[0].main}</h5>
                                <h3>{el.main.temp}°</h3>

                            
                            </div>
                        ))}

                    </div>
                </div>
                
                
            </div>
        )
    }else{
        return(
        <h1>No Data Found , Please Add First</h1>
        )
    }
    }
}


const mapStateToProps=state=>({
    weather:state.weather,
});

export default connect(mapStateToProps,{onCitySearch})(withRouter(mainPage));
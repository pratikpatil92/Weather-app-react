import axios from 'axios';

export const onCitySearch=(city)=>{
    const API_key = "e91bf288268fd072c3bbe40c98831950";
    const city_name = city.city;
    console.log(city_name)
    return(dispatch)=>{
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&cnt=15&appid=${API_key}&units=metric`)
        .then(
            res=>{
                if(res.status==200){
                    // console.log(res.data);
                    dispatch(onSearchSuccess(res.data))
                }else{
                    // console(res)
                    dispatch(onSearchFailure(res.data.message))
                }
            }
        )
        .catch(err=>{
            console.log(err);
            dispatch(onSearchFailure(err.message))
        })
    }
}

export const onSearchSuccess = (data)=>{
    // console.log("success",data)
    return{
        type:"ON_SEARCH_SUCCESS",
        payload:data,
    }
}

export const onSearchFailure = (msg)=>{
    return{
        type:"ON_SEARCH_FAILURE",
        payload:"Enter Wrong CIty",
    }
}
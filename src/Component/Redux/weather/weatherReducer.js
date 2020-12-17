const initialState = {
    weather:{},
    error_msg:"",
    data_state:"NOT_INITIALIZE",
}

const weatherReducer = (state=initialState, action)=>{
    switch(action.type){
        case "ON_SEARCH_SUCCESS":
            return{
                ...state,
                weather:action.payload,
                data_state:"FETCHED_SUCCESS",

            }
        case "ON_SEARCH_FAILURE":
            return{
                ...state,
                error_msg:action.payload,
                data_state:"NOT_INITIALIZE"

            }    
            


        default:
            return{
                ...state,
            }
    }

}

export default weatherReducer;
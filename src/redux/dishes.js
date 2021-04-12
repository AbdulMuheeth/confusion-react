import * as ActionTypes from './ActionTypes';

//Reducer Function 

export const Dishes = (state = {
        isLoading:true,
        errMess:null,
        dishes:[]
    } , action) => {
    
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state,isLoading:false,errMess:null,dishes: action.payload}
        case ActionTypes.DISHES_LOADING:
            //returning the mutable object i.e, not changing the current state
            return {...state,isLoading:true,errMess:null,dishes:[]}
        
        case ActionTypes.DIHSES_FAILED:
            return {...state,isLoading:false,errMess:action.payload,dishes:[]}
        default:
            return state;
    }
}
import {createStore,combineReducers,applyMiddleware } from 'redux';
import {createForms} from 'react-redux-form';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialFeedback} from './Form';

export const ConfigureStore = () =>{
    
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            promotions:Promotions,
            leaders:Leaders,
            ...createForms({
                feedback:InitialFeedback
            })
            // Here react-redux-form adds the neccesary reducers,actions for the forms

        }),
        applyMiddleware(thunk,logger)
    )

    return store;
}
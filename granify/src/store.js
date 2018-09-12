import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
//import reducers
import {reducer} from './redux/reducer'


export const store = createStore(reducer, 
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f   
    )
)


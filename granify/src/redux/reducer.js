import { combineReducers } from 'redux'
import { item } from './item.redux'
import { record } from './record.redux'


export const reducer = combineReducers({ item, record })
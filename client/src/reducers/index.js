import changeTheNumber from './upDown'
import userReducer from './currentUser';

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    changeTheNumber,
    userReducer
})

export default rootReducer;
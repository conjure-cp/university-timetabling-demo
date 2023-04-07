import { combineReducers } from 'redux';

import inputHandler from './inputHandler';

export default combineReducers({
    data: inputHandler
});
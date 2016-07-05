import { combineReducers } from 'redux';

// Reducers
import ticketReducer from './ticket-reducer';
import searchLayoutReducer from './search-layout-reducer';

// Combine Reducers
var reducers = combineReducers({
    ticketState: ticketReducer,
    searchLayoutState: searchLayoutReducer
});

export default reducers;

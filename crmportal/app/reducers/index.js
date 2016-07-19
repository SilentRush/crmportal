import { combineReducers } from 'redux';

// Reducers
import ticketReducer from './ticket-reducer';
import accountReducer from './account-reducer';
import searchLayoutReducer from './search-layout-reducer';

// Combine Reducers
var reducers = combineReducers({
    ticketState: ticketReducer,
    accountState: accountReducer,
    searchLayoutState: searchLayoutReducer
});

export default reducers;

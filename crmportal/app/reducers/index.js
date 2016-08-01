import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import ticketReducer from './ticket-reducer';
import accountReducer from './account-reducer';
import commentReducer from './comment-reducer';
import searchLayoutReducer from './search-layout-reducer';

// Combine Reducers
var reducers = combineReducers({
    ticketState: ticketReducer,
    accountState: accountReducer,
    searchLayoutState: searchLayoutReducer,
    commentState: commentReducer,
    userState: userReducer
});

export default reducers;

import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import ticketReducer from './ticket-reducer';
import accountReducer from './account-reducer';
import contactReducer from './contact-reducer';
import commentReducer from './comment-reducer';
import blogReducer from './blog-reducer';
import historyReducer from './history-reducer';
import searchLayoutReducer from './search-layout-reducer';

// Combine Reducers
var reducers = combineReducers({
    ticketState: ticketReducer,
    accountState: accountReducer,
    contactState: contactReducer,
    searchLayoutState: searchLayoutReducer,
    commentState: commentReducer,
    userState: userReducer,
    blogState: blogReducer,
    historyState: historyReducer
});

export default reducers;

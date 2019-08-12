import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from "./auth/authReducer";
import errors from "./auth/errorReducer";
// import authUser from './auth';
//import todoApp from './todo/reducer';
//import chatApp from './chat/reducer';
//import surveyListApp from './surveyList/reducer';
//import surveyDetailApp from './surveyDetail/reducer';

export default combineReducers({
  menu,
  settings,
  authUser,
  errors
  //todoApp,
  //chatApp,
  //surveyListApp,
  //surveyDetailApp
});

// export default reducers;

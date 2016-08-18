import React from "react";
export function ErrorBox(errorMessages) {
  var errorBox;
  if(errorMessages.length > 0){
    var errMessages = " " + errorMessages.join("\n");
    errorBox =  <div className="alert alert-danger errorBox" role="alert">
      <span className="glyphicon glyphicon-exclamation-sign"></span>
      <span className="errorBoxText">
        {errMessages}
      </span>
    </div>
  }
  else {
    errorBox = "";
  }
  return (
    <span>
      {errorBox}
    </span>
  );
}

export function addError(state,error,obj){
  let nextState = Object.assign({},state);
  let errArr;
  if(nextState.errors)
    errArr = nextState.errors;
  else
    nextState.errors = {};
  if(!errArr[obj])
    errArr[obj] = [];
  if(errArr[obj].indexOf(error) == -1){
    errArr[obj].push(error);
    nextState.errors = errArr;
  }
  return nextState;
}

export function removeError(state,error,obj){
  if(!state.errors)
    state.errors = {};
  let errArr = state.errors;
  if(errArr[obj] && errArr[obj].indexOf(error) != -1){
    errArr[obj].splice(errArr[obj].indexOf(error),1);
    if(errArr[obj].length == 0)
      delete errArr[obj];
    state.errors = errArr;
  }
  return state;
}

export function ChangeValue(obj,path,value) {
  var p;
  for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
    if(i != len - 1){
      if(obj[path[i]] === undefined){
        alert(path[i] + " is not a valid path.");
        return undefined;
      }
      else
        obj = obj[path[i]];
    }
    else
      p = path[i];
  };
  if(obj[p] === undefined){
    alert(p + " is not a valid path.");
    return undefined;
  }
  else
    obj[p] = value;
  return obj;
}

document.oncontextmenu = function(){ return false; };
document.oncontextmenu= new Function("event.returnValue=false");
document.onkeydown = function () {
  if (window.event && window.event.keyCode == 123) {
      event.keyCode = 0;
      event.returnValue = true;
      return true;
  }
};
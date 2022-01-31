console.log("pippo");

var lol = false;
//scrivere qui buy/crack;
function buy() {
  var x = document.getElementById("bought");
  var y = document.getElementById("board");
  if(lol === false){
    x.style.display = "block";
    y.style.display = "block";
    lol = true;
  }
}
function steal() {
  var x = document.getElementById("stolen");
  var y = document.getElementById("board");
  if(lol === false){
    x.style.display = "block";
    y.style.display = "block";
    lol = true;
  }
}

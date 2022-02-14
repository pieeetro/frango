var lol = false;


function buy() {
  var x = document.getElementById("bought");
  var y = document.getElementById("board");
  if(lol === false){
    x.style.display = "block";
    y.style.display = "block";
    x.scrollIntoView()
    lol = true;
  }
}
function steal() {
  var x = document.getElementById("stolen");
  var y = document.getElementById("board");
  if(lol === false){
    x.style.display = "block";
    y.style.display = "block";
    x.scrollIntoView()
    lol = true;
  }
}

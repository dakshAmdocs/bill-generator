var coll = document.getElementsByClassName("collapsible");
var i;
var form1 = {},  form2 = {};

var normalNumbers = ["9214218632", "8912102382", "8187248736", "7123218321", "9129863871"];
var vipNumbers = ["1111111111", "2222222222", "3333333333", "1000000000", "0000000001"];
var vipNumebrsPrice = [5000, 100000, 5000, 10000, 40000, 70000];

toggleColapsible("col1");
// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }

function toggleColapsible(id){
  document.getElementById(id).classList.toggle("active");
    var content = document.getElementById(id).nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
}

function checkForm1(){
  return (form1['Fname']!=null && form1['Lname']!=null && form1["aadhar"]!=null)
}

function continue1(){
  console.log(form1);
  if(validateName('Fname') && validateAadhar() && validateName('Lname') && checkForm1()){

    toggleColapsible("col1");
    toggleColapsible("col2");
  }
}

function checkForm2(){

  var menu = document.getElementById("select_menu");
  console.log(menu.value)
  if(menu.value=="Select your Number"){
    document.getElementById("message3").innerHTML = "**Please select a number";
    console.log("no number selected");
    menu.parentNode.parentNode.parentNode.style.maxHeight = menu.parentNode.parentNode.parentNode.scrollHeight + "px";
    return false;
  }
  return true;
}

function continue2(){

  if(checkForm2()){
    document.getElementById("fullNameFinal").innerHTML = form1["Fname"] +" "+ form1["Lname"];
    document.getElementById("aadharNumberFinal").innerHTML = "XXXXXXXX" + (form1["aadhar"]).substr(-4);
    document.getElementById("priceFinal").innerHTML = form2["price"];

    toggleColapsible("col2");
    toggleColapsible("col3");
  }
}

function back1(){
  toggleColapsible("col2");
  toggleColapsible("col1");
}

function back2(){
  toggleColapsible("col3");
  toggleColapsible("col2");
}

function submit(){

  toggleColapsible("col3");
  document.getElementById("final_message").innerHTML = "Thank you for purchasing your number with us!"
}

function selectNumbers(){
    var menu = document.getElementById("select_menu");

    menu.innerHTML = "";
    option = document.createElement("option");
    option.value = "Select your Number";
    option.text = "Select your Number";

    menu.appendChild(option);

    var array = (document.getElementById("vip").checked) ? vipNumbers : normalNumbers;

    for(var i = 0; i<array.length; i++){

      var option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      menu.appendChild(option);
    }

    priceSpan = document.getElementById("price");
    priceSpan.innerHTML = "";

    document.getElementById("message3").innerHTML = "";
    menu.parentNode.parentNode.parentNode.style.maxHeight = menu.parentNode.parentNode.parentNode.scrollHeight + "px";
}

function selectPrice(){
  var price = 0;
  var menu = document.getElementById("select_menu");

  if(document.getElementById("vip").checked){
    console.log(menu.value)
    console.log(vipNumbers.indexOf(menu.value))
    if(menu.value){
      price = vipNumebrsPrice[vipNumbers.indexOf(menu.value)];
    }
    form2["number"] = menu.value;
  }

  document.getElementById("message3").innerHTML = "";
  menu.parentNode.parentNode.parentNode.style.maxHeight = menu.parentNode.parentNode.parentNode.scrollHeight + "px";

  priceSpan = document.getElementById("price");
  priceSpan.innerHTML = price;
  form2["price"] = price;
}

function validateName(id) {

  var fnameDoc = document.getElementById(id)
  var fname = fnameDoc.value;

  console.log(fname);
  const regex = /^[A-Za-z]+$/;

  if(regex.test(fname)){
      document.getElementById("message1").innerHTML = "";
      console.log("correct format for name");
      fnameDoc.parentNode.style.maxHeight = fnameDoc.parentNode.scrollHeight + "px";

      form1[id] = fname;
      return true;
  }
  else if(fname == ""){
    document.getElementById("message1").innerHTML = "**Please enter a name";
    console.log("*Please enter a name");
    fnameDoc.parentNode.parentNode.parentNode.style.maxHeight = fnameDoc.parentNode.parentNode.parentNode.scrollHeight + "px";
    return false;
  }
  else {
    document.getElementById("message1").innerHTML = "**Name cannot contain numbers";
    console.log("Name cannot contain numbers");
    fnameDoc.parentNode.parentNode.parentNode.style.maxHeight = fnameDoc.parentNode.parentNode.parentNode.scrollHeight + "px";
    return false;
  }
}

function countDigits(){

  var numDoc = document.getElementById("aadhar")
  var num = numDoc.value;

  document.getElementById("aadhar_digits").innerHTML = "digits: " + num.toString().length;
}

//e-sign canvas

 

/////////////////////////////////////////

var square = document.getElementById("drawPlace");

var paper = square.getContext("2d");

var pressedMouse = false;

var x;

var y;

var colorLine ="blue";

var key = {C: 67};

 

document.addEventListener("mousedown", startDrawing);
document.addEventListener("mousemove", drawLine);
document.addEventListener("mouseup", stopDrawing);
document.addEventListener("keydown", clearCanvas);


function startDrawing(eventvs01){
  pressedMouse = true;
  x = eventvs01.offsetX;
  y = eventvs01.offsetY;
}

 
function drawLine(eventvs02) {
  if (pressedMouse) {
    document.getElementById("drawPlace").style.cursor = "crosshair";
    var xM = eventvs02.offsetX;
    var yM = eventvs02.offsetY;
    drawing_line(colorLine, x, y, xM, yM, paper);
    x = xM;
    y = yM;
  }
}

function stopDrawing(eventvs03) {
  pressedMouse = false;
  document.getElementById("drawPlace").style.cursor = "default";
}

 

function clearCanvas(whenPressKey) {
  if (whenPressKey.keyCode == key.C) {
    paper.clearRect(0, 0, square.width, square.height);
  }
}
 
drawing_line("#FF6347", x-1, y, x, y, paper);
 
function drawing_line(color, x_start, y_start, x_end, y_end, board){
  board.beginPath();
  board.strokeStyle = color;
  board.lineWidth = 2;
  board.moveTo(x_start,y_start);
  board.lineTo(x_end,y_end);
  board.stroke();
  board.closePath();
}

function validateAadhar(){

  var numDoc = document.getElementById("aadhar")
  var num = numDoc.value;

  var regex = /^\d{12}$/

  if(regex.test(num)){
    document.getElementById("message2").innerHTML = "";
    console.log("correct format for name");
    numDoc.parentNode.style.maxHeight = numDoc.parentNode.scrollHeight + "px";
    form1["aadhar"] = num;
    return true;
  }else if(num==""){
    document.getElementById("message2").innerHTML = "**Please enter your Aadhar Number";
    console.log("Please enter your Aadhar Number");
    numDoc.parentNode.parentNode.parentNode.style.maxHeight = numDoc.parentNode.parentNode.parentNode.scrollHeight + "px";
    return false;
  }
  else {
    document.getElementById("message2").innerHTML = "**Aadhar card number must have exactly 12 digits";
    console.log("number must have exactly 12 digits");
    numDoc.parentNode.parentNode.parentNode.style.maxHeight = numDoc.parentNode.parentNode.parentNode.scrollHeight + "px";
    return false;
  }
}
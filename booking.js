// ================= BOOKING =================

const continueBtn = document.getElementById("continueBtn");

if (continueBtn) {

continueBtn.addEventListener("click", () => {

const from = document.getElementById("from").value;
const to = document.getElementById("to").value;
const pickup = document.getElementById("pickup").value;
const drop = document.getElementById("drop").value;
const date = document.getElementById("date").value;
const passengers = document.getElementById("passengers").value;
const vehicle = document.getElementById("vehicle").value;

// Empty Validation

if (
from === "" ||
to === "" ||
pickup === "" ||
drop === "" ||
date === "" ||
passengers === "" ||
vehicle === ""
){

alert("Please fill all details.");
return;

}

// From == To

if(from === to){

alert("From and To cannot be same.");
return;

}

// Past Date Validation

const today = new Date().toISOString().split("T")[0];

if(date < today){

alert("Please select today's or future date.");
return;

}

// Save Data

localStorage.setItem("from", from);
localStorage.setItem("to", to);
localStorage.setItem("pickup", pickup);
localStorage.setItem("drop", drop);
localStorage.setItem("date", date);
localStorage.setItem("passengers", passengers);
localStorage.setItem("vehicle", vehicle);

// Go Seat Page

window.location.href="seat.html";

});

}
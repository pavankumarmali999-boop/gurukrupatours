import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {

  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", function () {

    const from = document.querySelectorAll("input")[0].value;
    const to = document.querySelectorAll("input")[1].value;
    const date = document.querySelector("input[type='date']").value;
    const passengers = document.querySelector("select").value;

    if (from === "" || to === "" || date === "" || passengers === "Select Passengers") {
      alert("Please fill all details.");
      return;
    }

    alert(
      "GURUKRUPA TOURS\n\n" +
      "From: " + from +
      "\nTo: " + to +
      "\nDate: " + date +
      "\nPassengers: " + passengers +
      "\n\nSearch feature will be connected soon."
    );

  });

});
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      window.location.href = "booking.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Successful!");
      window.location.href = "login.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
const continueBtn = document.getElementById("continueBtn");

if (continueBtn) {
    continueBtn.addEventListener("click", function () {
        alert("Next step: Seat Selection");
        // बाद में इसे seat.html पर भेजेंगे
        // window.location.href = "seat.html";
    });
}
const seats = document.querySelectorAll(".seat");

seats.forEach((seat)=>{
    seat.addEventListener("click",function(){
        document.querySelectorAll(".seat").forEach(s=>s.classList.remove("selected"));
        this.classList.add("selected");
    });
});

const bookSeatBtn = document.getElementById("bookSeatBtn");

if(bookSeatBtn){
    bookSeatBtn.addEventListener("click",function(){
        alert("Seat Selected Successfully!");
        // आगे passenger.html पर भेजेंगे
        // window.location.href="passenger.html";
    });
}
const paymentBtn = document.getElementById("paymentBtn");

if (paymentBtn) {
    paymentBtn.addEventListener("click", function () {
        alert("Passenger details saved!");
        // बाद में Payment Page पर भेजेंगे
        // window.location.href = "payment.html";
    });
}
const payBtn = document.getElementById("payBtn");

if (payBtn) {
    payBtn.addEventListener("click", function () {
        alert("Payment feature will be connected with Razorpay.");
        // बाद में:
        // window.location.href = "ticket.html";
    });
}
if (window.location.pathname.includes("payment.html")) {
    const payBtn = document.getElementById("payBtn");

    if (payBtn) {
        payBtn.addEventListener("click", function () {
            // बाद में Razorpay जोड़ेंगे
            window.location.href = "ticket.html";
        });
    }
}
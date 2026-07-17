// ================= PAYMENT SUMMARY
=================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const from = localStorage.getItem("from");
const to = localStorage.getItem("to");
const date = localStorage.getItem("date");
const vehicle = localStorage.getItem("vehicle");
const passengers = localStorage.getItem("passengers");
const seats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
const fare = localStorage.getItem("totalFare") || 0;

document.getElementById("route").innerText = from + " → " + to;
document.getElementById("journeyDate").innerText = date;
document.getElementById("vehicle").innerText = vehicle;
document.getElementById("seatNumbers").innerText = seats.join(", ");
document.getElementById("passengerCount").innerText = passengers;
document.getElementById("fare").innerText = fare;


// ================= PAYMENT =================

const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", () => {

    const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
    );

  if (paymentMethod.value === "Cash") {

    const booking = {
        from,
        to,
        date,
        vehicle,
        seats,
        passengers: JSON.parse(localStorage.getItem("passengerDetails")),
        totalFare: fare,
        payment: "Cash",
        createdAt: serverTimestamp()
    };

    addDoc(collection(db, "bookings"), booking)
        .then(() => {
            alert("Booking Confirmed!");
            window.location.href = "ticket.html";
        })
        .catch((error) => {
            alert(error.message);
        });

}

    } else {

        alert("Online Payment Integration (Razorpay) Coming Next.");
        // Razorpay code yaha add hoga

    }

});
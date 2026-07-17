// ================= SEAT SELECTION =================

import { db } from "./firebase.js";

import {
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const seats = document.querySelectorAll(".seat");
const passengerCount = parseInt(localStorage.getItem("passengers")) || 1;

document.getElementById("passengerCount").innerText = passengerCount;

let selectedSeats = [];

seats.forEach((seat) => {

    seat.addEventListener("click", () => {

        const seatNo = seat.dataset.seat;

        // Deselect
        if (selectedSeats.includes(seatNo)) {

            selectedSeats = selectedSeats.filter(s => s !== seatNo);
            seat.classList.remove("selected");

        }

        // Select
        else {

            if (selectedSeats.length >= passengerCount) {
                alert("You can select only " + passengerCount + " seat(s).");
                return;
            }

            selectedSeats.push(seatNo);
            seat.classList.add("selected");

        }

        document.getElementById("selectedSeats").innerText =
            selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";

    });

});


// ================= CONTINUE =================

const bookSeatBtn = document.getElementById("bookSeatBtn");

bookSeatBtn.addEventListener("click", () => {

    if (selectedSeats.length !== passengerCount) {

        alert("Please select " + passengerCount + " seat(s).");
        return;

    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    window.location.href = "passenger.html";

});

// ================= LIVE SEAT AVAILABILITY =================

const bookingsRef = collection(db, "bookings");

const q = query(
    bookingsRef,
    where("date", "==", localStorage.getItem("date")),
    where("from", "==", localStorage.getItem("from")),
    where("to", "==", localStorage.getItem("to")),
    where("vehicle", "==", localStorage.getItem("vehicle"))
);

onSnapshot(q, (snapshot) => {

    // Pehle sab seats available karo
    document.querySelectorAll(".seat").forEach((seat) => {
        seat.classList.remove("booked");
        seat.disabled = false;
    });

    // Firestore se booked seats lao
    snapshot.forEach((doc) => {

        const booking = doc.data();

        booking.seats.forEach((seatNo) => {

            const seat = document.querySelector(
                `[data-seat="${seatNo}"]`
            );

            if (seat) {

                seat.classList.add("booked");
                seat.disabled = true;

            }

        });

    });

});
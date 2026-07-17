import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const bookingHistory =
document.getElementById("bookingHistory");

async function loadBookings(){

const snapshot =
await getDocs(collection(db,"bookings"));

let html="";

snapshot.forEach(doc=>{

const booking=doc.data();

html+=`

<div class="card shadow p-3 mb-3">

<h5>${booking.from} → ${booking.to}</h5>

<p><b>Date :</b> ${booking.date}</p>

<p><b>Vehicle :</b> ${booking.vehicle}</p>

<p><b>Seats :</b> ${booking.seats.join(", ")}</p>

<p><b>Total :</b> ₹${booking.totalFare}</p>

<p><b>Payment :</b> ${booking.payment}</p>

</div>

`;

});

if(html===""){
html="<h4 class='text-center'>No Bookings Found</h4>";
}

bookingHistory.innerHTML=html;

}

loadBookings();
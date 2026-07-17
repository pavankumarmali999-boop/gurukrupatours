// ================= BOOKING ID =================

const bookingId = "GT" + Date.now().toString().slice(-8);

// ================= GET DATA =================

const from = localStorage.getItem("from") || "";
const to = localStorage.getItem("to") || "";
const date = localStorage.getItem("date") || "";
const vehicle = localStorage.getItem("vehicle") || "";
const fare = localStorage.getItem("totalFare") || "0";
const paymentMethod = localStorage.getItem("paymentMethod") || "Cash";

const seats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
const passengers = JSON.parse(localStorage.getItem("passengerDetails")) || [];

// ================= SHOW DATA =================

document.getElementById("bookingId").innerText = bookingId;
document.getElementById("route").innerText = from + " → " + to;
document.getElementById("journeyDate").innerText = date;
document.getElementById("vehicle").innerText = vehicle;
document.getElementById("seatNumbers").innerText = seats.join(", ");
document.getElementById("fare").innerText = fare;
document.getElementById("paymentMethod").innerText = paymentMethod;

// ================= PASSENGER LIST =================

let passengerHTML = "";

passengers.forEach((p, index) => {

    passengerHTML += `
    <div>
        ${index + 1}. ${p.name}
        (${p.age} Years)
        - Seat ${seats[index]}
    </div>
    `;

});

document.getElementById("passengerList").innerHTML = passengerHTML;

// ================= HOME BUTTON =================

document.getElementById("homeBtn").addEventListener("click", () => {

    localStorage.removeItem("from");
    localStorage.removeItem("to");
    localStorage.removeItem("pickup");
    localStorage.removeItem("drop");
    localStorage.removeItem("date");
    localStorage.removeItem("vehicle");
    localStorage.removeItem("passengers");
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("passengerDetails");
    localStorage.removeItem("totalFare");
    localStorage.removeItem("paymentMethod");

    window.location.href = "index.html";

});

// ================= DOWNLOAD PDF =================

const downloadPdfBtn = document.getElementById("downloadPdfBtn");

if (downloadPdfBtn) {

    downloadPdfBtn.addEventListener("click", () => {

        const element = document.getElementById("ticketCard");

        const options = {
            margin: 0.5,
            filename: "GURUKRUPA_Ticket.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "portrait"
            }
        };

        html2pdf().set(options).from(element).save();

    });

}

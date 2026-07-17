import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const submitReview = document.getElementById("submitReview");
const reviewsList = document.getElementById("reviewsList");

// ================= SUBMIT REVIEW =================

submitReview.addEventListener("click", async () => {

    const customerName = document.getElementById("customerName").value.trim();
    const rating = document.getElementById("rating").value;
    const review = document.getElementById("review").value.trim();

    if (customerName === "" || rating === "" || review === "") {
        alert("Please fill all fields.");
        return;
    }

    try {

        await addDoc(collection(db, "reviews"), {
            customerName,
            rating,
            review,
            createdAt: serverTimestamp()
        });

        alert("Thank you for your review!");

        document.getElementById("customerName").value = "";
        document.getElementById("rating").value = "";
        document.getElementById("review").value = "";

        loadReviews();

    } catch (error) {

        alert(error.message);

    }

});

// ================= LOAD REVIEWS =================

async function loadReviews() {

    reviewsList.innerHTML = "";

    const q = query(
        collection(db, "reviews"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {

        const data = doc.data();

        reviewsList.innerHTML += `

        <div class="card shadow p-3 mb-3">

            <h5>${data.customerName}</h5>

            <p>⭐ Rating : ${data.rating}/5</p>

            <p>${data.review}</p>

        </div>

        `;

    });

}

loadReviews();
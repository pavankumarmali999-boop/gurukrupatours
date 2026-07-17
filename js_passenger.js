// ================= PASSENGER DETAILS =================

const passengerCount = parseInt(localStorage.getItem("passengers")) || 1;

const passengerForms = document.getElementById("passengerForms");

const totalFare = document.getElementById("totalFare");

let total = 0;

// Dynamic Forms

for(let i=1;i<=passengerCount;i++){

passengerForms.innerHTML += `

<div class="card p-3 mb-3">

<h5>Passenger ${i}</h5>

<input
type="text"
class="form-control mb-2 pname"
placeholder="Full Name">

<input
type="number"
class="form-control mb-2 age"
placeholder="Age">

<select class="form-select mb-2 gender">

<option value="">Select Gender</option>

<option>Male</option>

<option>Female</option>

<option>Other</option>

</select>

<input
type="tel"
class="form-control mb-2 mobile"
maxlength="10"
placeholder="Mobile Number">

<input
type="text"
class="form-control mb-2 aadhaar"
maxlength="12"
placeholder="Aadhaar Number">

</div>

`;

}

// Fare Calculation

document.querySelectorAll(".age").forEach(age=>{

age.addEventListener("input",calculateFare);

});

function calculateFare(){

total=0;

document.querySelectorAll(".age").forEach(age=>{

const value=parseInt(age.value);

if(isNaN(value)) return;

if(value<=5){

total+=150;

}

else if(value<=12){

total+=300;

}

else{

total+=600;

}

});

totalFare.innerText=total;

}
// ================= VALIDATION & CONTINUE =================

const paymentBtn = document.getElementById("paymentBtn");

paymentBtn.addEventListener("click", () => {

    const names = document.querySelectorAll(".pname");
    const ages = document.querySelectorAll(".age");
    const genders = document.querySelectorAll(".gender");
    const mobiles = document.querySelectorAll(".mobile");
    const aadhaars = document.querySelectorAll(".aadhaar");

    let passengers = [];

    for (let i = 0; i < passengerCount; i++) {

        const name = names[i].value.trim();
        const age = ages[i].value.trim();
        const gender = genders[i].value;
        const mobile = mobiles[i].value.trim();
        const aadhaar = aadhaars[i].value.trim();

        // Empty Validation
        if (
            name === "" ||
            age === "" ||
            gender === "" ||
            mobile === "" ||
            aadhaar === ""
        ) {
            alert("Please fill all passenger details.");
            return;
        }

        // Mobile Validation
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        // Aadhaar Format Validation (12 digits)
        if (!/^\d{12}$/.test(aadhaar)) {
            alert("Enter a valid 12-digit Aadhaar number.");
            return;
        }

        passengers.push({
            name,
            age: Number(age),
            gender,
            mobile,
            aadhaar
        });
    }

    // Save Data
    localStorage.setItem("passengerDetails", JSON.stringify(passengers));
    localStorage.setItem("totalFare", total);

    // Go to Payment
    window.location.href = "payment.html";

});
import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ================= REGISTER =================

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {

  registerBtn.addEventListener("click", async () => {

    const fullname = document.getElementById("fullname").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (
      fullname === "" ||
      mobile === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (mobile.length !== 10) {
      alert("Enter valid mobile number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      await createUserWithEmailAndPassword(auth, email, password);

      alert("Registration Successful!");

      window.location.href = "login.html";

    } catch (error) {

      alert(error.message);

    }

  });

}


// ================= LOGIN =================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    if (email === "" || password === "") {

      alert("Please enter Email and Password.");

      return;

    }

    try {

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");

      window.location.href = "booking.html";

    } catch (error) {

      alert(error.message);

    }

  });

}


// ================= FORGOT PASSWORD =================

const forgotBtn = document.getElementById("forgotBtn");

if (forgotBtn) {

  forgotBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();

    if (email === "") {

      alert("Enter your email first.");

      return;

    }

    try {

      await sendPasswordResetEmail(auth, email);

      alert("Password reset email sent.");

    } catch (error) {

      alert(error.message);

    }

  });

}
// ================= OTP LOGIN =================

const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "normal"
});

let confirmationResult;

const sendOtpBtn = document.getElementById("sendOtpBtn");

if (sendOtpBtn) {

    sendOtpBtn.addEventListener("click", async () => {

        const phoneNumber = document.getElementById("phoneNumber").value.trim();

        if (phoneNumber === "") {
            alert("Enter Mobile Number");
            return;
        }

        try {

            confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                recaptchaVerifier
            );

            alert("OTP Sent Successfully");

        } catch (error) {

            alert(error.message);

        }

    });

}

const verifyOtpBtn = document.getElementById("verifyOtpBtn");

if (verifyOtpBtn) {

    verifyOtpBtn.addEventListener("click", async () => {

        const otp = document.getElementById("otpCode").value.trim();

        if (otp === "") {
            alert("Enter OTP");
            return;
        }

        try {

            await confirmationResult.confirm(otp);

            alert("Login Successful");

            window.location.href = "booking.html";

        } catch (error) {

            alert("Invalid OTP");

        }

    });

}
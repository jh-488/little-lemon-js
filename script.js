/* Handle Navbar */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const icon = hamburger.querySelector("i");

hamburger.addEventListener("click", () => {
  icon.classList.toggle("fa-times");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    icon.classList.remove("fa-times");
    navMenu.classList.remove("active");
  })
);

/* Handle Reservation Form validation */

const reservationsSection = document.getElementById("reservations");
const form = document.querySelector("form");
const nameInput = document.querySelector("input[name='name']");
const dateInput = document.querySelector("input[name='date']");
const timeInput = document.querySelector("select[name='time']");
const guestsInput = document.querySelector("input[name='guests']");
const booking = document.querySelector(".booking");
const confirmed = document.querySelector(".confirmed");

// Validation process for each input
nameInput.isValid = () => !!nameInput.value;
dateInput.isValid = () => isValidDate(dateInput.value);
timeInput.isValid = () => !!timeInput.value;
guestsInput.isValid = () => isValidGuestsNumber(guestsInput.value);

// Date must be at least today
const isValidDate = (date) => {
  const minDate = new Date().toISOString().split("T")[0];
  return date >= minDate;
};

const isValidGuestsNumber = (guestsNumber) => {
  return guestsNumber >= 1 && guestsNumber <= 10;
};

const inputFields = [nameInput, dateInput, timeInput, guestsInput];

// Check if the fields are valid only after submitting the form
let shoudValidate = false;

let isFormValid = false;

const validateInputs = () => {
  if (!shoudValidate) return;

  isFormValid = true;

  inputFields.forEach((input) => {
    input.classList.remove("invalid");
    input.nextElementSibling.classList.add("hidden");

    if (!input.isValid()) {
      input.classList.add("invalid");
      input.nextElementSibling.classList.remove("hidden");
      isFormValid = false;
    }
  });
};

// Confirmation data
const chosenName = document.querySelector(".name-confirmed");
const chosenDate = document.querySelector(".date-confirmed");
const chosenTime = document.querySelector(".time-confirmed");
const chosenGuestsNumber = document.querySelector(".guests-confirmed");
const backHomeButton = document.querySelector(".back-to-home");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  shoudValidate = true;
  validateInputs();

  // Display confirmation after form is submitted
  if (isFormValid) {
    booking.classList.add("hide");

    // Add chosen time and date to confirmation
    chosenName.innerHTML = nameInput.value;
    chosenDate.innerHTML = dateInput.value;
    chosenTime.innerHTML = timeInput.value;
    chosenGuestsNumber.innerHTML = guestsInput.value;

    form.reset();

    confirmed.classList.remove("hide");
  }
});

// Take off then error message while adding input
inputFields.forEach((input) => input.addEventListener("input", validateInputs));


// Go back to the form section
backHomeButton.addEventListener("click", () => {
  shoudValidate = false;
  confirmed.classList.add("hide");
  booking.classList.remove("hide");
})

/* SwiperJS configuration */

const swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1200: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    }
  }
});


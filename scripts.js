console.log('Init scripts.js');

// DOM Elements
const nameInputContainer = document.getElementById('name-input-container');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const nameIcon = document.getElementById('name-icon');
const nameSuccess = document.getElementById('name-success');
const nameError = document.getElementById('name-error');

const emailContainer = document.getElementById('email-container')
const emailInput = document.getElementById('email-input');
const emailIcon = document.getElementById('email-icon');
const emailSuccess = document.getElementById('email-success');
const emailError = document.getElementById('email-error');

const numberContainer = document.getElementById('number-container');
const numberInput = document.getElementById('number-input');
const numberIcon = document.getElementById('number-icon');
const numberSuccess = document.getElementById('number-success');
const numberError = document.getElementById('number-error');

const passwordContainer = document.getElementById('password-container');
const passwordInput = document.getElementById('password-input');
const passwordIcon = document.getElementById('password-icon');
const passwordSuccess = document.getElementById('password-success');
const passwordError = document.getElementById('password-error');
const passwordShowHide = document.getElementById('show-hide-password');
const passwordShowIcon = document.getElementById('password-show-icon');
const passwordMsg = document.getElementById('float-up');

const confirmContainer = document.getElementById('confirm-container');
const confirmInput = document.getElementById('confirm-input');
const confirmIcon = document.getElementById('confirm-icon');
const confirmShowIcon = document.getElementById('confirm-show-icon');
const confirmShowHide = document.getElementById('show-hide-confirm');
const confirmSuccess = document.getElementById('confirm-success');
const confirmError = document.getElementById('confirm-error');
const submitButton = document.getElementById('submit-button');

// Input checks
lastName.addEventListener('blur', validateUserName);
emailInput.addEventListener('focus', validateUserName);
numberInput.addEventListener('focus', validateUserName);

emailInput.addEventListener('blur', validateEmail);
numberInput.addEventListener('focus', validateEmail);

numberInput.addEventListener('blur', validateNumber);
passwordInput.addEventListener('focus', validateNumber);

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('blur', showHideFix(passwordInput, passwordIcon, passwordShowIcon, passwordShowHide));
confirmInput.addEventListener('focus', validatePassword);

confirmInput.addEventListener('blur', validateConfirm);
confirmInput.addEventListener('blur', showHideFix(confirmInput, confirmIcon, confirmShowIcon, confirmShowHide));

// Pass arguments to change visuals to success
function successHandler(input, error, icon, success, failClass) {
  input.classList.remove(failClass);
  error.innerHTML = '';
  error.style.display = 'none';
  icon.style.display = 'none';
  success.style.display = 'block';
  return true;
}

// Pass arguments to change visuals to failure
function failureHandler(input, error, icon, success, failClass) {
  input.classList.add(failClass);
  error.style.display = 'block';
  success.style.display = 'none';
  icon.style.display = 'block';
  return false;
}

function validateUserName() {
  if (firstName.value.length === 1 || lastName.value.length === 1) {
    nameError.innerHTML = 'Name not long enough!';
    failureHandler(nameInputContainer, nameError, nameIcon, nameSuccess);
  } else if (firstName.value.length === 0 || lastName.value.length === 0) {
    nameError.innerHTML = 'Please enter your first and last name.';
    failureHandler(nameInputContainer, nameError, nameIcon, nameSuccess, 'name-input-container-fail');
  } else {
    successHandler(nameInputContainer, nameError, nameIcon, nameSuccess, 'name-input-container-fail');
    return true;
  }
}

function validateEmail() {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(emailInput.value).toLowerCase())) {
    successHandler(emailContainer, emailError, emailIcon, emailSuccess, 'input-fail');
    return true;
  } else {
    emailError.innerHTML = "Please enter a valid email address."
    failureHandler(emailContainer, emailError, emailIcon, emailSuccess, 'input-fail');
  }
}

function validateNumber() {
  let number = numberInput.value;
  let trimNumber = number.replace(/\s+/g, '');
  let onlyNumber = /^\d+$/.test(number);
  if (trimNumber.length === 10 && onlyNumber) {
    successHandler(numberContainer, numberError, numberIcon, numberSuccess, 'input-fail');
    return true;
  } else {
    numberError.innerHTML = "Please enter a valid phone number."
    failureHandler(numberContainer, numberError, numberIcon, numberSuccess, 'input-fail');
  }
}

function validatePassword() {
  passwordMsg.style.display = 'none';
  if (passwordInput.value.length >= 6 && passwordInput.value.length <= 64) {
    successHandler(passwordContainer, passwordError, passwordIcon, passwordSuccess, 'input-fail');
    return true;
  } else {
    passwordError.innerHTML = "64 characters max. Special characters and numbers allowed."
    failureHandler(passwordContainer, passwordError, passwordIcon, passwordSuccess, 'input-fail');
  }
}

function validateConfirm() {
  if (confirmInput.value === passwordInput.value && confirmInput.value.length >= 6) {
    successHandler(confirmContainer, confirmError, confirmIcon, confirmSuccess, 'input-fail');
    return true;
  } else {
    confirmError.innerHTML = "Passwords do not match.";
    failureHandler(confirmContainer, confirmError, confirmIcon, confirmSuccess, 'input-fail');
  }
}

function showHide(input, icon, showIcon, showHide) {
  if (input.type === 'password') {
    input.type = 'text';
    icon.style.display = 'none';
    showIcon.style.display = 'block';
    showHide.innerHTML = "HIDE"
  } else {
    input.type = 'password';
    showIcon.style.display = 'none';
    icon.style.display = 'block';
    showHide.innerHTML = "SHOW";
  }
}

function showHideFix(input, icon, showIcon, showHide) {
  if (input.type === 'text') {
    icon.style.display = 'none';
    showIcon.style.display = 'block';
    showHide.innerHTML = "HIDE"
  }
}



function submit() {
  if (validateUserName() &&
    validateEmail() &&
    validateNumber() &&
    validatePassword() &&
    validateConfirm()) {
    submitButton.href = "complete.html";
  }
}

console.log('End scripts.js');

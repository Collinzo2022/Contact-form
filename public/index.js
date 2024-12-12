//Wait for the DOM to fully load before executing any JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Select the form element by its ID
  const form = document.getElementById("contact-form");
  // Define an array of fields with their IDs and validation requirements
  const fields = [
    {id: "firstName", required: true}, // first name is required
    {id: "lastName", required: true}, // last name is required
    {id: "email", required: true, validate: validateEmail }, // email is required
    {id: "message", required: true}, // message is required
  ];
  // Select all query type radio buttons with name attribute
  const queryTypeRadios = document.getElementsByName("queryType");
  //select the checkbox for consent
  const checkboxConsent = form.querySelector("input[type='checkbox']");

  // Add an event listener to handle submit form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent the default form submission behavior
    let isValid = true; // form is valid intially

// Validate each field in fields array
  fields.forEach(({ id, required, validate }) => {
    const input = document.getElementById(id); // Get the input field by its ID
    const errorDiv = document.getElementById(`${id}-error`); // Get the associated error message conatiner

    //Reset error message and hide the error div initially
    errorDiv.textContent = '';
    errorDiv.classList.add("hidden");

    // if the input filed does not exist, log an error and mark the form as invalid
    if (!input) {
      console.error(`Element with "{id}" not found.`);
      isValid = false;
      return;
    }
// if the field is required and empty, show an error message
    if (required && !input.value.trim()) {
      errorDiv.textContent = '${id} is required'; // Error message for validation failure
      errorDiv.classList.remove("hidden"); // Show the error div
      isValid = false; // Mark the form as invalid
    }
// if the field has a validation function and it fails, show an error message
    else if (validate && !validate(input.value)) {
      errorDiv.textContent = `Invalid ${id}`;// Error message for validation failure
      errorDiv.classList.remove("hidden"); // Show the error div
      isValid = false; // Mark the form as invalid
    }
/*
    else {
      errorDiv.classList.add("hidden");
    }*/
  });

// Validate the query type radio buttons
  const queryTypeError = document.getElementById("queryType-error"); // Error container for query type
  const selectedQueryType = [...queryTypeRadios].some(radio => radio.checked); // Check if any radio button is selected

  if (!selectedQueryType) {
    queryTypeError.textContent = "Please select a query type"; // Error message for query type
    queryTypeError.classList.remove("hidden");// Show the error div
    isValid = false; // Mark the form as invalid
  } else {
    queryTypeError.classList.add("hidden");// Hide the error div if valid
  }

  // Validate the consent checkbox
  const consentError = document.getElementById("checkboxId").nextElementSibling.querySelector(".text-red-500");
  if (!checkboxConsent.checked) {
    consentError.textContent = "Consent is required"; // Error message for query
    consentError.classList.remove("hidden");// Show the error div
    isValid = false; // Mark the form as invalid
  } else {
    if(consentError) consentError.classList.add("hidden");// Hide the error div if valid
  }
// If all validations pass, show a success message and rest the form
  if (isValid) {
    showToast("Form submitted successfully!",
       "success"); // Success toast notification
    form.reset(); // Rest the form fields

  }


});

// Validation function for email
function validateEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // Return true if email matches the regex,
}

// Function to show toast notifications
function showToast(message, type) {
  // Create a div elemnt for the toast notification
  const toast = document.createElement("div");
  toast.textContent = message; // Set the text content to the message
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"}`;
      // Append the toast to the body
      document.body.appendChild(toast);
      // Remove the toast after 3 seconds
      setTimeout(() => {
        toast.remove();
      }, 3000);
}
});
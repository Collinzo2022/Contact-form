document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const fields = [
    {id: "firstName", required: true},
    {id: "lastName", required: true},
    {id: "email", required: true, validate: validateEmail },
    {id: "message", required: true},
  ];
  const queryTypeRadios = document.getElementsByName("queryType");
  /*const queryTypeRadios = document.getElementById("queryType");*/
  const checkboxConsent = form.querySelector("input[type='checkbox']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

// Validate fields
  fields.forEach(({ id, required, validate }) => {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById(`${id}-error`);

    //Reset error state
    errorDiv.textContent = '';
    errorDiv.classList.add("hidden");

    if (required && !input.value.trim()) {
      errorDiv.textContent = '${id} is required';
      errorDiv.classList.remove("hidden");
      isValid = false;
    }

    else if (validate && !validate(input.value)) {
      errorDiv.textContent = `Invalid ${id}`;
      errorDiv.classList.remove("hidden");
      isValid = false;
    }
/*
    else {
      errorDiv.classList.add("hidden");
    }*/
  });


  const queryTypeError = document.getElementById("queryType-error");
  const selectedQueryType = [...queryTypeRadios].some(radio => radio.checked);

  if (!selectedQueryType) {
    queryTypeError.textContent = "Please select a query type";
    queryTypeError.classList.remove("hidden");
    isValid = false;
  } else {
    queryTypeError.classList.add("hidden");
  }

  const consentError = document.getElementById("checkboxId").nextElementSibling.querySelector(".text-red-500");
  if (!checkboxConsent.checked) {
    consentError.textContent = "Consent is required";
    consentError.classList.remove("hidden");
    isValid = false;
  } else {
    if(consentError) consentError.classList.add("hidden");
  }

  if (isValid) {
    showToast("Form submitted successfully!", "success");
    form.reset();

  }


});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"}`;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
}
});
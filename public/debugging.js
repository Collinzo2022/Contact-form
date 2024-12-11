document.addEventListener("DOMContentLoaded", () => {
  // Debugging function to log messages
  function debugLog(message, type = 'info') {
    const styles = {
      info: 'color: blue; font-weight: bold',
      error: 'color: red; font-weight: bold',
      success: 'color: green; font-weight: bold'
    };
    console.log(`%c[Form Debug] ${message}`, styles[type] || styles.info);
  }

  // Comprehensive form validation debugging
  function validateForm(form) {
    debugLog('Starting form validation', 'info');

    // Check if form exists
    if (!form) {
      debugLog('Form element not found!', 'error');
      return false;
    }

    // List of fields to validate
    const fieldsToValidate = [
      {
        id: 'firstName',
        required: true,
        validate: (value) => value.trim().length > 0
      },
      {
        id: 'lastName',
        required: true,
        validate: (value) => value.trim().length > 0
      },
      {
        id: 'email',
        required: true,
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      },
      {
        id: 'message',
        required: true,
        validate: (value) => value.trim().length > 0
      }
    ];

    let isFormValid = true;

    // Validate each field
    fieldsToValidate.forEach(field => {
      const input = document.getElementById(field.id);
      const errorDiv = document.getElementById(`${field.id}-error`);

      // Debug: Log input and error div status
      if (!input) {
        debugLog(`Input element for ${field.id} not found!`, 'error');
        isFormValid = false;
        return;
      }

      if (!errorDiv) {
        debugLog(`Error div for ${field.id} not found!`, 'error');
      }

      // Reset error state
      if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
      }

      // Perform validation
      const value = input.value;
      const isFieldValid = !field.required || field.validate(value);

      if (!isFieldValid) {
        debugLog(`Validation failed for ${field.id}`, 'error');
        if (errorDiv) {
          errorDiv.textContent = `Invalid ${field.id}`;
          errorDiv.classList.remove('hidden');
        }
        isFormValid = false;
      } else {
        debugLog(`Validation passed for ${field.id}`, 'success');
      }
    });

    // Validate query type
    const queryTypeRadios = document.getElementsByName('queryType');
    const queryTypeError = document.getElementById('queryType-error');
    const isQueryTypeSelected = [...queryTypeRadios].some(radio => radio.checked);

    if (!isQueryTypeSelected) {
      debugLog('No query type selected', 'error');
      if (queryTypeError) {
        queryTypeError.textContent = 'Please select a query type';
        queryTypeError.classList.remove('hidden');
      }
      isFormValid = false;
    } else {
      debugLog('Query type selected', 'success');
      if (queryTypeError) {
        queryTypeError.classList.add('hidden');
      }
    }

    // Validate consent checkbox
    const consentCheckbox = document.getElementById('checkboxId');
    const consentError = document.getElementById('consent-error') ||
      document.createElement('div');

    if (!consentCheckbox.checked) {
      debugLog('Consent not checked', 'error');
      consentError.id = 'consent-error';
      consentError.className = 'text-red-500 text-sm mt-1';
      consentError.textContent = 'You must consent to be contacted';
      consentCheckbox.parentNode.appendChild(consentError);
      isFormValid = false;
    } else {
      debugLog('Consent checked', 'success');
      if (consentError.parentNode) {
        consentError.remove();
      }
    }

    return isFormValid;
  }

  // Toast notification function
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    document.body.appendChild(toast);

    debugLog(`Toast shown: ${message}`, type);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Form submission event listener
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      debugLog('Form submission attempted', 'info');

      // Validate the entire form
      const isFormValid = validateForm(form);

      if (isFormValid) {
        debugLog('Form is valid. Proceeding with submission.', 'success');
        showToast('Form submitted successfully!');
        form.reset(); // Optional: reset form after successful submission
      } else {
        debugLog('Form validation failed', 'error');
        showToast('Please correct the errors in the form', 'error');
      }
    });
  } else {
    debugLog('Form element not found in the document', 'error');
  }
});
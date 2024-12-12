# Form Validation Project

## Overview
This project is a simple yet effective **contact form** with client-side validation using HTML, TailwindCSS, and JavaScript. It ensures users provide valid input before submitting the form by dynamically checking each field for errors and displaying appropriate feedback messages.

## Features
- Validates required fields.
- Validates email format using a regular expression.
- Ensures at least one radio button (query type) is selected.
- Verifies the consent checkbox is checked.
- Displays error messages dynamically for invalid inputs.
- Provides success notifications (toast messages) for successful form submissions.


## Technologies Used
- **HTML**: Structure of the form.
- **TailwindCSS**: Styling for the form and error messages.
- **JavaScript**: Logic for client-side validation and toast notifications.

---

## Getting Started

### Prerequisites
To run this project, you need a modern web browser like:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```bash
   cd form-validation-project
   ```
3. Open the `index.html` file in your browser.

---


### JavaScript Features
- **Event Listener for Form Submission**:
  Prevents default behavior and validates each field on submit.
- **Validation Rules**:
  - Required fields must not be empty.
  - The email field must match a valid format.
  - At least one query type (radio button) must be selected.
  - The consent checkbox must be checked.
- **Dynamic Error Messages**:
  Updates the UI to show/hide error messages based on validation.
- **Toast Notifications**:
  Displays success or error messages using a custom toast mechanism.

---

## File Structure
```
form-validation-project
├── index.html      # Form structure
├── style.css       # Styling for the form and error messages
├── script.js       # JavaScript for form validation
└── README.md       # Project documentation
```

---

## How It Works
1. User fills out the contact form.
2. On form submission, validation rules are applied:
   - Required fields are checked for non-empty values.
   - Email input is validated against a regex pattern.
   - Query type radio buttons and consent checkbox are checked.
3. If any field is invalid:
   - An error message is displayed near the field.
   - Submission is blocked until all fields pass validation.
4. On success:
   - A toast notification appears.
   - Form data is reset.

---

## Customization
- **Add More Fields**:
  Update the `fields` array in `script.js` to include new fields with their respective validation logic.
- **Styling**:
  Modify `style.css` to change the appearance of the form and error messages.
- **Validation Rules**:
  Add or customize validation logic in the `script.js` file.

---

## Known Issues
- None at the moment. Feel free to report issues or suggestions!

---

## Future Enhancements
- Add server-side validation for extra security.
- Improve form accessibility with ARIA roles and attributes.
- Integrate with a backend service for data storage.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

## Acknowledgments
- Inspired by common form validation practices.
- Toast notification design inspired by modern UI libraries.

---

## Contact
Feel free to reach out for questions or contributions:
- **Email**: aefuetanu@gmail.com
- **GitHub**: [Collinzo2020](https://github.com/Collinzo2020)

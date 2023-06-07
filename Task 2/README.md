
# React Input Validation and Vibration

This is a simple React application that demonstrates input validation and vibration effects on an input field. The application provides a text input field with a submit button. When the submit button is clicked, the application validates the input and provides visual feedback.

## Features

- The text input field has a blue border in the normal state.
- If the input value is a valid integer, the submit button shows an alert with the number.
- If the input value is not a number or a valid integer, the text input field's border turns red, and the input vibrates three times.
- The input field continues to vibrate on subsequent submit attempts with invalid input.
- An empty input is considered invalid and triggers the vibration effect.

## Technologies Used

- React
- JavaScript
- HTML
- CSS
- Vite

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/bedirhanyildirim/Picket-Code-Challenges.git
2. Change into the project directory:
   ```bash
   cd Task\ 2
3. Install the dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm run dev
## Usage
1.  Enter a number or an invalid input in the text input field.
2.  Click the "Submit" button.
3.  If the input is a valid integer, an alert with the number will be shown.
4.  If the input is not a number or a valid integer, the input field's border will turn red, and the input will vibrate.
5.  Subsequent submit attempts with invalid input will continue to trigger the vibration effect.
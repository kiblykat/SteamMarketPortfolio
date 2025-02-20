# 💳 Simple Banking System

## Preamble

This project implements a simple banking application utilizing a single-page web application GUI. The application should be capable of 3 main features:

- depositing an amount
- withdrawing an amount
- printing account statement

I have structured this app so that a Navbar is available for easy navigation. The app starts with user being Logged Out. Simply click "LOG IN" on the top right to update the logged in state. No actual API is called for updating this state. <b>Depositing</b> and <b>Withdrawing</b> are done through the <u>Transfer</u> tab. <b>Printing account statements</b> is done through the <u>Statement</u> tab.

The Home Screen allows the user to quickly view their current balance and 3 most recent transactions. I have also included a hero screen when the "gic" logo is pressed, purely for stylistic purposes. The design is responsive for mobile screens as well, with an adaptive UI.

The github repository can be found here: https://github.com/kiblykat/simple-bank-app.

For quick viewing, a deployed version of this app can be accessed here:
https://simple-bank-app-eight.vercel.app/

## Setup Instructions

### Running the program

1. Ensure nodejs is installed on your system: https://nodejs.org/en/download
2. Clone the repository from https://github.com/kiblykat/simple-bank-app.
3. Once cloned, open the command line in the folder -> run "npm i" on cmd line to download the relevant dependencies and generate the /node_modules folder
4. run "npm run dev" to start the development mode. By default, the vite server will run on http://localhost:5173/

### Testing

Ensure relevant dependencies are already downloaded from above (type "npm i" in terminal)

1. <b>To run unit tests</b>: Simply type "npm run test". The unit tests will appear in the terminal.
2. Type "npm run coverage" to have a more descriptive overview of the unit tests. A /coverage folder will be generated.
3. Go into /coverage folder -> click index.html to access a web UI of the test coverage.
4. <b>To run integration tests</b>: First ensure dev environment is running. type "npm run dev" in terminal
5. Next, type "npx cypress open" to start the Cypress GUI
6. A GUI will pop-up, click "E2E testing" -> "Chrome" -> "Start E2E Testing in Chrome"
7. A chrome browser will popup with the Cypress environment
8. Under the current "Specs" tab, you will see printStatement.cy.ts and TransferMoney.cy.ts - which corresponds to the two integration tests created mimicing user interaction.
9. Click on either one of these to start the integration test, which should show the steps taken as well as the passing tests.

## Tech Stack

- Frontend: Node.js, React, TypeScript
- Styling: Tailwind + DaisyUI (+fontawesome for icons)
- Testing: Vitest, Cypress

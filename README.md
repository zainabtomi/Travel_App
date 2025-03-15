##zainab tomi

# FEND Capstone - Travel App

This project is a travel application designed to help users plan their trips efficiently. Users can enter a destination and departure date, and the app will provide weather forecasts and images of the destination to aid in travel planning.

## Project Overview

This is a **Front-End Capstone** project for Udacity, developed as part of the **Front-End Web Development (FEND)** Nanodegree program. The app uses several external APIs to fetch relevant data, including:

- **Geonames API**: Provides geographic data, including latitude and longitude for locations.
- **Weatherbit API**: Supplies weather forecasts for the entered destination.
- **Pixabay API**: Retrieves images related to the destination.

## APIs Used

- **Geonames**: Fetches geographic data like latitude and longitude based on the user's input location.
- **Weatherbit**: Provides weather forecasts for the entered destination.
- **Pixabay**: Retrieves relevant images of the destination for visual reference.

## Node.js Version

This project requires **Node.js version 20.15.1**. Make sure to have the correct version installed by checking with:

node -v

## Project Dependencies

The app relies on the following npm packages:

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Webpack**: A module bundler to manage and optimize JavaScript, CSS, and other assets.
- **Babel**: A JavaScript compiler for ES6+ support, allowing backward compatibility for older browsers.
- **Jest**: A testing framework to run unit tests and ensure the application works as expected.

## How to Set Up and Run the App

Follow these steps to set up and run the app locally:

1. **Clone the repository**: Clone the project repository to your local machine.
2. **Install dependencies**: Navigate to the project directory and run the following command to install the necessary npm packages:

npm instal

3. **Build the project**: After installing dependencies, compile the project files by running:

npm run build


4. **Start the server**: Start the application server with the following command:

npm start

5. **Access the app**: Open your browser and go to **http://localhost:8000** to use the application.

## Running Tests

The project includes tests that ensure the app functions correctly. To run the tests, use the following command:

npm test

## Troubleshooting Tips



1. Run `npm install` again to ensure all dependencies are installed.
2. Rebuild the project with `npm run build`.
3. Restart the server with `npm start`.

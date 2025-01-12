
# Backend Development Challenge


## Overview

This project is a backend system built with Node.js and Express.js. It demonstrates the implementation of core functionalities, including CRUD operations, category and product management, filtering, and API responses tailored for user needs. MongoDB serves as the database to store and retrieve product and category information.



## Features

- **Product Management:** 
  - Create, update, delete, and retrieve products.
  - Auto-generate product codes using custom logic.
  - Calculate final product prices after discount.
- **Category Management:** 
  - Create and associate products with categories.
  - Ensure unique category names.
- **Filtering and Searching:** 
  - Filter products by category.
  - Search for products using partial or full names.
- **API Documentation:** 
  - Includes a `.rest` file for testing API requests.
- **Robust Data Handling:** 
  - Ensures validation and error handling for categories and products.



## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running instance)



## Setup Instructions

- Clone this repository.
- Install the required dependencies:
  ```
  npm install
  ```
- Create a `.env` file in the root directory and define the following:
  ```
  BACKEND_PORT=<Port number, e.g., 3001>
  DB_URI=<Your MongoDB connection string>
  ```
- Run the app by executing:
  ```
  npm start
  ```
  The server will start and be accessible at http://localhost:<BACKEND_PORT>.



## API Endpoints

The detailed documentation and API endpoints can be found at the file [`API_requests_documentation.rest`](./API_requests_documentation.rest).



## Database Design

- **Category:**
  - `name` (String, required, unique)

- **Product:**
  - `name` (String, required, unique)
  - `description` (String, required)
  - `price` (Number, required)
  - `discount` (Number, default: 0)
  - `image` (String, required)
  - `status` (String, enum: ["In Stock", "Stock Out"], default: "In Stock")
  - `productCode` (String, required, unique)
  - `category` (ObjectId, references Category, required)

### Data Model Diagram

![Data Model diagram](https://github.com/user-attachments/assets/8a00c638-11b7-4480-bde5-75e720a38362)



## 🚀 About Me

This is Udoy Saha. I am tech enthusiast, problem solver.

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/udoysaha103/)


## Feedback

If you have any feedback, please reach out to me at udoysaha103@gmail.com.


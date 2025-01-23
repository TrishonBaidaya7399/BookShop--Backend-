# Bookstore Management System

## Overview
The **Bookstore Management System** is a comprehensive web application designed to streamline the management of books, orders, and revenue tracking for bookstores. This system provides a robust API for managing books and customer orders while ensuring efficient inventory tracking and real-time revenue calculations.

---

## Features

### Book Management
- Add new books to the inventory with details like title, author, price, category, quantity, and description.
- Update existing book information.
- Delete books logically to preserve data integrity (soft delete).
- Retrieve all available books or search for a specific book by ID.

### Order Management
- Place orders for books with automatic validation of inventory and total price.
- Update existing orders for the same book and user.
- Retrieve all orders with detailed information.
- Calculate and display total revenue generated from orders.

### Inventory Management
- Automatically adjust inventory based on order placement or updates.
- Validate requested quantities against available stock.

### Revenue Tracking
- Real-time revenue calculation using MongoDB aggregation pipelines.

---

## Technologies Used
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Validation:** Zod for request validation
- **Middleware:** Query middleware for filtering logically deleted books

---

## Installation and Setup

Follow the steps below to set up the project locally:

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **MongoDB**: Ensure you have a running instance of MongoDB. [Download MongoDB](https://www.mongodb.com/try/download/community)

### Clone the Repository
```bash
https://github.com/TrishonBaidaya7399/BookShop--Backend-.git
```

### Install Dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongo_connection_string
```
Replace `your_mongo_connection_string` with the connection string to your MongoDB instance.

### Run the Application
Start the server using the following command:
```bash
npm run start:dev
```

The server will run on `http://localhost:5000` by default.

### API Endpoints

#### Book Routes
- **POST** `/books`: Add a new book
- **GET** `/books`: Retrieve all books
- **GET** `/books/:productId`: Retrieve a single book by ID
- **PUT** `/books/:productId`: Update a book by ID
- **DELETE** `/books/:productId`: Delete a book by ID (soft delete)

#### Order Routes
- **POST** `/orders`: Place a new order
- **GET** `/orders/get-all-orders`: Retrieve all orders
- **GET** `/orders/revenue`: Retrieve total revenue

---

## Folder Structure
```
bookstore-management/
├── app/
│   ├── config/
│   ├── modules/
│   │   ├── books/
│   │   │   ├── controller/
│   │   │   │   ├── books.controller.ts
│   │   │   ├── interface/
│   │   │   │   ├── books.interface.ts
│   │   │   ├── module/
│   │   │   │   ├── books.module.ts
│   │   │   ├── routes/
│   │   │   │   ├── books.route.ts
│   │   │   ├── service/
│   │   │   │   ├── books.service.ts
│   │   │   ├── validator/
│   │   │   │   ├── BookValidationSchema.ts
│   │   ├── orders/
│   │   │   ├── controller/
│   │   │   │   ├── orders.controller.ts
│   │   │   ├── interface/
│   │   │   │   ├── orders.interface.ts
│   │   │   ├── module/
│   │   │   │   ├── orders.module.ts
│   │   │   ├── routes/
│   │   │   │   ├── orders.route.ts
│   │   │   ├── service/
│   │   │   │   ├── orders.service.ts
├── index.ts
```

---

## Contribution
Contributions are welcome! Feel free to fork the repository and create pull requests with your updates or suggestions.

---

## Contact
For any questions or support, contact:
- **Email:** shukantobaidya2018@gmail.com
- **GitHub:** [Your GitHub Profile](https://github.com/TrishonBaidaya7399)

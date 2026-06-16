# Books API

A RESTful API for managing books, built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

---

## Project Structure

```
books-api/
├── models/
│   └── Book.js          # Mongoose Book schema & model
├── routes/
│   └── books.js         # All /api/books route handlers
├── .env                 # Environment variables (not committed)
├── .env.example         # Template for environment variables
├── .gitignore
├── package.json
├── server.js            # Entry point: Express app + MongoDB connection
└── README.md
```

---

## Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) running locally **or** a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Rename `.env.example` to `.env` and update values:
```env
PORT=5005
MONGO_URI=mongodb://localhost:27017/booksdb
```
For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/booksdb
```

### 4. Start the server
```bash
# Production
npm start

# Development (with auto-restart via nodemon)
npm run dev
```

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/api/books`       | Add a new book       |
| GET    | `/api/books`       | Get all books        |
| GET    | `/api/books/:id`   | Get a book by ID     |
| PUT    | `/api/books/:id`   | Update a book by ID  |
| DELETE | `/api/books/:id`   | Delete a book by ID  |

---

## Book Schema

| Field   | Type   | Required | Notes                  |
|---------|--------|----------|------------------------|
| title   | String | Yes      | Trimmed                |
| author  | String | Yes      | Trimmed                |
| price   | Number | Yes      | Must be >= 0           |

Mongoose automatically adds `createdAt` and `updatedAt` timestamps.

---

## Example Requests

### POST `/api/books` — Add a book
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "The Alchemist", "author": "Paulo Coelho", "price": 12.99}'
```
**Response (201):**
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "price": 12.99,
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

### GET `/api/books` — Get all books
```bash
curl http://localhost:5000/api/books
```

### GET `/api/books/:id` — Get one book
```bash
curl http://localhost:5000/api/books/64f1a2b3c4d5e6f7a8b9c0d1
```

### PUT `/api/books/:id` — Update a book
```bash
curl -X PUT http://localhost:5000/api/books/64f1a2b3c4d5e6f7a8b9c0d1 \
  -H "Content-Type: application/json" \
  -d '{"price": 9.99}'
```

### DELETE `/api/books/:id` — Delete a book
```bash
curl -X DELETE http://localhost:5000/api/books/64f1a2b3c4d5e6f7a8b9c0d1
```

---

## Error Responses

| Status | Meaning                              |
|--------|--------------------------------------|
| 400    | Bad request / invalid ID / validation failed |
| 404    | Book not found                       |
| 500    | Internal server error                |

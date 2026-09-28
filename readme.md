# MORROW

MORROW is a single-seller marketplace application where users can browse listings, view product details, and authenticated sellers can manage their listings.

The project is built with a React + TypeScript frontend and a Node.js + Express backend, with MongoDB for data storage.

---

## Features

### Public Features

* Browse all listings
* Search listings
* Filter listings by category
* View listing details
* User registration
* User login

### Seller Features

* Protected seller dashboard
* View seller listings
* Add a new listing
* Edit an existing listing
* Delete a listing
* Logout

### Authentication

* JWT-based authentication
* Access token authentication
* Refresh token using HTTP-only cookies
* Protected routes
* Axios request interceptor
* `Authorization: Bearer <accessToken>`
* Credential-based cookie support

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router Data Router
* Redux Toolkit
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* express-validator
* Multer
* ImageKit
* Cookie Parser
* proxy

---

# Project Structure

```text
MORROW/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   │   ├── Seller/
│   │   │   └── ...
│   │   ├── routes/
│   │   ├── service/
│   │   ├── Storee/
│   │   │   ├── slices/
│   │   │   └── ...
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── validators/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# Frontend

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on the Vite development server.

---

## Frontend Routing

MORROW uses React Router's Data Router.

Main public routes:

```text
/
 /listings
 /listings/:id
 /category
 /login
 /register
```

Protected seller routes:

```text
/dashboard
/mylistings
/listings/add
/listings/:id/edit
```

Seller routes are protected using `ProtectedRoute`.

---

## Frontend Authentication

Authentication state is managed using Redux Toolkit.

The access token is stored in:

* Redux state
* Local Storage

Protected API requests use:

```http
Authorization: Bearer <accessToken>
```

Axios is configured with:

```ts
withCredentials: true
```

This allows the refresh-token cookie to be sent with requests.

---

# Backend

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Do not commit your `.env` file to GitHub.

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Logout

```http
POST /api/auth/logout
```

### Refresh Token

```http
POST /api/auth/refresh
```

---

## Products / Listings

### Get All Listings

```http
GET /api/products
```

Supports:

```text
?search=
?category=
```

Example:

```http
GET /api/products?search=chair
```

```http
GET /api/products?category=furniture
```

### Get Listing By ID

```http
GET /api/products/:id
```

### Create Listing

```http
POST /api/products
```

This is an authenticated request and uses `multipart/form-data` for product images.

### Update Listing

```http
PUT /api/products/:id
```

This is an authenticated request.

### Delete Listing

```http
DELETE /api/products/:id
```

This is an authenticated request.

---

# Product Data

A listing contains information such as:

```text
name
description
category
price
stock
images
```

Price contains:

```text
amount
currency
```

Supported currencies:

```text
INR
USD
EUR
```

---

# Authentication Flow

MORROW uses access and refresh tokens.

```text
Login
  ↓
Backend validates credentials
  ↓
Access Token
  ↓
Frontend stores Access Token
  ↓
Protected API Request
  ↓
Authorization: Bearer AccessToken
```

The refresh token is stored in an HTTP-only cookie.

```text
Refresh Token
      ↓
HTTP-only Cookie
      ↓
withCredentials: true
      ↓
Backend
```

---

# Protected Routes

Seller pages are wrapped with `ProtectedRoute`.

```text
/dashboard
/mylistings
/listings/add
/listings/:id/edit
```

If the user is not authenticated:

```text
Protected Route
      ↓
Not Authenticated
      ↓
/login
```

---

# Listing Management Flow

## Add Listing

```text
Add Listing
    ↓
Form
    ↓
POST /api/products
    ↓
Backend Validation
    ↓
Image Upload
    ↓
MongoDB
```

## Edit Listing

```text
My Listings
    ↓
Edit
    ↓
GET /api/products/:id
    ↓
Pre-filled Form
    ↓
PUT /api/products/:id
    ↓
Updated Listing
```

## Delete Listing

```text
My Listings
    ↓
Delete
    ↓
Confirmation
    ↓
DELETE /api/products/:id
    ↓
UI Update
```

---

# Image Upload

Product images are handled using:

* Multer
* Memory storage
* ImageKit

The frontend sends images using `multipart/form-data`.

---

# Validation

Backend validation is handled using:

* Mongoose schema validation
* Express Validator

Examples include:

* Required fields
* Product name length
* Description length
* Valid price
* Valid stock
* Allowed currency values
* Image limits

---

# API Client

The frontend uses Axios for API communication.

Example:

```ts
const Api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
```

Protected requests automatically attach the access token:

```http
Authorization: Bearer <accessToken>
```

---

# Development

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

---

# Future Improvements

Possible future improvements include:

* Seller-specific listing ownership
* Pagination
* Better image management
* Advanced search and filtering
* Loading skeletons
* Improved error handling
* Deployment
* Production authentication configuration

---

# Author

**Shruti Kesharwani**

Built as a full-stack marketplace project while learning modern frontend and backend development.

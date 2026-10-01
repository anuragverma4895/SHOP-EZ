# SHOP-EZ 🛒

SHOP-EZ is a full-stack e-commerce application built with React, Node.js, Express, MongoDB, and a separate Python FastAPI recommendation service.

The project combines the core shopping flow—product browsing, search, filtering, cart, wishlist, checkout, orders, reviews, authentication, and administration—with AI-powered product recommendations.

## ✨ Features

### 🛍️ Shopping Experience
- Product listing with pagination
- Product search, category filtering, and price/newest/popularity sorting
- Product detail pages with ratings, reviews, stock information, quantity selection, and product images
- Shopping cart
- Wishlist
- Checkout with shipping details
- Order history
- Product reviews

### 🤖 AI Recommendations
The project has a dedicated FastAPI service for recommendations:

- **Similar Products** — content-based recommendations using TF-IDF and cosine similarity over product category, brand, name, and description.
- **Customers Also Bought** — collaborative recommendations based on products appearing together in order history.
- **Trending Products** — an AI-service endpoint with a fallback in the Node.js backend to return highly rated/reviewed products if the AI service is unavailable.

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Authentication through HTTP cookies or Bearer tokens
- User profile management
- Role-based admin authorization
- Helmet security middleware
- API rate limiting
- CORS configuration

### 💳 Payments & Orders
- Razorpay order creation
- Razorpay payment signature verification
- Order creation and order history
- Admin order management and status updates

### 👨‍💼 Admin Dashboard
Admin functionality includes:
- Product management
- Order management
- User management
- Banner management

### 🎨 Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion animations
- React Router
- Axios
- React Hot Toast
- Chart.js / react-chartjs-2
- Lucide React icons
- Responsive UI

---

## 🏗️ Architecture

SHOP-EZ is organized as a three-service application:

```
                         ┌─────────────────────────┐
                         │     React Frontend      │
                         │       Vite + React      │
                         └────────────┬────────────┘
                                      │
                                      │ REST API
                                      ▼
                         ┌─────────────────────────┐
                         │   Node.js + Express     │
                         │       Backend API       │
                         └───────┬─────────┬───────┘
                                 │         │
                        MongoDB  │         │ HTTP
                                 │         │
                                 ▼         ▼
                         ┌────────────┐  ┌──────────────────────┐
                         │  MongoDB   │  │ Python FastAPI       │
                         │  Database  │  │ Recommendation       │
                         └────────────┘  │ Service               │
                                         └──────────────────────┘
```

### Repository Structure

```text
SHOP-EZ/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express API
├── ai_service/        # Python FastAPI recommendation service
├── index.js           # Root entry point for the backend
├── render.yaml        # Render multi-service deployment configuration
└── package.json       # Root project scripts
```

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Axios |
| UI / UX | Framer Motion, Lucide React, React Hot Toast |
| Data Visualization | Chart.js, react-chartjs-2 |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | JWT, cookies, Bearer tokens, bcrypt |
| Payments | Razorpay |
| Security | Helmet, CORS, express-rate-limit |
| AI Service | Python, FastAPI, Pandas, NumPy, scikit-learn |
| Recommendation Algorithms | TF-IDF, cosine similarity, co-occurrence frequency |
| Deployment | Render |

---

## 📁 Project Structure

### Frontend

```text
frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── services/
│   └── utils/
└── package.json
```

The frontend includes pages for home, authentication, products, product details, cart, checkout, profile, orders, and administration.

### Backend

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── package.json
└── server.js
```

The Express backend exposes APIs for users, products, cart, wishlist, orders, AI recommendations, and banners.

### AI Service

```text
ai_service/
├── main.py
├── recommendation_engine.py
├── requirements.txt
└── ...
```

The FastAPI service exposes recommendation endpoints and is called by the Node.js backend.

---

## 🚀 Local Setup

### Prerequisites

Install:

- Node.js 20.19.0 or newer
- npm
- Python 3.x
- MongoDB
- A Razorpay account if you want to test real Razorpay payments

### 1. Clone the repository

```bash
git clone https://github.com/anuragverma4895/SHOP-EZ.git
cd SHOP-EZ
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Vite serves the development frontend on its default development port.

### 3. Install backend dependencies

Open another terminal:

```bash
cd SHOP-EZ/backend
npm install
```

Start the backend:

```bash
npm run dev
```

The backend uses `PORT` from the environment and otherwise defaults to `5000`.

### 4. Install the AI service

Open another terminal:

```bash
cd SHOP-EZ/ai_service
pip install -r requirements.txt
```

Start the FastAPI service:

```bash
uvicorn main:app --reload --port 8000
```

The AI service must be reachable by the backend through `AI_SERVICE_URL`.

---

## 🔑 Environment Variables

The backend expects the following environment variables:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
AI_SERVICE_URL=http://localhost:8000
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_SECRET=<your-razorpay-secret>
```

The frontend reads:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Do not commit real secrets or API keys to Git.

---

## 🧠 How the AI Recommendation Flow Works

### Similar Products

1. The Node.js backend loads product information from MongoDB.
2. It sends product ID, category, brand, name, and description data to the FastAPI service.
3. The Python service combines those text fields into a product-content representation.
4. TF-IDF converts the text into vectors.
5. Cosine similarity compares the selected product with the other products.
6. The service returns the most similar product IDs.
7. The Node.js backend fetches the complete product documents from MongoDB.

### Customers Also Bought

1. The backend finds orders containing the selected product.
2. Product IDs purchased in the same orders are collected.
3. The FastAPI service counts co-occurrences.
4. The most frequently co-purchased product IDs are returned.
5. The backend fetches their complete product information.

---

## 🌐 Deployment

The repository contains a `render.yaml` configuration for three Render services:

| Service | Runtime | Purpose |
|---|---|---|
| `shop-ez-frontend` | Static | React production build |
| `shop-ez-backend` | Node.js | Express API and production entry point |
| `shop-ez-ai` | Python | FastAPI recommendation service |

The Render configuration connects the services using Render-provided service URLs. The backend receives the AI service URL, while the frontend receives the backend URL.

For production deployment, configure the required secrets and environment values in Render rather than committing them to the repository.

---

## 🔌 Main API Areas

The backend currently exposes these API groups:

```text
/api/users
/api/products
/api/admin/products
/api/cart
/api/wishlist
/api/orders
/api/admin/orders
/api/ai
/api/banners
```

Payment endpoints are available under:

```text
POST /api/orders/payment/create
POST /api/orders/payment/verify
```

AI recommendation endpoints include:

```text
GET  /api/ai/trending
GET  /api/ai/:id/similar
GET  /api/ai/:id/also-bought
```

---

## 🔒 Security Notes

- Passwords are handled with bcrypt.
- JWTs are used for authentication.
- Protected routes verify the authenticated user.
- Admin routes additionally verify the user's admin role.
- Helmet is enabled for HTTP security headers.
- API requests are rate-limited.
- CORS and credential handling are configured in the Express backend.
- Keep MongoDB, JWT, and Razorpay credentials private.

---

## 📌 Important Implementation Note

The AI service is a separate Python application. The Node.js backend communicates with it over HTTP using `AI_SERVICE_URL`.

If the AI recommendation service is unavailable:
- Similar-product and also-bought requests return an AI-service-unavailable response.
- The trending-products backend endpoint falls back to highly rated/reviewed products.

---

## 👨‍💻 Author

**Anurag Verma**

- GitHub: https://github.com/anuragverma4895
- LinkedIn: https://www.linkedin.com/in/anuragverma4895

---

⭐ If you find this project useful, consider starring the repository.

Made with ❤️ by Anurag Verma

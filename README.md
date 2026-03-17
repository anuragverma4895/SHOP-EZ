# SHOP-EZ 🛒

A full-stack e-commerce platform with AI-powered product recommendations.

## 🏗️ Architecture

| Service | Technology | Port |
|---------|-----------|------|
| Frontend | React (Vite) + Tailwind CSS | 5173 |
| Backend | Node.js (Express) + MongoDB | 5000 |
| AI Service | Python (FastAPI) | 8000 |

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run seed    # Seed database with demo data
npm run dev     # Start dev server on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev     # Start dev server on port 5173
```

### AI Service
```bash
cd ai_service
pip install fastapi uvicorn pandas scikit-learn
python main.py  # Start on port 8000
```

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **User** | user@shopez.com | password123 |
| **Admin** | admin@shopez.com | password123 |

## ✨ Features

- 🛍️ Full e-commerce functionality (products, cart, checkout, orders)
- 🤖 AI-powered product recommendations (content-based & collaborative filtering)
- 🔐 JWT authentication with role-based access (user/admin)
- 👨‍💼 Admin dashboard (manage products, orders, users, banners)
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS, Framer Motion animations

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| AI Service | [Render](https://render.com) |

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=production
AI_SERVICE_URL=<your-ai-service-url>
FRONTEND_URL=<your-frontend-vercel-url>
```

## 📞 Contact

- **Phone:** +91 8874096365
- **Email:** anuragverma4895@gmail.com
- **GitHub:** [anuragverma4895](https://github.com/anuragverma4895)
- **LinkedIn:** [anuragverma4895](https://www.linkedin.com/in/anuragverma4895)
- **Instagram:** [anurag_verma_575](https://www.instagram.com/anurag_verma_575/)
- **YouTube:** [anurag_verma_575](https://www.youtube.com/@anurag_verma_575)

---
Made with ❤️ by Anurag Verma

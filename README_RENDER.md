# Deploying SHOP-EZ to Render 🚀

This project is set up to be deployed automatically to Render using a **Blueprint**. This will create three services:
1.  **shop-ez-backend** (Node.js API)
2.  **shop-ez-frontend** (Static React Site)
3.  **shop-ez-ai** (Python Recommendation Service)

## 🛠️ Step-by-Step Instructions

1.  **Push your code to GitHub**: Make sure all these files (especially `render.yaml`) are pushed to your repository.
2.  **Go to Render Dashboard**: [https://dashboard.render.com](https://dashboard.render.com)
3.  **Click "New +"** (Top Right) > **Blueprint**.
4.  **Connect your GitHub Repository**: Select the `SHOP-EZ` repository.
5.  **Configure Deployment**: 
    - Render will read the `render.yaml` file.
    - It will ask you for a **Service Group Name** (e.g., `shop-ez-prod`).
    - It will ask for the following **Environment Variables**:
      - `MONGO_URI`: Your MongoDB connection string (from MongoDB Atlas).
      - `JWT_SECRET`: A secure random string for signing tokens (Render can generate this for you).
6.  **Click "Apply"**: Render will start building and deploying all three services.

## 🔗 How it works
- The **Frontend** automatically gets the URL of the **Backend**.
- The **Backend** automatically gets the URL of the **AI Service**.
- Everything is pre-configured to communicate seamlessly.

## ⚠️ Important Notes
- **Free Tier Sleep**: Since this uses the Render Free Tier, the backend and AI service will "sleep" after 15 minutes of inactivity. The first request after a sleep might take ~30 seconds to wake up the server.
- **Database**: Ensure your MongoDB Atlas IP Access List allows connections from everywhere (`0.0.0.0/0`) since Render's IP addresses can change.

---
Made with ❤️ for SHOP-EZ.

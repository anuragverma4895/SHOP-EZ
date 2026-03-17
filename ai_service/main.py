from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import pandas as pd
from recommendation_engine import ContentBasedRecommender, CollaborativeRecommender

app = FastAPI(title="ShopEZ AI Recommendation Service", version="1.0.0")

# CORS — allow backend and frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
content_recommender = ContentBasedRecommender()
collab_recommender = CollaborativeRecommender()

class ProductData(BaseModel):
    product_id: str
    name: Optional[str] = ""
    category: Optional[str] = ""
    brand: Optional[str] = ""
    description: Optional[str] = ""

class RecommendRequest(BaseModel):
    product_id: str
    all_products: List[ProductData]
    limit: int = 4

class OrderData(BaseModel):
    order_id: str
    user_id: str
    product_ids: List[str]

class CollabRequest(BaseModel):
    product_id: str
    all_orders: List[OrderData]
    limit: int = 4

@app.get("/")
def read_root():
    return {"status": "online", "message": "ShopEZ AI Recommendation Engine API"}

@app.post("/api/ai/similar-products")
def get_similar_products(request: RecommendRequest):
    """
    Returns similar products based on content (category, brand, text).
    """
    try:
        products_df = pd.DataFrame([p.dict() for p in request.all_products])
        
        if products_df.empty or request.product_id not in products_df['product_id'].values:
            return {"recommendations": []}

        recommendations = content_recommender.recommend(
            products_df, 
            request.product_id, 
            request.limit
        )
        return {"recommendations": recommendations}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/customers-also-bought")
def get_customers_also_bought(request: CollabRequest):
    """
    Returns products frequently bought together based on order history.
    """
    try:
        orders_data = [{"order_id": o.order_id, "user_id": o.user_id, "product_ids": o.product_ids} for o in request.all_orders]
        orders_df = pd.DataFrame(orders_data)
        
        if orders_df.empty:
            return {"recommendations": []}

        recommendations = collab_recommender.recommend(
            orders_df, 
            request.product_id, 
            request.limit
        )
        return {"recommendations": recommendations}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ai/trending")
def get_trending_products(limit: int = 4):
    """
    Mock endpoint for trending products.
    In a real scenario, this would aggregate views and sales over the last X days.
    """
    return {
        "trending": [
            "60d5ecb8b392d700153e3c2b", 
            "60d5ecb8b392d700153e3c2c",
            "60d5ecb8b392d700153e3c2d"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

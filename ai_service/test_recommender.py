import pandas as pd
from recommendation_engine import ContentBasedRecommender, CollaborativeRecommender

# Dummy data that mimics what the frontend sends
test_products = [
    {"product_id": "1", "name": "Shirt", "category": "Fashion", "brand": "Generic", "description": "A nice shirt"},
    {"product_id": "2", "name": "Pants", "category": "Fashion", "brand": "Generic", "description": "Some nice pants"},
    {"product_id": "3", "name": "Phone", "category": "Electronics", "brand": "Tech", "description": "A smart phone"},
]

try:
    print("Testing Content Recommender...")
    df = pd.DataFrame(test_products)
    recommender = ContentBasedRecommender()
    recs = recommender.recommend(df, "1", 4)
    print("Recommendations:", recs)
except Exception as e:
    import traceback
    traceback.print_exc()

test_orders = [
    {"order_id": "o1", "user_id": "u1", "product_ids": ["1", "2"]},
    {"order_id": "o2", "user_id": "u2", "product_ids": ["2", "3"]},
]

try:
    print("\nTesting Collab Recommender...")
    df_orders = pd.DataFrame(test_orders)
    collab = CollaborativeRecommender()
    recs2 = collab.recommend(df_orders, "2", 4)
    print("Recommendations:", recs2)
except Exception as e:
    import traceback
    traceback.print_exc()

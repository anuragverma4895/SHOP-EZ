import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter

class ContentBasedRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def recommend(self, products_df, target_product_id, limit=4):
        """
        Recommend products based on text similarity of category + brand + name
        """
        # Create a "content" string for each product
        products_df['content'] = products_df['category'] + " " + products_df['brand'] + " " + products_df['name'] + " " + products_df['description']
        
        # Calculate TF-IDF
        tfidf_matrix = self.vectorizer.fit_transform(products_df['content'])
        
        # Find index of target product
        target_idx_list = products_df.index[products_df['product_id'] == target_product_id].tolist()
        if not target_idx_list:
            return []
        
        target_idx = target_idx_list[0]
        
        # Calculate cosine similarity
        cosine_sim = cosine_similarity(tfidf_matrix[target_idx], tfidf_matrix).flatten()
        
        # Get top similar indices (excluding the product itself)
        similar_indices = cosine_sim.argsort()[-(limit+1):][::-1]
        similar_indices = [i for i in similar_indices if i != target_idx][:limit]
        
        # Return list of recommended product IDs
        return products_df.iloc[similar_indices]['product_id'].tolist()


class CollaborativeRecommender:
    def __init__(self):
        pass

    def recommend(self, orders_df, target_product_id, limit=4):
        """
        Recommend products based on what other customers bought in the same orders
        """
        # Flatten orders to list of all products bought together with target
        co_occurrences = []
        
        for _, row in orders_df.iterrows():
            product_list = row['product_ids']
            if target_product_id in product_list:
                co_occurrences.extend([p for p in product_list if p != target_product_id])
                
        if not co_occurrences:
            return []
            
        # Count frequencies
        product_counts = Counter(co_occurrences)
        
        # Get most common
        most_common = product_counts.most_common(limit)
        
        # Return list of product IDs
        return [item[0] for item in most_common]

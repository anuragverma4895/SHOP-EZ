import axios from 'axios';

const testAI = async () => {
    try {
        console.log('Fetching live products to feed to AI...');
        const res = await axios.get('http://localhost:5000/api/products?page=1');
        const products = res.data.products;

        if (products.length === 0) {
            console.log('No products in database to test with.');
            return;
        }

        // Try the 2nd product if first fails context
        const targetId = products[0]._id;
        console.log('Target Product ID:', targetId);

        const payload = {
            product_id: targetId,
            all_products: products.map(p => ({
                product_id: p._id.toString(),
                name: p.name,
                category: p.category,
                brand: p.brand,
                description: p.description || ''
            })),
            limit: 4
        };

        console.log('Sending payload to AI Engine...');
        const aiRes = await axios.post('http://localhost:8000/api/ai/similar-products', payload);
        console.log('AI Response:', aiRes.data);

    } catch (error) {
        console.error('------- HTTP ERROR CAUGHT -------');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
    }
};

testAI();

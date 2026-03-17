import axios from 'axios';

const testProduct = async () => {
    try {
        console.log('Logging in as admin...');
        const loginRes = await axios.post('http://localhost:5000/api/users/login', {
            email: 'admin@shopez.com',
            password: 'password123'
        });

        const token = loginRes.data.token;
        console.log('Login successful.');

        console.log('Attempting to create a product...');
        const res = await axios.post('http://localhost:5000/api/admin/products', {
            name: 'Test New Product',
            price: 99.99,
            category: 'Electronics',
            countInStock: 10,
            description: 'A test product',
            image: 'https://via.placeholder.com/800x400'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Product creation successful:', res.data.name);

    } catch (error) {
        console.error('Error occurred!');
        if (error.response) {
            console.error('Status:', error.response.status);
        } else {
            console.error(error.message);
        }
    }
};

testProduct();

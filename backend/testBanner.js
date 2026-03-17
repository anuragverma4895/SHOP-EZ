import axios from 'axios';

const testBanner = async () => {
    try {
        // 1. Login to get token
        console.log('Logging in as admin...');
        const loginRes = await axios.post('http://localhost:5000/api/users/login', {
            email: 'admin@shopez.com',
            password: 'password123'
        });

        const token = loginRes.data.token;
        console.log('Login successful. Token:', token.substring(0, 15) + '...');

        // 2. Try to create a banner
        console.log('Attempting to create a banner...');
        const bannerRes = await axios.post('http://localhost:5000/api/banners', {
            title: 'Test Banner',
            image: 'https://via.placeholder.com/800x400',
            isActive: true
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Banner creation successful:', bannerRes.data);

    } catch (error) {
        console.error('Error occurred!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            if (typeof error.response.data === 'string') {
                console.error('HTML Response:', error.response.data.substring(0, 500));
            }
        } else {
            console.error(error.message);
        }
    }
};

testBanner();

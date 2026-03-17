const testBanner = async () => {
    try {
        console.log('Logging in as admin...');
        const loginRes = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@shopez.com',
                password: 'password123'
            })
        });

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login successful. Token:', token.substring(0, 15) + '...');

        console.log('Attempting to create a banner...');
        const bannerRes = await fetch('http://localhost:5000/api/banners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: 'Test Banner',
                image: 'https://via.placeholder.com/800x400',
                isActive: true
            })
        });

        const bannerData = await bannerRes.text();
        console.log('Status Code:', bannerRes.status);
        console.log('Response Body:', bannerData);

    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};

testBanner();

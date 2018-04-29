const axios = require('axios');

// axios.get('https://jsonplaceholder.typicode.com/users')
//     .then(response => {
//         const res = response.data;
//         console.log(typeof res);
//     })
//     .catch(console.log);

const axiosTest = async (url, user) => {
    const response = await axios.post(url, user);
    console.log(response);
} 

axiosTest('http://localhost:5000/users/login', {
    email: "test@test.com",
    password: "password"
});

// axios.post('http://localhost:5000/users/login', {
//     email: "test@test.com",
//     password: "password"
// }).then(res => console.log(res.headers['x-auth']))
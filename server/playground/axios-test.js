const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        const res = response.data;
        console.log(typeof res);
    })
    .catch(console.log);
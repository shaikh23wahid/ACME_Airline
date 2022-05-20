const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        "id": 10,
        "token": '403ae894-c711-11ec-9d64-0242ac120002',
        "email": "byron.fields@reqres.in",
        "first_name": "Byron",
        "last_name": "Fields",
        "avatar": "https://reqres.in/img/faces/10-image.jpg"
    });
});

app.listen(3001, () => console.log('API is running on http://localhost:3001/login'));
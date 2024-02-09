const express = require('express');
const app = express();
const PORT = 3000;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ['http://127.0.0.1:3000', 'https://2867-2402-800-6341-f4ef-e5ca-3417-f48e-7133.ngrok-free.app']);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    console.log("RESULT", req.query)
    res.json("OK");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
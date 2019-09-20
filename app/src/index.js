const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (_, res) => {
    res.status(200).json({
        type: 'test'
    })
})

app.listen(port, () => {
    console.log('App is running at 3000')
})
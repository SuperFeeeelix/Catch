const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB');
    
}).catch(error => {
    console.error("Error connection to MongoDB:", error); 
});

app.listen(8800, () => {
    console.log('back-end server is being listend!!!! Felix was here by the way');
})



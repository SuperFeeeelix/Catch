const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');

const app = express();
const PORT = process.eventNames.PORT || 8800;

app.use(express.json());
app.use(routes);

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB');
    
}).catch(error => {
    console.error("Error connection to MongoDB:", error); 
});

app.listen(PORT, () => {
    console.log('back-end server is being listend!!!! Felix was here by the way');
})



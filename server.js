import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import Product from './models/product.js';


const app = express();
const PORT = 4000;

app.use(express.json());

mongoose.connect('mongodb+srv://hrushikesh:klausyt2003@cluster0.efvmx.mongodb.net/');

const db = mongoose.connection;

db.on('open', () => {
    console.log('Connection is successful');
});


app.listen(PORT, () => {
    console.log(`Listening here at ${PORT}`);
});




routes(app);


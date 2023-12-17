import config from './config.js';
import express from 'express';
import mongoose from 'mongoose';
import routes from './REST/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerDocs from './service/swagger.js';

const app = express();

const corsOptions = {
    origin: [
        'https://checkout.stripe.com',
        'http://localhost:5173'
      ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.info('Mongodb connected');
    })
    .catch(error => console.info(error));

routes(app);

const server = app.listen(config.port, function () {
    console.info(`Server is running at ${config.port}`)
    swaggerDocs(app);
});

export default server;
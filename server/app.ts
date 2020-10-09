import route from './route/route';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { GQL, cors_checker } from './route/gql';


async function connect_database(
	conn_str: string,
    conn_db: string
){
    // await mongoose.connect(
	// 	`mongodb+srv://${conn_str}/${conn_db}?retryWrites=true&w=majority`, {
	// 	ssl: true,
	// 	authSource: 'admin',
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true,
	// 	useCreateIndex: true,
	// 	useFindAndModify: false,
    // });
    await mongoose.connect(
		`mongodb://localhost:27017/${conn_db}?retryWrites=true&w=majority`, {
		// ssl: true,
		authSource: 'admin',
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
    });
    console.log(`Database, ${conn_db} is connected`);
}


async function start_server() {
    connect_database(process.env.mongodb_gdg || 'undefined', 'gdg_test');

    const app = express();

    app.use(
        cors(cors_checker)
    )
    .use(
        bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        })
    ) // expand url encoded limit
    .use(
        bodyParser.json({
            limit: '50mb'
        })
	)
	
	app.use(cookieParser());

	await GQL(app);  // GraphQL main at /graphql

	app.use('/', route);  // UI

    app.listen(3000, () => {
        console.log('Server created at: ' + 3000)
    });
}

start_server();



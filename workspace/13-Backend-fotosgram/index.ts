import Server from './classes/server';
import mongoose from 'mongoose';

import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );

// Cors
server.app.use(cors({ origin: true, credentials: true}));

// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );


// Conectar DB
mongoose.connect('mongodb+srv://leandro:Universidad11201911@cluster0.w3jhy.mongodb.net/', ( err ) => {
   if ( err ) throw err;

   console.log('Base de datos ONLINE!');
})

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});
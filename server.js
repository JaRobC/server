import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';


const app = express();
/* app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


app.use(cors({
  origin: ['https://learnsi.onrender.com/'],
  // autres options CORS
}));



/*conn file*/
import connect from './database/conn.js';


/*app port*/
const port = process.env.PORT || 8080;

/* Routes */
app.use('/api', router); /*api */


app.get('/', (req, res) =>{
    try{
        res.json("Get request")
    } catch (error) {
        res.json(error)
    }
})

/*serveur on quand une connection valid */

connect().then(() =>{
    try {
        app.listen(port, () => {
            console.log('Serveur On sur http://localhost:%d', port)
        })
 } catch (error) {
    console.log("Ne peut pas ce connecter au serveur")
 }
}).catch(error => {
    console.log("Base de donné invalide")
})




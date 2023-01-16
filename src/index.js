import * as dotenv from 'dotenv' 
import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path';
import url from 'url';
import index from './routes/index.routes.js'
import login from './routes/login.routes.js'
import cerrar_sesion from './routes/cerrar-sesion.routes.js'
import proyectos from './routes/proyectos.routes.js'
import adoptarbol from './routes/adoptarbol.routes.js'
import donantes from './routes/donantes.routes.js'
import perfil from './routes/perfil.routes.js'
import sobrenosotros from './routes/sobrenosotros.routes.js'
import panel_admin from './routes/panel_admin.routes.js'
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import pass from './models/authenticate/passport.js';
import stripe from './routes/stripe.routes.js';




//Path

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()

//inicializar 
const app = express();
pass;

//Confirguraciones
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));



//Motor de plantillas handlebars
app.engine('.hbs', engine({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs");



//Midelware
app.use(cookieParser());
app.use(session(
  {
    secret: 'sesion',
    resave: false,
    saveUninitialized: false,
  }
))

/* app.use(multer({
  destino:'public/img/server'
}).single('image')) */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());




//rutas
app.use(index);
app.use(login);
app.use(proyectos);
app.use(adoptarbol);
app.use(donantes);
app.use(perfil);
app.use(sobrenosotros);
app.use(panel_admin);
app.use(stripe);
app.use(cerrar_sesion);
//public 
app.use(express.static(path.join(__dirname, "public")))

//Ejecutar el servidor
app.listen(app.get("port"), () => {
  console.log(
    "El servidor se inicio en el puerto " +
    "http://localhost:" +
    app.get("port")
  );
});

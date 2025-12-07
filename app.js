const express = require('express');
const app = express();

const connectDB = require('./configs/connectDB');
const env = require('./configs/envVariables');
const cookieParser = require('cookie-parser');
const path = require('path');
const UserRouter = require('./routes/user.route');
const OwnerRouter = require('./routes/owner.route');
const ProductRouter = require('./routes/product.route');

//cross origin resource sharing
const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:5173','https://scatch-frontend-chi.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
//------------------------------


connectDB() // calling connectDB function

//These are some common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//-----------------------------------------
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.render('index');
// })
// app.get('/shop', (req, res) => {
//     res.render('shop');
// })
//-------------------------------------------




// ✔ This is REST API Structure
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/owners", OwnerRouter);
app.use("/api/v1/products", ProductRouter);







const PORT = env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is runnig on port ${env.PORT}`)
});












// 🔍 Explanation
// 1️⃣ /api → App ke API endpoints ko group karta hai
// 2️⃣ /v1 → API version 1
// 3️⃣ /user → Resource (User related routes)
// 4️⃣ /owner → Another resource (Owner related routes)

// Aur UserRouter aur OwnerRouter ke andar usually kuch routes honge:
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", getUserProfile);

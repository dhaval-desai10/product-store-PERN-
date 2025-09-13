import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors'
import dotenv from "dotenv";
import productRoutes from "./routes/poroductRoutes.js"

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;
// console.log(PORT);



app.use(express.json());
app.use(cors());


app.use(helmet()) // helmet is security middleware that helps you project your
//  app by setting various http heders

app.use(morgan("dev")) // log the request to the console
 

app.use("/api/products",productRoutes)

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);

})


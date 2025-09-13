import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors'
import dotenv from "dotenv";
import productRoutes from "./routes/poroductRoutes.js"
import { sql } from "./config/db.js";

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;
// console.log(PORT);



app.use(express.json());
app.use(cors());


app.use(helmet()) // helmet is security middleware that helps you project your
//  app by setting various http heders

app.use(morgan("dev")) // log the request to the console


app.use("/api/products", productRoutes);

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log("Products table checked/created successfully.");
    } catch (error) {
        console.log("Error connecting to the database (initDB):", error);
    }
}


// Ensure DB is initialized before starting the server
initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to initialize database:", error);
        process.exit(1);
    });


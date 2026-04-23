import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import characterRoutes from "./routes/characters";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API Express + TypeScript działa!" });
});

const start = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5001;

        app.listen(PORT, () => {
            console.log(`Serwer działa na porcie ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();

export default app;

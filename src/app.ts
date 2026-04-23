import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./config/db";
import { globalErrorHandler, notFoundHandler } from "./middlewares/error-handler";
import artifactRoutes from "./routes/artifacts";
import characterRoutes from "./routes/characters";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/artifacts", artifactRoutes);
app.use("/api/characters", characterRoutes);

app.get("/", (_req, res) => {
    res.json({ message: "API Express + TypeScript dziala!" });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

const start = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5001;

        app.listen(PORT, () => {
            console.log(`Serwer dziala na porcie ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();

export default app;

import "dotenv/config";
import express from "express";
import connectDB from "./db";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import path from "path";

connectDB();
const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(path.resolve(), "../web/src")));

app.get("/", (_, res) => {
  res.send("Api is running");
});

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});

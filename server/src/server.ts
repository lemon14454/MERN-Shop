import "dotenv/config";
import express from "express";
import connectDB from "./db";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import path from "path";

// import { createProxyMiddleware } from "http-proxy-middleware";

connectDB();
const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

app.get("/", (_, res) => {
  res.send("Api is running");
});

// http-proxy-middleware
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:8080",
//     changeOrigin: true,
//   })
// );

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});

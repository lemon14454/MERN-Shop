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

app.get("/api/config/paypal", (_, res) => res.send(process.env.paypal));

app.use("/uploads", express.static(path.join(path.resolve(), "/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(path.resolve(), "build", "index.html"))
  );
} else {
  app.get("/", (_, res) => {
    res.send("Api is running");
  });
}

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});

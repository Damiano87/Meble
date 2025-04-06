import dotenv from "dotenv";
import express from "express";
import prisma from "./lib/prisma.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import path from "path";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import morgan from "morgan";
import root from "./routes/root.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import ratingsRoutes from "./routes/ratingRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishListRoutes from "./routes/wishListRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const PORT: string | 3500 = process.env.PORT || 3500;

dotenv.config();

console.log(process.env.NODE_ENV);

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

// Serve static files from the "public" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", root);
app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/ratings", ratingsRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishListRoutes);
app.use("/stripe", stripeRoutes);
app.use("/orders", orderRoutes);

// show 404 site if there is no resources
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect MongoDB:", error);
  }
};

checkDatabaseConnection();

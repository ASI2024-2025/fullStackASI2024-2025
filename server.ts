

// ini seperti app.js kalau pakai express js dan sequelize

import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import clientRoutes from "./routes/client";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/clients", clientRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

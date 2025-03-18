"use strict";
// ini seperti app.js kalau pakai express js dan sequelize
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const client_1 = __importDefault(require("./routes/client"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/clients", client_1.default);
const PORT = process.env.PORT || 3000;
database_1.default
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Error: " + err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

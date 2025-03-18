"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MyClient_1 = __importDefault(require("../models/MyClient"));
const redis_1 = __importDefault(require("../config/redis"));
const router = express_1.default.Router();
// Get all clients
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield redis_1.default.get("clients");
        if (cachedData)
            return res.json(JSON.parse(cachedData));
        const clients = yield MyClient_1.default.findAll();
        yield redis_1.default.set("clients", JSON.stringify(clients), "EX", 3600);
        res.json(clients);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Get client by slug
router.get("/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const cachedClient = yield redis_1.default.get(`client:${slug}`);
        if (cachedClient)
            return res.json(JSON.parse(cachedClient));
        const client = yield MyClient_1.default.findOne({ where: { slug } });
        if (!client)
            return res.status(404).json({ error: "Client not found" });
        yield redis_1.default.set(`client:${slug}`, JSON.stringify(client), "EX", 3600);
        res.json(client);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Create client
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClient = yield MyClient_1.default.create(req.body);
        yield redis_1.default.del("clients");
        res.status(201).json(newClient);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Update client
router.put("/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const client = yield MyClient_1.default.findOne({ where: { slug } });
        if (!client)
            return res.status(404).json({ error: "Client not found" });
        yield client.update(req.body);
        yield redis_1.default.del(`client:${slug}`);
        yield redis_1.default.del("clients");
        res.json(client);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Soft delete client
router.delete("/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const client = yield MyClient_1.default.findOne({ where: { slug } });
        if (!client)
            return res.status(404).json({ error: "Client not found" });
        yield client.update({ deleted_at: new Date() });
        yield redis_1.default.del(`client:${slug}`);
        yield redis_1.default.del("clients");
        res.json({ message: "Client deleted (soft delete)" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;

import express, { Request, Response, Router } from "express";
import MyClient from "../models/MyClient";
import redis from "../config/redis";

const router: Router = express.Router();

// Get all clients
router.get("/", async (req: Request, res: Response) => {
  try {
    const cachedData = await redis.get("clients");
    if (cachedData) return res.json(JSON.parse(cachedData));

    const clients = await MyClient.findAll();
    await redis.set("clients", JSON.stringify(clients), "EX", 3600);
    res.json(clients);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get client by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const cachedClient = await redis.get(`client:${slug}`);
    if (cachedClient) return res.json(JSON.parse(cachedClient));

    const client = await MyClient.findOne({ where: { slug } });
    if (!client) return res.status(404).json({ error: "Client not found" });

    await redis.set(`client:${slug}`, JSON.stringify(client), "EX", 3600);
    res.json(client);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create client
router.post("/", async (req: Request, res: Response) => {
  try {
    const newClient = await MyClient.create(req.body);
    await redis.del("clients");
    res.status(201).json(newClient);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update client
router.put("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const client = await MyClient.findOne({ where: { slug } });
    if (!client) return res.status(404).json({ error: "Client not found" });

    await client.update(req.body);
    await redis.del(`client:${slug}`);
    await redis.del("clients");
    res.json(client);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Soft delete client
router.delete("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const client = await MyClient.findOne({ where: { slug } });
    if (!client) return res.status(404).json({ error: "Client not found" });

    await client.update({ deleted_at: new Date() });
    await redis.del(`client:${slug}`);
    await redis.del("clients");
    res.json({ message: "Client deleted (soft delete)" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
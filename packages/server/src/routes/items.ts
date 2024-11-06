import express, { Request, Response } from "express";
import { Item } from "../models/item";
import Items from "../services/item-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Items.index()
    .then((list: Item[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:itemid", (req: Request, res: Response) => {
  const { itemid } = req.params;

  Items.get(itemid)
    .then((item: Item | null) => {
      if (!item) {
        return res.status(404).send(`Wishlist with ID ${itemid} not found`);
      }
      res.json(item);
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newItem = req.body;

  Items.create(newItem)
    .then((item: Item) => res.status(201).json(item))
    .catch((err) => res.status(500).send(err));
});

router.put("/:itemid", (req: Request, res: Response) => {
  const { itemid } = req.params;
  const newItem = req.body;

  Items.update(itemid, newItem)
    .then((item: Item) => res.json(item))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:itemid", (req: Request, res: Response) => {
  const { itemid } = req.params;

  Items.remove(itemid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});
export default router;
import express, { Request, Response } from "express";
import { Wishlist } from "../models/wishlist";
import Wishlists from "../services/wishlist-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Wishlists.index()
    .then((list: Wishlist[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:listid", (req: Request, res: Response) => {
  const { listid } = req.params;

  Wishlists.get(listid)
    .then((wishlist: Wishlist | null) => {
      if (!wishlist) {
        return res.status(404).send(`Wishlist with ID ${listid} not found`);
      }
      res.json(wishlist);
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newWishlist = req.body;

  Wishlists.create(newWishlist)
    .then((wishlist: Wishlist) => res.status(201).json(wishlist))
    .catch((err) => res.status(500).send(err));
});

router.put("/:listid", (req: Request, res: Response) => {
  const { listid } = req.params;
  const newWishlist = req.body;

  Wishlists.update(listid, newWishlist)
    .then((wishlist: Wishlist) => res.json(wishlist))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:listid", (req: Request, res: Response) => {
  const { listid } = req.params;

  Wishlists.remove(listid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;

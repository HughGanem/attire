// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mogo";

import { WishlistPage, ItemPage, WishlistListPage } from "./pages/index";

import Wishlist from "./services/wishlist-svc";
import wishlists from "./routes/wishlists"

import Item from "./services/item-svc";
import items from "./routes/items"

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("dreamin");

app.use(express.static(staticDir));
app.use(express.json());


app.use("/api/wishlists", wishlists);
app.use("/api/items", items);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/wishlists", (req: Request, res: Response) => {
  Wishlist.index()
    .then((data) => {
      console.log(data);
      if (data && data.length > 0) {
        res.set("Content-Type", "text/html").send((new WishlistListPage(data)).render());
      } else {
        res.status(404).send("No wishlists found");
      }
    })
    .catch((err) => {
      console.error("Error fetching wishlists:", err);
      res.status(500).send("Internal Server Error");
    });
});


app.get("/wishlists/:listid", (req: Request, res: Response) => {
  const { listid } = req.params;
  Wishlist.get(listid).then((data) => {
    if (data) {
      res.set("Content-Type", "text/html").send((new WishlistPage(data)).render());
    } else {
        res.status(404).send("Wishlist not found");
    }
  }).catch((err) => {
    console.error("Error fetching wishlist:", err);
    res.status(500).send("Internal Server Error");
    });
});

app.get("/items/:itemid", (req: Request, res: Response) => {
  const { itemid } = req.params;
  Item.get(itemid).then((data) => {
    if (data) {
      res.set("Content-Type", "text/html").send((new ItemPage(data)).render());
    } else {
      res.status(404).send("Item not found");
    }
  }).catch((err) => {
    console.error("Error fetching item:", err);
    res.status(500).send("Internal Server Error");
  });
});
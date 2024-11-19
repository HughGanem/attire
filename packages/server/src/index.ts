// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mogo";

import { WishlistPage, ItemPage, WishlistListPage, LoginPage } from "./pages/index";

import Wishlist from "./services/wishlist-svc";
import Item from "./services/item-svc";

import wishlists from "./routes/wishlists"
import items from "./routes/items"
import auth, { authenticateUser } from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("dreamin");

app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);
app.use("/api/wishlists", authenticateUser, wishlists);
app.use("/api/items", authenticateUser, items);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
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
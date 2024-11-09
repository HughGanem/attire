// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mogo";

import { WishlistPage } from "./pages/wishlist";
import Wishlist from "./services/wishlist-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("dreamin");

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/wishlist/:listid", (req: Request, res: Response) => {
    const { listid } = req.params;
    Wishlist.get(listid).then((data) => {
      if (data) {
        res.set("Content-Type", "text/html").send((new WishlistPage(data)).render());
      } else {
        res.status(404).send("Wishlist not found");
      }
    }).catch((err) => {
      console.error("Error fetching game:", err);
      res.status(500).send("Internal Server Error");
    });
  }
);
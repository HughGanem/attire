// src/index.ts
import express, { Request, Response } from "express";
import { getWishlist } from "./services/wishlist-svc";
import { WishlistPage } from "./pages/wishlist";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get(
  "/wishlist/:listId",
  (req: Request, res: Response) => {
    const { listId } = req.params;
    const data = getWishlist(listId);
    const page = new WishlistPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  }
);
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_mogo = require("./services/mogo");
var import_pages = require("./pages/index");
var import_wishlist_svc = __toESM(require("./services/wishlist-svc"));
var import_item_svc = __toESM(require("./services/item-svc"));
var import_wishlists = __toESM(require("./routes/wishlists"));
var import_items = __toESM(require("./routes/items"));
var import_auth = __toESM(require("./routes/auth"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
(0, import_mogo.connect)("dreamin");
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/wishlists", import_wishlists.default);
app.use("/api/items", import_items.default);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get("/wishlists", (req, res) => {
  import_wishlist_svc.default.index().then((data) => {
    console.log(data);
    if (data && data.length > 0) {
      res.set("Content-Type", "text/html").send(new import_pages.WishlistListPage(data).render());
    } else {
      res.status(404).send("No wishlists found");
    }
  }).catch((err) => {
    console.error("Error fetching wishlists:", err);
    res.status(500).send("Internal Server Error");
  });
});
app.get("/wishlists/:listid", (req, res) => {
  const { listid } = req.params;
  import_wishlist_svc.default.get(listid).then((data) => {
    if (data) {
      res.set("Content-Type", "text/html").send(new import_pages.WishlistPage(data).render());
    } else {
      res.status(404).send("Wishlist not found");
    }
  }).catch((err) => {
    console.error("Error fetching wishlist:", err);
    res.status(500).send("Internal Server Error");
  });
});
app.get("/items/:itemid", (req, res) => {
  const { itemid } = req.params;
  import_item_svc.default.get(itemid).then((data) => {
    if (data) {
      res.set("Content-Type", "text/html").send(new import_pages.ItemPage(data).render());
    } else {
      res.status(404).send("Item not found");
    }
  }).catch((err) => {
    console.error("Error fetching item:", err);
    res.status(500).send("Internal Server Error");
  });
});

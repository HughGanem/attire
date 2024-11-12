"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var wishlists_exports = {};
__export(wishlists_exports, {
  default: () => wishlists_default
});
module.exports = __toCommonJS(wishlists_exports);
var import_express = __toESM(require("express"));
var import_wishlist_svc = __toESM(require("../services/wishlist-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_wishlist_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:listid", (req, res) => {
  const { listid } = req.params;
  import_wishlist_svc.default.get(listid).then((wishlist) => res.json(wishlist)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newWishlist = req.body;
  import_wishlist_svc.default.create(newWishlist).then(
    (wishlist) => res.status(201).json(wishlist)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:listid", (req, res) => {
  const { listid } = req.params;
  const newWishlist = req.body;
  import_wishlist_svc.default.update(listid, newWishlist).then((wishlist) => res.json(wishlist)).catch((err) => res.status(404).send(err).end());
});
router.delete("/:listid", (req, res) => {
  const { listid } = req.params;
  import_wishlist_svc.default.remove(listid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var wishlists_default = router;

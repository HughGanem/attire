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
var items_exports = {};
__export(items_exports, {
  default: () => items_default
});
module.exports = __toCommonJS(items_exports);
var import_express = __toESM(require("express"));
var import_item_svc = __toESM(require("../services/item-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_item_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:itemid", (req, res) => {
  const { itemid } = req.params;
  import_item_svc.default.get(itemid).then((item) => {
    if (!item) {
      return res.status(404).send(`Wishlist with ID ${itemid} not found`);
    }
    res.json(item);
  }).catch((err) => res.status(500).send(err));
});
router.post("/", (req, res) => {
  const newItem = req.body;
  import_item_svc.default.create(newItem).then((item) => res.status(201).json(item)).catch((err) => res.status(500).send(err));
});
router.put("/:itemid", (req, res) => {
  const { itemid } = req.params;
  const newItem = req.body;
  import_item_svc.default.update(itemid, newItem).then((item) => res.json(item)).catch((err) => res.status(404).send(err));
});
router.delete("/:itemid", (req, res) => {
  const { itemid } = req.params;
  import_item_svc.default.remove(itemid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var items_default = router;

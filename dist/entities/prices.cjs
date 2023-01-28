"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entities/prices.ts
var prices_exports = {};
__export(prices_exports, {
  PricesInformation: () => PricesInformation
});
module.exports = __toCommonJS(prices_exports);
var import_mongoose = require("mongoose");
var priceInfo = new import_mongoose.Schema({
  destination: { type: String, required: true },
  price: { type: Number, required: true }
});
var PricesInformation = (0, import_mongoose.model)("priceInfos", priceInfo);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PricesInformation
});

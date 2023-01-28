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

// src/use-cases/PricesController.ts
var PricesController_exports = {};
__export(PricesController_exports, {
  createTablePrice: () => createTablePrice,
  removePriceInfo: () => removePriceInfo,
  showOnePriceInfo: () => showOnePriceInfo,
  showPricesInfo: () => showPricesInfo,
  updatePriceInfo: () => updatePriceInfo
});
module.exports = __toCommonJS(PricesController_exports);

// src/entities/prices.ts
var import_mongoose = require("mongoose");
var priceInfo = new import_mongoose.Schema({
  destination: { type: String, required: true },
  price: { type: Number, required: true }
});
var PricesInformation = (0, import_mongoose.model)("priceInfos", priceInfo);

// src/use-cases/PricesController.ts
var showPricesInfo = async (req, res) => {
  PricesInformation.find((err, data) => {
    if (err) {
      return res.json({ message: `Algo de errado: ${err}` });
    }
    res.json(data);
  });
};
var createTablePrice = async (req, res) => {
  const { destination, price } = req.body;
  const tablePrice = new PricesInformation({
    destination,
    price
  });
  await tablePrice.save();
  res.json({ message: "Tabela de pre\xE7os criada com sucesso!" });
};
var showOnePriceInfo = async (req, res) => {
  const id = req.params.id;
  PricesInformation.findById(id, (err, data) => {
    if (err) {
      res.json({ message: `Algo de errado: ${err}` });
    }
    res.json(data);
  });
};
var updatePriceInfo = async (req, res) => {
  const id = req.params.id;
  const { destination, price } = req.body;
  PricesInformation.findByIdAndUpdate(id, { destination, price }, (err) => {
    if (err) {
      return res.json({ message: `Algo deu errado: ${err}` });
    }
    res.json({ message: "Atualiza\xE7\xE3o feita com sucesso" });
  });
};
var removePriceInfo = async (req, res) => {
  const id = req.params.id;
  PricesInformation.findByIdAndRemove(id, (err) => {
    if (err) {
      return res.json({ message: `Algo deu errado: ${err}` });
    }
    res.json({ message: "Dados removidos com sucesso!" });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTablePrice,
  removePriceInfo,
  showOnePriceInfo,
  showPricesInfo,
  updatePriceInfo
});

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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helpers/verify-token.ts
var verify_token_exports = {};
__export(verify_token_exports, {
  verifyToken: () => verifyToken
});
module.exports = __toCommonJS(verify_token_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = require("dotenv");

// src/helpers/get-token.ts
var getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  return token;
};

// src/helpers/verify-token.ts
(0, import_dotenv.config)();
var verifyToken = (req, res, next) => {
  const secret = process.env.TOKEN_SECRET;
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    const verified = import_jsonwebtoken.default.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Token inv\xE1lido" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyToken
});

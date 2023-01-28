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

// src/helpers/create-user-token.ts
var create_user_token_exports = {};
__export(create_user_token_exports, {
  createUserToken: () => createUserToken
});
module.exports = __toCommonJS(create_user_token_exports);
var import_dotenv = require("dotenv");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
(0, import_dotenv.config)();
var createUserToken = async (user, req, res) => {
  const secret = process.env.TOKEN_SECRET;
  const token = import_jsonwebtoken.default.sign({
    name: user.name,
    id: user._id
  }, secret);
  res.status(200).json({ message: "Usu\xE1rio autenticado com sucesso", token, id: user._id });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUserToken
});

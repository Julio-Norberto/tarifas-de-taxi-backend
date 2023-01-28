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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/config/db.ts
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
import_mongoose.default.set("strictQuery", false);
async function main() {
  const dbuser = process.env.DB_USER;
  const dbpass = process.env.DB_PASS;
  await import_mongoose.default.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.sanr1fc.mongodb.net/?retryWrites=true&w=majority`);
  console.log("Banco de dados conectado com sucesso!");
}
main().catch((err) => console.log(err));

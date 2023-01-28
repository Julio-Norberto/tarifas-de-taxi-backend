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

// src/routes/routes.ts
var routes_exports = {};
__export(routes_exports, {
  userRouter: () => userRouter
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

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

// src/entities/user.ts
var import_mongoose2 = require("mongoose");
var user = new import_mongoose2.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true }
});
var User = (0, import_mongoose2.model)("user", user);

// src/helpers/create-user-token.ts
var import_dotenv = require("dotenv");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
(0, import_dotenv.config)();
var createUserToken = async (user2, req, res) => {
  const secret = process.env.TOKEN_SECRET;
  const token = import_jsonwebtoken.default.sign({
    name: user2.name,
    id: user2._id
  }, secret);
  res.status(200).json({ message: "Usu\xE1rio autenticado com sucesso", token, id: user2._id });
};

// src/helpers/get-token.ts
var getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  return token;
};

// src/use-cases/UserController.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
var import_bcrypt = __toESM(require("bcrypt"), 1);
var createUser = async (req, res) => {
  const { name, login, password, confirmPass } = req.body;
  if (!name || !login || !password || !confirmPass) {
    return res.status(422).json({ message: "Por favor preencha todos os campos" });
  }
  if (password !== confirmPass) {
    return res.status(422).json({ message: "as senhas n\xE3o coincidem" });
  }
  const userExists = await User.findOne({ login });
  if (userExists) {
    return res.status(422).json({ message: "E-mail j\xE1 cadastrado" });
  }
  const salt = await import_bcrypt.default.genSalt(12);
  const passwordHash = await import_bcrypt.default.hash(password, salt);
  const user2 = new User({
    name,
    login,
    password: passwordHash
  });
  try {
    await user2.save();
    res.status(201).json({ message: "usu\xE1rio criado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde..." });
  }
};
var loginUser = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(422).json({ message: "Por favor preencha todos os campos" });
  }
  const user2 = await User.findOne({ login });
  if (!user2) {
    return res.status(404).json({ message: "Este usu\xE1rio n\xE3o existe" });
  }
  const checkPassword = await import_bcrypt.default.compare(password, user2.password);
  if (!checkPassword) {
    return res.status(422).json({ message: "senha ou login inv\xE1lidos" });
  }
  await createUserToken(user2, req, res);
};
var checkUser = async (req, res) => {
  const secret = process.env.TOKEN_SECRET;
  let currentUser;
  if (req.headers.authorization) {
    const token = getToken(req);
    const decoded = import_jsonwebtoken2.default.verify(token, secret);
    currentUser = await User.findById(decoded.id);
    currentUser.password = void 0;
  } else {
    currentUser = null;
  }
  res.status(200).send(currentUser);
};

// src/helpers/verify-token.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"), 1);
var import_dotenv2 = require("dotenv");
(0, import_dotenv2.config)();
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
    const verified = import_jsonwebtoken3.default.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Token inv\xE1lido" });
  }
};

// src/routes/routes.ts
var userRouter = (0, import_express.Router)();
userRouter.get("/", (req, res) => {
  res.send("Ol\xE1, mundo!");
});
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/checkuser", checkUser);
userRouter.get("/prices", showPricesInfo);
userRouter.post("/createPrice", verifyToken, createTablePrice);
userRouter.get("/prices/:id", showOnePriceInfo);
userRouter.patch("/prices/:id", verifyToken, updatePriceInfo);
userRouter.delete("/prices/remove/:id", verifyToken, removePriceInfo);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRouter
});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/vary/index.js
var require_vary = __commonJS({
  "node_modules/vary/index.js"(exports2, module2) {
    "use strict";
    module2.exports = vary;
    module2.exports.append = append;
    var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    function append(header, field) {
      if (typeof header !== "string") {
        throw new TypeError("header argument is required");
      }
      if (!field) {
        throw new TypeError("field argument is required");
      }
      var fields = !Array.isArray(field) ? parse(String(field)) : field;
      for (var j = 0; j < fields.length; j++) {
        if (!FIELD_NAME_REGEXP.test(fields[j])) {
          throw new TypeError("field argument contains an invalid header name");
        }
      }
      if (header === "*") {
        return header;
      }
      var val = header;
      var vals = parse(header.toLowerCase());
      if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
      }
      for (var i = 0; i < fields.length; i++) {
        var fld = fields[i].toLowerCase();
        if (vals.indexOf(fld) === -1) {
          vals.push(fld);
          val = val ? val + ", " + fields[i] : fields[i];
        }
      }
      return val;
    }
    function parse(header) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = header.length; i < len; i++) {
        switch (header.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            list.push(header.substring(start, end));
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      list.push(header.substring(start, end));
      return list;
    }
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});

// node_modules/cors/lib/index.js
var require_lib = __commonJS({
  "node_modules/cors/lib/index.js"(exports2, module2) {
    (function() {
      "use strict";
      var assign = require_object_assign();
      var vary = require_vary();
      var defaults = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
      };
      function isString(s) {
        return typeof s === "string" || s instanceof String;
      }
      function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
          for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
              return true;
            }
          }
          return false;
        } else if (isString(allowedOrigin)) {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        } else {
          return !!allowedOrigin;
        }
      }
      function configureOrigin(options, req) {
        var requestOrigin = req.headers.origin, headers = [], isAllowed;
        if (!options.origin || options.origin === "*") {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: "*"
          }]);
        } else if (isString(options.origin)) {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: options.origin
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        } else {
          isAllowed = isOriginAllowed(requestOrigin, options.origin);
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: isAllowed ? requestOrigin : false
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        }
        return headers;
      }
      function configureMethods(options) {
        var methods = options.methods;
        if (methods.join) {
          methods = options.methods.join(",");
        }
        return {
          key: "Access-Control-Allow-Methods",
          value: methods
        };
      }
      function configureCredentials(options) {
        if (options.credentials === true) {
          return {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          };
        }
        return null;
      }
      function configureAllowedHeaders(options, req) {
        var allowedHeaders = options.allowedHeaders || options.headers;
        var headers = [];
        if (!allowedHeaders) {
          allowedHeaders = req.headers["access-control-request-headers"];
          headers.push([{
            key: "Vary",
            value: "Access-Control-Request-Headers"
          }]);
        } else if (allowedHeaders.join) {
          allowedHeaders = allowedHeaders.join(",");
        }
        if (allowedHeaders && allowedHeaders.length) {
          headers.push([{
            key: "Access-Control-Allow-Headers",
            value: allowedHeaders
          }]);
        }
        return headers;
      }
      function configureExposedHeaders(options) {
        var headers = options.exposedHeaders;
        if (!headers) {
          return null;
        } else if (headers.join) {
          headers = headers.join(",");
        }
        if (headers && headers.length) {
          return {
            key: "Access-Control-Expose-Headers",
            value: headers
          };
        }
        return null;
      }
      function configureMaxAge(options) {
        var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
        if (maxAge && maxAge.length) {
          return {
            key: "Access-Control-Max-Age",
            value: maxAge
          };
        }
        return null;
      }
      function applyHeaders(headers, res) {
        for (var i = 0, n = headers.length; i < n; i++) {
          var header = headers[i];
          if (header) {
            if (Array.isArray(header)) {
              applyHeaders(header, res);
            } else if (header.key === "Vary" && header.value) {
              vary(res, header.value);
            } else if (header.value) {
              res.setHeader(header.key, header.value);
            }
          }
        }
      }
      function cors2(options, req, res, next) {
        var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
        if (method === "OPTIONS") {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureMethods(options, req));
          headers.push(configureAllowedHeaders(options, req));
          headers.push(configureMaxAge(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          if (options.preflightContinue) {
            next();
          } else {
            res.statusCode = options.optionsSuccessStatus;
            res.setHeader("Content-Length", "0");
            res.end();
          }
        } else {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          next();
        }
      }
      function middlewareWrapper(o) {
        var optionsCallback = null;
        if (typeof o === "function") {
          optionsCallback = o;
        } else {
          optionsCallback = function(req, cb) {
            cb(null, o);
          };
        }
        return function corsMiddleware(req, res, next) {
          optionsCallback(req, function(err, options) {
            if (err) {
              next(err);
            } else {
              var corsOptions = assign({}, defaults, options);
              var originCallback = null;
              if (corsOptions.origin && typeof corsOptions.origin === "function") {
                originCallback = corsOptions.origin;
              } else if (corsOptions.origin) {
                originCallback = function(origin, cb) {
                  cb(null, corsOptions.origin);
                };
              }
              if (originCallback) {
                originCallback(req.headers.origin, function(err2, origin) {
                  if (err2 || !origin) {
                    next(err2);
                  } else {
                    corsOptions.origin = origin;
                    cors2(corsOptions, req, res, next);
                  }
                });
              } else {
                next();
              }
            }
          });
        };
      }
      module2.exports = middlewareWrapper;
    })();
  }
});

// src/config/db.ts
var require_db = __commonJS({
  "src/config/db.ts"() {
    "use strict";
    var import_mongoose3 = __toESM(require("mongoose"));
    var import_dotenv3 = require("dotenv");
    (0, import_dotenv3.config)();
    import_mongoose3.default.set("strictQuery", false);
    async function main() {
      const dbuser = process.env.DB_USER;
      const dbpass = process.env.DB_PASS;
      await import_mongoose3.default.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.sanr1fc.mongodb.net/?retryWrites=true&w=majority`);
      console.log("Banco de dados conectado com sucesso!");
    }
    main().catch((err) => console.log(err));
  }
});

// src/index.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require_lib());
var import_db = __toESM(require_db());

// src/routes/routes.ts
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
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
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
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_bcrypt = __toESM(require("bcrypt"));
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
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
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

// src/index.ts
var port = process.env.PORT || 3e3;
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use("/api", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

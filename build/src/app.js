"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dataSource_1 = require("./infraestrutura/config/dataSource");
var jwt = require("jsonwebtoken");
var rotas_1 = __importDefault(require("./apresentacao/rotas"));
var cors = require("cors");
require('dotenv').config();
var corsOptions = {
    origin: ["http://127.0.0.1:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors(corsOptions));
(0, rotas_1.default)(app);
dataSource_1.AppDataSource.initialize().then(function () {
    console.log("Banco de dados conecetado");
})
    .catch(function (erro) {
    console.log(erro);
});
exports.default = app;

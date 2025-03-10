"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./src/app"));
require('dotenv').config();
var PORT = process.env.PORT;
app_1.default.listen(PORT, function () {
    console.log("Servidor executando em http://localhost:".concat(PORT));
});

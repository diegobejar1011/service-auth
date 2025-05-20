"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = require("mysql2");
const config_1 = require("../domain/config");
const conn = (0, mysql2_1.createConnection)(config_1.config);
exports.db = conn.promise();

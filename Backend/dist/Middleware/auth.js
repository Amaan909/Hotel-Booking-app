"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    console.log("verifyToken called");
    const token = req.cookies["auth_token"];
    console.log("Request URL:", req.originalUrl); // Log the URL of the request
    console.log("Cookies from client:", req.cookies);
    if (!token) {
        console.error("No token found in cookies");
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded JWT:", decoded);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.default = verifyToken;

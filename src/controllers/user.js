"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
<<<<<<< HEAD
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
=======
<<<<<<< HEAD
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
=======
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
>>>>>>> c64a6e7c3684835e9aaf7a360504d31c005a30bc
>>>>>>> fb8074fc631379fd465d2cc3f8f2f29ae6a6ebd8
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByUsername = exports.list = exports.login = exports.register = void 0;
var prisma_1 = require("../libs/prisma");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, hasUser, newUser, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.body.username && req.body.password)) return [3 /*break*/, 4];
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: {
                            username: username,
                        },
                    })];
            case 1:
                hasUser = _b.sent();
                if (!!hasUser) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: {
                            username: username,
                            password: password,
                        },
                    })];
            case 2:
                newUser = _b.sent();
                token = jsonwebtoken_1.default.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return [2 /*return*/, res.status(201).json({ id: newUser.id, username: newUser.username, token: token })];
            case 3: return [2 /*return*/, res.status(400).json({ message: "User already exists" })];
            case 4: return [2 /*return*/, res.status(400).json({ message: "Invalid data" })];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.body.username && req.body.password)) return [3 /*break*/, 2];
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                        where: {
                            username: username,
                        },
                    })];
            case 1:
                user = _b.sent();
                if (user) {
                    if (user.password === password) {
                        token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
                        return [2 /*return*/, res.status(200).json({ status: true, token: token })];
                    }
                    else {
                        return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                }
                _b.label = 2;
            case 2: return [2 /*return*/, res.status(400).json({ status: false, message: "Invalid data" })];
        }
    });
}); };
exports.login = login;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.user.findMany()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); };
exports.list = list;
var deleteUserByUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                return [4 /*yield*/, prisma_1.prisma.user.delete({
                        where: {
                            username: username,
                        },
                    })];
            case 1:
                user = _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUserByUsername = deleteUserByUsername;

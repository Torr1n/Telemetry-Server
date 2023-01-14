"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let healthCheck = require("./routes/api/v1/healthcheck");
let upload = require("./routes/api/v1/upload");
let start = require("./routes/api/v1/start");
let download = require("./routes/api/v1/download");
let dashboard = require("./routes/dashboard/home");
const port = 3000;
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
    allowEIO3: true
});
//middleware
app.use(express_1.default.json());
app.use("/public", express_1.default.static(__dirname + '/public'));
let cache = {};
const warmCache = () => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fs.promises.readdir(__dirname + "/runs");
    for (const file of files) {
        // Get the full paths
        const fullPath = path.join(__dirname + "/runs", file);
        let data = yield fs.promises.readFile(fullPath, "utf8");
        cache[file] = { data: [data] };
    }
});
let currentRun = "";
let createRun = (runId) => {
    currentRun = runId;
    fs.writeFileSync(__dirname + "/runs/" + runId + ".csv", "");
    cache[runId + ".csv"] = { data: [] };
};
let appendRun = (data) => {
    fs.appendFileSync(__dirname + "/runs/" + currentRun + ".csv", data);
    cache[currentRun + ".csv"].data.push(data);
    io.emit(currentRun, data);
};
// routes
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/upload", upload(appendRun));
app.use("/api/v1/start", start(createRun));
app.use("/api/v1/download", download(cache));
app.use("/dashboard/home", dashboard);
// websockets
io.on("connection", function (socket) {
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield warmCache();
    console.log(cache);
    server.listen(port, () => console.log(`Server is listening on port ${port}...`));
});
startServer();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const functions = __importStar(require("firebase-functions"));
const nuxt_1 = require("nuxt");
const app = express_1.default();
const nuxt = new nuxt_1.Nuxt({
    dev: false,
    buildDir: "./lib/.nuxt",
    build: {
        publicPath: "/assets/"
    }
});
function handleRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (/\.(js|css)$/.test(req.url)) {
            if (req.url.indexOf("?") > 0) {
                req.url += "&assets=false";
            }
            else {
                req.url += "?assets=false";
            }
        }
        return yield nuxt.render(req, res);
    });
}
app.use(handleRequest);
module.exports = functions.runWith({
    memory: "256MB",
    timeoutSeconds: 20
}).https.onRequest(app);
//# sourceMappingURL=render.js.map
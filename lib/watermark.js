"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watermark = void 0;
var lodash_1 = require("lodash");
var Watermark = /** @class */ (function () {
    function Watermark(targetDom, config) {
        this.renderLock = false;
        this.config = {
            text: 'watermark',
            fontSize: 16,
            rgb: [0, 0, 0],
            rotate: -30,
            opacity: 0.15,
            gapX: 200,
            gapY: 200,
        };
        this.targetDom = targetDom;
        this.config = __assign(__assign({}, this.config), config);
    }
    Watermark.prototype._getCanvasImg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, imgData;
            return __generator(this, function (_a) {
                canvas = document.createElement('canvas', {});
                canvas.width = 2000;
                canvas.height = 2000;
                this.writeText(canvas);
                imgData = canvas.toDataURL('image/png');
                return [2 /*return*/, imgData];
            });
        });
    };
    Watermark.prototype._initDom = function () {
        return __awaiter(this, void 0, void 0, function () {
            var watermarkDom, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        watermarkDom = this.targetDom.querySelector(':scope > .watermark-frame');
                        if (watermarkDom) {
                            watermarkDom === null || watermarkDom === void 0 ? void 0 : watermarkDom.remove();
                        }
                        // 给父元素添加定位
                        if (!this.targetDom.style.position) {
                            this.targetDom.style.position = 'relative';
                        }
                        // 创建canvas块
                        this.watermarkFrame = document.createElement('div');
                        if (!!this.watermarkImg) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this._getCanvasImg()];
                    case 1:
                        _a.watermarkImg = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.watermarkFrame.style = "width:100%;height:100%;position:absolute;top:0;left:0;z-index:9999;pointer-events:none;overflow:hidden;background-repeat:repeat;background-image:url(".concat(this.watermarkImg, ")");
                        this.watermarkFrame.classList.add('watermark-frame');
                        this.targetDom.appendChild(this.watermarkFrame);
                        return [2 /*return*/];
                }
            });
        });
    };
    Watermark.prototype.writeText = function (canvas) {
        var config = this.config;
        if (!this.targetDom)
            return false;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return false;
        var text = config.text;
        ctx.font = "".concat(config.fontSize, "px Arial");
        // 获取文本的宽度
        var metrics = ctx.measureText(text);
        var textWidth = metrics.width;
        var textHeight = 10;
        // 旋转角度（弧度）
        var radian = (config.rotate * Math.PI) / 180;
        // 旋转文本
        ctx.rotate(radian);
        // ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.fillStyle = "rgba(".concat(config.rgb.join(','), ",").concat(config.opacity, ")");
        var numX = (canvas.width * 2) / textWidth;
        var numY = (canvas.height * 2) / textHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < numX; i++) {
            for (var j = 0; j < numY; j++) {
                ctx.fillText(text, 0 - canvas.width + i * textWidth + i * config.gapX, 0 - canvas.height + j * textHeight + j * config.gapY);
            }
        }
        return ctx;
    };
    Watermark.prototype.render = function () {
        var _this = this;
        if (this.renderLock)
            return false;
        console.log('render watermark');
        this.renderLock = true;
        this._initDom();
        setTimeout(function () {
            _this.renderLock = false;
        }, 500);
    };
    Watermark.prototype.start = function () {
        var _this = this;
        this.render();
        var throttleRender = (0, lodash_1.throttle)(function () {
            _this.render();
        }, 1000);
        // 监听DOM变化
        var mObserver = new MutationObserver(function (mutations, observer) {
            var isReRender = mutations.some(function (mutation) {
                if ('childList' == mutation.type && mutation.removedNodes.length > 0) {
                    // 防删
                    return Array.from(mutation.removedNodes).some(function (node) {
                        var d = node;
                        return d.classList && d === _this.watermarkFrame;
                    });
                }
                else if (mutation.type == 'attributes' && mutation.target == _this.watermarkFrame) {
                    // 防隐藏
                    return true;
                }
            });
            if (isReRender) {
                throttleRender();
            }
        });
        mObserver.observe(this.targetDom, {
            attributes: true, childList: true, subtree: true
        });
    };
    return Watermark;
}());
exports.Watermark = Watermark;

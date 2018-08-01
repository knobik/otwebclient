"use strict";
exports.__esModule = true;
var Color = /** @class */ (function () {
    //Color() : m_r(1.0f), m_g(1.0f), m_b(1.0f), m_a(1.0f) { }
    //Color(uint32 rgba) { setRGBA(rgba); }
    function Color() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length == 0) {
            this.m_r = 1;
            this.m_g = 1;
            this.m_b = 1;
            this.m_a = 1;
            return;
        }
        else if (args.length == 1) {
            if (typeof (args[0]) == 'number') {
                this.setRGBA(args[0]);
                return;
            }
        }
        else if (args.length == 3) {
            if (typeof (args[0]) == 'number' && typeof (args[1]) == 'number' && typeof (args[2]) == 'number') {
                var r = args[0] / 255;
                var g = args[1] / 255;
                var b = args[2] / 255;
                this.m_r = r;
                this.m_g = g;
                this.m_b = b;
                this.m_a = 1;
                return;
            }
        }
        throw new Error('Unhandled constructor');
    }
    Color.prototype.equals = function (otherColor) {
        return this.m_r == otherColor.m_r && this.m_g == otherColor.m_g &&
            this.m_b == otherColor.m_b && this.m_a == otherColor.m_a;
    };
    Color.prototype.clone = function () {
        var color = new Color();
        color.m_r = this.m_r;
        color.m_g = this.m_g;
        color.m_b = this.m_b;
        color.m_a = this.m_a;
        return color;
    };
    Color.prototype.a = function () {
        return this.m_a * 255.0;
    };
    Color.prototype.b = function () {
        return this.m_b * 255.0;
    };
    Color.prototype.g = function () {
        return this.m_g * 255.0;
    };
    Color.prototype.r = function () {
        return this.m_r * 255.0;
    };
    Color.prototype.aF = function () {
        return this.m_a;
    };
    Color.prototype.bF = function () {
        return this.m_b;
    };
    Color.prototype.gF = function () {
        return this.m_g;
    };
    Color.prototype.rF = function () {
        return this.m_r;
    };
    Color.prototype.rgba = function () {
        return this.a() | this.b() << 8 | this.g() << 16 | this.r() << 24;
    };
    Color.prototype.setRGBA = function (r, g, b, a) {
        if (g === void 0) { g = -1; }
        if (b === void 0) { b = -1; }
        if (a === void 0) { a = 255; }
        if (g == -1) { // r is rgba
            var rgba = r;
            this.setRGBA((rgba >> 0) & 0xff, (rgba >> 8) & 0xff, (rgba >> 16) & 0xff, (rgba >> 24) & 0xff);
        }
        else {
            this.m_r = r / 255;
            this.m_g = g / 255;
            this.m_b = b / 255;
            this.m_a = a / 255;
        }
    };
    Color.from8bit = function (color) {
        if (color >= 216 || color <= 0)
            return new Color(0, 0, 0);
        var r = parseInt((color / 36).toString()) % 6 * 51;
        var g = parseInt((color / 6).toString()) % 6 * 51;
        var b = color % 6 * 51;
        return new Color(r, g, b);
    };
    Color.alpha = 0x00000000;
    Color.white = 0xffffffff;
    Color.black = 0xff000000;
    Color.red = 0xff0000ff;
    Color.darkRed = 0xff000080;
    Color.green = 0xff00ff00;
    Color.darkGreen = 0xff008000;
    Color.blue = 0xffff0000;
    Color.darkBlue = 0xff800000;
    Color.pink = 0xffff00ff;
    Color.darkPink = 0xff800080;
    Color.yellow = 0xff00ffff;
    Color.darkYellow = 0xff008080;
    Color.teal = 0xffffff00;
    Color.darkTeal = 0xff808000;
    Color.gray = 0xffa0a0a0;
    Color.darkGray = 0xff808080;
    Color.lightGray = 0xffc0c0c0;
    Color.orange = 0xff008cff;
    return Color;
}());
exports.Color = Color;

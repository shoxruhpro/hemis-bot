"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (milliseconds, config) => {
    let options = {
        month: "long",
        day: "numeric",
    };
    if (config === null || config === void 0 ? void 0 : config.year)
        options.year = "numeric";
    else if (config === null || config === void 0 ? void 0 : config.weekday)
        options = { weekday: "long" };
    return new Date(milliseconds * 1000).toLocaleDateString("UZ", options);
};

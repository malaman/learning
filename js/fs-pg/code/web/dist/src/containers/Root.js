"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_redux_1 = require("react-redux");
var DevTools_js_1 = require("./DevTools.js");
var routes_1 = require("../routes");
var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super.apply(this, arguments) || this;
    }
    Root.prototype.render = function () {
        var store = this.props.store;
        return (React.createElement(react_redux_1.Provider, { store: store },
            React.createElement("div", null,
                React.createElement(DevTools_js_1.DevTools, null),
                React.createElement(routes_1.default, null))));
    };
    return Root;
}(React.Component));
exports.Root = Root;
;

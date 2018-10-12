'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactVirtualized = require('react-virtualized');

var _nodeShapes = require('./shapes/nodeShapes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true},
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

var Tree = (function(_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree() {
    var _temp, _this, _ret;

    _classCallCheck(this, Tree);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args)),
      )),
      _this)),
      (_this.rowRenderer = function(nodes) {
        return function(_ref) {
          var key = _ref.key,
            index = _ref.index,
            style = _ref.style;
          var _this$props = _this.props,
            nodeMarginLeft = _this$props.nodeMarginLeft,
            NodeRenderer = _this$props.NodeRenderer;

          var node = nodes[index];

          return _react2.default.createElement(
            'div',
            {
              key: key,
              className: 'tree-node',
              style: _extends({}, style, {marginLeft: node.deepness * nodeMarginLeft}),
            },
            _react2.default.createElement(NodeRenderer, {node: node, onChange: _this.props.onChange}),
          );
        };
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  Tree.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
      nodes = _props.nodes,
      width = _props.width,
      scrollToIndex = _props.scrollToIndex;

    return _react2.default.createElement(_reactVirtualized.AutoSizer, {disableWidth: Boolean(width)}, function(_ref2) {
      var height = _ref2.height,
        autoWidth = _ref2.width;
      return _react2.default.createElement(_reactVirtualized.List, {
        ref: function ref(r) {
          return (_this2._list = r);
        },
        height: height,
        rowCount: nodes.length,
        rowHeight: _this2.props.rowHeight,
        rowRenderer: _this2.rowRenderer(nodes),
        width: width || autoWidth,
        scrollToIndex: scrollToIndex,
      });
    });
  };

  return Tree;
})(_react2.default.Component);

exports.default = Tree;

Tree.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        nodes: _propTypes2.default.arrayOf(_propTypes2.default.shape(_nodeShapes.FlattenedNode)).isRequired,
        NodeRenderer: _propTypes2.default.func.isRequired,
        onChange: _propTypes2.default.func.isRequired,
        nodeMarginLeft: _propTypes2.default.number,
        width: _propTypes2.default.number,
        rowHeight: _propTypes2.default.number,
      }
    : {};
module.exports = exports['default'];

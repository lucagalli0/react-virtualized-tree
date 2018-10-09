'use strict';

exports.__esModule = true;
exports.getRowIndexFromId = exports.addNode = exports.deleteNode = exports.updateNode = exports.deleteNodeFromTree = exports.replaceNodeFromTree = exports.getNodeRenderOptions = exports.getFlattenedTree = undefined;

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

var _getFlattenedTree = require('./getFlattenedTree');

Object.defineProperty(exports, 'getFlattenedTree', {
  enumerable: true,
  get: function get() {
    return _getFlattenedTree.getFlattenedTree;
  },
});

var _reselect = require('reselect');

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _contants = require('../contants');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var getNodeRenderOptions = (exports.getNodeRenderOptions = (0, _reselect.createSelector)(
  function(node) {
    return (node.state || {}).expanded;
  },
  function(node) {
    return (node.state || {}).favorite;
  },
  function(node) {
    return (node.state || {}).deletable;
  },
  function(node) {
    return node.children;
  },
  function(expanded, favorite, deletable) {
    var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    return {
      hasChildren: !!children.length,
      isExpanded: !!expanded,
      isFavorite: !!favorite,
      isDeletable: !!deletable,
    };
  },
));

var FLATTEN_TREE_PROPERTIES = ['deepness', 'parents'];

var NODE_OPERATION_TYPES = {
  CHANGE_NODE: 'CHANGE_NODE',
  DELETE_NODE: 'DELETE_NODE',
};

var NODE_CHANGE_OPERATIONS = {
  CHANGE_NODE: function CHANGE_NODE(nodes, updatedNode) {
    return nodes.map(function(n) {
      return n.id === updatedNode.id ? (0, _lodash2.default)(updatedNode, FLATTEN_TREE_PROPERTIES) : n;
    });
  },
  DELETE_NODE: function DELETE_NODE(nodes, updatedNode) {
    return nodes.filter(function(n) {
      return n.id !== updatedNode.id;
    });
  },
};

var replaceNodeFromTree = (exports.replaceNodeFromTree = function replaceNodeFromTree(nodes, updatedNode) {
  var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NODE_OPERATION_TYPES.CHANGE_NODE;

  if (!NODE_CHANGE_OPERATIONS[operation]) {
    return nodes;
  }

  var parents = updatedNode.parents;

  if (!parents.length) {
    return NODE_CHANGE_OPERATIONS[operation](nodes, updatedNode);
  }

  var parentIndex = nodes.findIndex(function(n) {
    return n.id === parents[0];
  });
  var preSiblings = nodes.slice(0, parentIndex);
  var postSiblings = nodes.slice(parentIndex + 1);

  return [].concat(
    preSiblings,
    [
      _extends(
        {},
        nodes[parentIndex],
        nodes[parentIndex].children
          ? {
              children: replaceNodeFromTree(
                nodes[parentIndex].children,
                _extends({}, updatedNode, {parents: parents.slice(1)}),
                operation,
              ),
            }
          : {},
      ),
    ],
    postSiblings,
  );
});

var deleteNodeFromTree = (exports.deleteNodeFromTree = function deleteNodeFromTree(nodes, deletedNode) {
  return replaceNodeFromTree(nodes, deletedNode, NODE_OPERATION_TYPES.DELETE_NODE);
});

var updateNode = (exports.updateNode = function updateNode(originalNode, newState) {
  return {
    node: _extends({}, originalNode, {
      state: _extends({}, originalNode.state, newState),
    }),
    type: _contants.UPDATE_TYPE.UPDATE,
  };
});

var deleteNode = (exports.deleteNode = function deleteNode(node) {
  return {
    node: node,
    type: _contants.UPDATE_TYPE.DELETE,
  };
});

var addNode = (exports.addNode = function addNode(node) {
  return {
    node: node,
    type: _contants.UPDATE_TYPE.ADD,
  };
});

var getRowIndexFromId = (exports.getRowIndexFromId = function getRowIndexFromId(flattenedTree, id) {
  return flattenedTree.findIndex(function(node) {
    return node.id === id;
  });
});

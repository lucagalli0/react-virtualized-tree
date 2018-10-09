'use strict';

exports.__esModule = true;

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

var isNodeExpanded = function isNodeExpanded(node) {
  return node.state && node.state.expanded;
};
var nodeHasChildren = function nodeHasChildren(node) {
  return node.children && node.children.length;
};

var getFlattenedTree = (exports.getFlattenedTree = function getFlattenedTree(nodes) {
  var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return nodes.reduce(function(flattenedTree, node) {
    var deepness = parents.length;
    var nodeWithHelpers = _extends({}, node, {deepness: deepness, parents: parents});

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      return [].concat(flattenedTree, [nodeWithHelpers]);
    }

    return [].concat(flattenedTree, [nodeWithHelpers], getFlattenedTree(node.children, [].concat(parents, [node.id])));
  }, []);
});

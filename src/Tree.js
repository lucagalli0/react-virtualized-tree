import React from 'react';
import PropTypes from 'prop-types';
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized';

import {FlattenedNode} from './shapes/nodeShapes';

export default class Tree extends React.Component {
  rowRenderer = nodes => ({key, index, style}) => {
    const {nodeMarginLeft, NodeRenderer} = this.props;
    const node = nodes[index];

    return (
      <div key={key} className="tree-node" style={{...style, marginLeft: node.deepness * nodeMarginLeft}}>
        <NodeRenderer node={node} onChange={this.props.onChange} />
      </div>
    );
  };

  render() {
    const {nodes, width, scrollToIndex} = this.props;

    return (
      <AutoSizer disableWidth={Boolean(width)}>
        {({height, width: autoWidth}) => (
          <List
            ref={r => (this._list = r)}
            height={height}
            rowCount={nodes.length}
            rowHeight={this.props.rowHeight}
            rowRenderer={this.rowRenderer(nodes)}
            width={width || autoWidth}
            scrollToIndex={scrollToIndex}
          />
        )}
      </AutoSizer>
    );
  }
}

Tree.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape(FlattenedNode)).isRequired,
  NodeRenderer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  nodeMarginLeft: PropTypes.number,
  width: PropTypes.number,
  rowHeight: PropTypes.number,
};

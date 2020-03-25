import React, { useRef, useState, useEffect } from 'react'
import styles from './index.less'
import { TreeGraph, Graph } from '@antv/g6'

const data = {

  id: 'root',
  label: 'Root',
  isRoot: true,
  children: [
    {
      id: 'SubTreeNode1',
      label: 'subroot1',
      children: [
        {
          id: 'SubTreeNode1.1',
          label: 'subroot1.1',
        }
      ]
    },
    {
      id: 'SubTreeNode2',
      label: 'subroot2',
      children: [
        {
          id: 'SubTreeNode2.1',
          label: 'subroot2.1',
        },
        {
          id: 'SubTreeNode2.2',
          label: 'subroot2.2',
        }
      ]
    }
  ]
};

export default () => {
  const ref = useRef<HTMLDivElement>(null)
  let graph: TreeGraph

  useEffect(() => {
    if(!graph) {
      graph = new TreeGraph({
        container: ref.current || '',
        width: 500,
        height: 500,
        modes: {
          default: [{
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item?.getModel();
              if(data) {
                data.collapsed = collapsed;
              }
              return true;
            }
          }, 'drag-canvas', 'zoom-canvas'],
        },
        // defaultNode: {
        //   type: 'tree-node',
        //   anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
        // },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF'
          }
        },
        layout: {
          type: 'compactBox',
          direction: 'LR',
          nodeSep: 50,
          rankSep: 100,
        },
      })
    }
    graph.data(data)
    graph.render()
    graph.fitView()

  }, [])


  return (
    <div ref={ref}></div>
  );
}

<<<<<<< HEAD
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
=======
import React, { useRef, useEffect } from 'react'
import { TreeGraph } from '@antv/g6'

const data = {
  id: 'root',
  label: 'Root',
  children: [
    {
      id: 'sub1',
      label: 'sub1',
      description: '描述信息',
      children: [
        {
          id: 'sub1.1',
          label: 'sub1.1',
          children: [
            {
              id: 'sub1.1.1',
              label: 'sub1.1.1'
            },
            {
              id: 'sub1.1.2',
              label: 'sub1.1.2'
            }
          ]
        },
        {
          id: 'sub1.2',
          label: 'sub1.2'
        }
      ]
    },
    {
      id: 'sub2',
      label: 'sub2'
    }
  ]
}

export default function App () {
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
  const ref = useRef<HTMLDivElement>(null)
  let graph: TreeGraph

  useEffect(() => {
<<<<<<< HEAD
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
=======
    if (!graph) {
      graph = new TreeGraph({
        container: ref.current || '',
        width: 1200,
        height: 800,
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: d => d.id,
          getWidth: () => 140,
          getVGap: () => 24,
          getHGap: () => 50
        },
        defaultNode: {
          type: 'modelRect',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ],
          style: {
            fill: '#fff',
            stroke: '#f2f2f2',
            shadowBlur: 1,
            shadowColor: '#f2f2f2',
            shadowOffsetX: 1,
            shadowOffsetY: 1
          }
        },
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF'
          }
        },
<<<<<<< HEAD
        layout: {
          type: 'compactBox',
          direction: 'LR',
          nodeSep: 50,
          rankSep: 100,
        },
=======
        modes: {
          default: [
            {
              type: 'collapse-expand',
              trigger: 'click',
              onChange: (item, collapsed) => {
                const data = item?.getModel()
                const group = item?.get('group')
                console.log(group)
                if (data) {
                  data.collapsed = collapsed
                }
                return true
              }
            },
            'drag-canvas',
            'zoom-canvas'
          ]
        }
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
      })
    }
    graph.data(data)
    graph.render()
    graph.fitView()
<<<<<<< HEAD

  }, [])


  return (
    <div ref={ref}></div>
  );
=======
  })

  return (
    <div ref={ref}></div>
  )
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
}

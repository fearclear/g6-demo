import React, { useRef, useEffect } from 'react'
import { TreeGraph } from '@antv/g6'

const data = {
  id: 'root',
  label: 'Root',
  children: [
    {
      id: 'sub1',
      label: 'sub1',
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
  const ref = useRef<HTMLDivElement>(null)
  let graph: TreeGraph

  useEffect(() => {
    if (!graph) {
      graph = new TreeGraph({
        container: ref.current || '',
        width: 1200,
        height: 800,
        layout: {
          type: 'compactBox',
          direction: 'LR'
        },
        // defaultNode: {
        //   size: 26,
        //   anchorPoints: [
        //     [0, 0.5],
        //     [1, 0.5]
        //   ],
        //   style: {
        //     fill: '#C6E5FF',
        //     stroke: '#5B8FF9'
        //   }
        // },
        // defaultEdge: {
        //   type: 'cubic-horizontal',
        //   style: {
        //     stroke: '#A3B1BF'
        //   }
        // },
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
      })
    }
    graph.data(data)
    graph.render()
    graph.fitView()
  })

  return (
    <div ref={ref}></div>
  )
}

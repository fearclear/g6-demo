<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { data } from './data';
import G6 from '@antv/g6';
import { NodeTooltips, EdgeToolTips, NodeContextMenu } from './component'
import './registerShape';

export default function() {
=======
import React, { useEffect, useState } from 'react'
import { data } from './data'
import G6 from '@antv/g6'
import { NodeTooltips, EdgeToolTips, NodeContextMenu } from './component'
import './registerShape'

export default function () {
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
  const ref = React.useRef(null)
  let graph = null

  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = useState(false)
  const [edgeTooltipX, setEdgeTooltipX] = useState(0)
  const [edgeTooltipY, setEdgeTooltipY] = useState(0)

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0)
  const bindEvents = () => {
    // 监听edge上面mouse事件
    graph.on('edge:mouseenter', evt => {
      const { item, target } = evt
      const type = target.get('type')
<<<<<<< HEAD
      if(type !== 'text') {
=======
      if (type !== 'text') {
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
        return
      }
      const model = item.getModel()
      const { endPoint } = model
      // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10
      const y = endPoint.y - 35
      const x = endPoint.x - 150 - 10
      const point = graph.getCanvasByPoint(x, y)
      setEdgeTooltipX(point.x)
      setEdgeTooltipY(point.y)
      setShowEdgeTooltip(true)
    })

    graph.on('edge:mouseleave', () => {
      setShowEdgeTooltip(false)
    })

    // 监听node上面mouse事件
    graph.on('node:mouseenter', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)

      setNodeToolTipX(point.x - 75)
      setNodeToolTipY(point.y + 15)
      setShowNodeTooltip(true)
    })

    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave', () => {
      setShowNodeTooltip(false)
      setShowNodeContextMenu(false)
    })

    // 监听节点上面右键菜单事件
    graph.on('node:contextmenu', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      setNodeContextMenuX(point.x)
      setNodeContextMenuY(point.y)
      setShowNodeContextMenu(true)
<<<<<<< HEAD
=======
      evt.preventDefault()
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
    })
  }

  useEffect(() => {
<<<<<<< HEAD
    if(!graph) {
=======
    if (!graph) {
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
      graph = new G6.Graph({
        container: ref.current,
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas']
        },
        defaultNode: {
<<<<<<< HEAD
          shape: 'node',
=======
          type: 'node',
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          style: {
            stroke: '#72CC4A',
            width: 150
          }
        },
        defaultEdge: {
<<<<<<< HEAD
          shape: 'polyline'
=======
          type: 'polyline'
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          nodesep: 30,
          ranksep: 100
        }
      })
    }

    graph.data(data)

    graph.render()

    const edges = graph.getEdges()
    edges.forEach(edge => {
      const line = edge.getKeyShape()
      const stroke = line.attr('stroke')
      const targetNode = edge.getTarget()
      targetNode.update({
        style: { stroke }
      })
    })
    graph.paint()

    bindEvents()
  }, [])

  return (
    <div ref={ref}>
      { showEdgeTooltip && <EdgeToolTips x={edgeTooltipX} y={edgeTooltipY} /> }
      { showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} /> }
      { showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY} /> }
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
}

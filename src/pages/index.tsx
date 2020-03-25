import React, { useRef, useEffect } from 'react'
import G6, { Graph } from '@antv/g6'
import mockData from './_data'

export interface ListItem {
  id: string
  title: string
  person: string
  department: string
  finishRate: number
  childList?: ListItem[]
}

interface IProps {
  data?: ListItem[]
  config?: any
  onInit?: (instance: any) => void
  nodeClick?: (nodeItem: ListItem) => void
}

interface GraphData {
  nodes: object[]
  edges: object[]
}

const props: IProps = {
  data: mockData,
  config: {
    padding: [20, 50],
    defaultLevel: 3,
    defaultZoom: 0.8,
    modes: { default: ['zoom-canvas', 'drag-canvas'] }
  },
  nodeClick: (item: any) => {
    console.log(item)
  }
}

// 默认配置
const defaultConfig = {
  width: 1600,
  height: 800,
  pixelRatio: 1,
  modes: {
    default: ['zoom-canvas', 'drag-canvas']
  },
  fitView: false,
  animate: true,
  defaultEdge: {
    style: {
      stroke: '#1890FF'
    }
  }
}

// 自定义节点/边
const registerFn = () => {
  /**
   * 自定义节点
   */
  G6.registerNode(
    'flow-react',
    {
      shapeType: 'flow-rect',
      draw (cfg: any, group: any) {
        const {
          lightColor,
          hasChildren,
          finishRate,
          title = '',
          person = '',
          department = '',
          collapsed
        } = cfg

        const rectConfig = {
          width: 184,
          height: 74,
          lineWidth: 1,
          fontSize: 12,
          fill: '#fff',
          radius: 4,
          stroke: lightColor,
          opacity: 1
        }

        const textConfig = {
          textAlign: 'left',
          textBaseLine: 'top'
        }

        // root
        const rect = group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            ...rectConfig
          }
        })

        // label title
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 12,
            y: 8,
            text: title.length > 10 ? title.substr(0, 10) + '...' : title,
            fontSize: 14,
            fill: '#000',
            cursor: 'pointer',
            isTitleShape: true
          }
        })

        // label person
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 12,
            y: 34,
            text: person,
            fontSize: 14,
            fill: '#000'
          }
        })

        // label department
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 12,
            y: 60,
            text: department,
            fontSize: 14,
            fill: '#000'
          }
        })

        // label rate
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 178,
            y: 37,
            text: `${((finishRate || 0) * 100).toFixed(2)}%`,
            fontSize: 14,
            textAlign: 'right',
            fill: lightColor
          }
        })

        // bottom line
        group.addShape('rect', {
          attrs: {
            x: 0,
            y: 70,
            width: rectConfig.width,
            height: 4,
            radius: [0, 0, rectConfig.radius, rectConfig.radius],
            fill: '#DCDFE5'
          }
        })

        // bottom parcent
        group.addShape('rect', {
          attrs: {
            x: 0,
            y: 70,
            width: 100,
            height: 4,
            radius: [0, 0, 0, rectConfig.radius],
            fill: lightColor
          }
        })

        if (hasChildren) {
          group.addShape('circle', {
            attrs: {
              x: rectConfig.width + 6,
              y: rectConfig.height / 2,
              r: 8,
              stroke: lightColor,
              fill: collapsed ? lightColor : '#fff',
              isCollapseShape: true
            }
          })

          group.addShape('text', {
            attrs: {
              x: rectConfig.width + 6,
              y: rectConfig.height / 2,
              width: 16,
              height: 16,
              textAlign: 'center',
              textBaseLine: 'middle',
              text: collapsed ? '#fff' : lightColor,
              cursor: 'pointer',
              isCollapseShape: true
            }
          })
        }
        this.drawLinkPoints(cfg, group)
        return rect
      },
      update (cfg: any, item: any) {
        const group = item.getContainer()
        this.updateLinkPoints(cfg, group)
      },
      setState (name: any, value: any, item: any) {
        if (name === 'click' && value) {
          const group = item.getContainer()
          const { collapsed } = item.getModel()
          const [,,,,,, CircleShape, TextShape] = group.get('children')
          if (TextShape) {
            const {
              attrs: { stroke }
            } = CircleShape
            if (!collapsed) {
              TextShape.attr({
                text: '-',
                fill: stroke
              })
              CircleShape.attr({
                fill: '#fff'
              })
            } else {
              TextShape.attr({
                text: '+',
                fill: '#fff'
              })
              CircleShape.attr({
                fill: stroke
              })
            }
          }
        }
      },
      getAnchorPoints () {
        return [
          [0, 0.5],
          [1, 0.5]
        ]
      }
    },
    'rect'
  )

  G6.registerEdge(
    'flow-cubic',
    {
      getControlPoints (cfg: any) {
        let controlPoints = cfg.controlPoints // 指定controlPoints
        if (!controlPoints || !controlPoints.length) {
          const { startPoint, endPoint, sourceNode, targetNode } = cfg
          const { x: startX, y: startY, coefficientX, coefficientY } = sourceNode ? sourceNode.getModel() : startPoint
          const { x: endX, y: endY } = targetNode ? targetNode.getMoel() : endPoint
          let curveStart = (endX - startX) * coefficientX
          let curveEnd = (endY - startY) * coefficientY
          curveStart = curveStart > 40 ? 40 : curveStart
          curveEnd = curveEnd < -30 ? curveEnd : -30
          controlPoints = [
            { x: startPoint.x + curveStart, y: startPoint.y },
            { x: endPoint.x + curveEnd, y: endPoint.y }
          ]
        }
        return controlPoints
      },
      getPath (points: any) {
        const path = []
        path.push('M', points[0].x, points[0].y)
        path.push([
          'C',
          points[1].x,
          points[1].y,
          points[2].x,
          points[2].y,
          points[3].x,
          points[3].y
        ])
        return path
      }
    },
    'single-line'
  )
}

registerFn()

const { data } = props
let backUpData: any
const maxMatrixY = 0
const isAnimating = false
const graph: Graph

// TODO line452

export default function App () {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}></div>
  )
}

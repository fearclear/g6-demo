import G6, { Graph } from '@antv/g6'
import { _ } from '@/utils'

export interface ListItem {
  id: string;
  name: string;
  person: string;
  department: string;
  finishRate: number;
  childList?: ListItem[];
}

interface SelfProps {
  data?: ListItem[];
  config?: any;
  onInit?: (instance: any) => void;
  nodeClick?: (nodeItem: ListItem) => void;
}

interface GraphData {
  nodes: object[];
  edges: object[];
}

const props: SelfProps = {
  data: [],
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

/**
 * 快捷方法
 * 由于绘图渲染大量数据，所以有些方法不采用lodash中的方法，加快渲染速度
 */
function toString (v: number): string {
  return v + ''
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
const registerFn = (): void => {
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
          name = '',
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
            text: name.length > 10 ? name.substr(0, 10) + '...' : name,
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
          const { x: endX, y: endY } = targetNode ? targetNode.getModel() : endPoint
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
let maxMatrixY = 0
let backUpData: any
let isAnimating = false
export let graph: Graph

/**
 * 获取keys，展开时使用
 */
function getKeys (data: ListItem[], keys: string[]): void {
  if (!data || !data.length) {
    return
  }
  data.forEach(item => {
    const { id } = item
    const children = _.get(item, 'childList', [])
    keys.push(id)
    if (children.length) {
      getKeys(children, keys)
    }
  })
}

/**
 * 创建提示
 * @param {postion} 鼠标点击的位置
 * @param {name} string 节点名称
 * @param {id} string 节点id
 */
function createTooltip (position: {x: number; y: number}, name: string, id: string): void {
  const offsetTop = -60
  const existTooltip = document.getElementById(id)
  const x = position.x + 'px'
  const y = position.y + offsetTop + 'px'
  if (existTooltip) {
    existTooltip.style.left = x
    existTooltip.style.top = y
  } else {
    // content
    const tooltip = document.createElement('div')
    const span = document.createElement('span')
    span.textContent = name
    tooltip.style.padding = '10px'
    tooltip.style.background = 'rgba(0, 0, 0, 0.65)'
    tooltip.style.color = '#fff'
    tooltip.style.borderRadius = '4px'
    tooltip.appendChild(span)
    // box
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.zIndex = '99'
    div.id = id
    div.style.left = x
    div.style.top = y
    div.appendChild(tooltip)
    document.body.appendChild(div)
  }
}

/**
 * 删除提示
 * @param {id} string
 */
function removeTooltip (id: string): void {
  const removeNode = document.getElementById(id)
  if (removeNode) {
    document.body.removeChild(removeNode)
  }
}

/**
 * 生成初始化数据，为了动画
 */
function initAnimateData (data: any[], graphData: GraphData): void {
  if (!data || !data.length) {
    return
  }
  data.forEach(item => {
    const children = _.get(item, 'childList', [])
    const collapsed = _.get(item, 'collapsed')
    const { ...model } = item
    graphData.nodes.push(model)
    if (children.length && !collapsed) {
      initAnimateData(_.get(item, 'childList', []), graphData)
    }
  })
}

/**
 * 递归
 */

function recursion (
  data: any[],
  parentMatrixX: number,
  graphData: GraphData,
  parentId?: string,
  parentX?: number,
  parentY?: number,
  parentAnimate?: string
): void {
  if (!data || !data.length) {
    return
  }
  const {
    config: { padding = [20, 20], nodesMargin = [250, 100], coefficient = [0.2, -0.1] }
  } = props

  data.forEach((item, index) => {
    const matrixX = parentMatrixX || 0
    const children = _.get(item, 'childList', [])
    const animate = _.get(item, 'animate', false)
    const afterDrawHidden = _.get(item, 'afterDrawHidden', false)
    const collapsed = _.get(item, 'collapsed')
    maxMatrixY = index === 0 || afterDrawHidden ? maxMatrixY : maxMatrixY + 1

    const currentX =
      afterDrawHidden || parentAnimate === 'expand'
        ? parentX
        : matrixX * nodesMargin[0] + padding[0]
    const currentY =
      afterDrawHidden || parentAnimate === 'expand'
        ? parentY
        : maxMatrixY * nodesMargin[1] + padding[1]

    item = {
      ...item,
      matrixX,
      matrixY: maxMatrixY,
      x: currentX,
      y: currentY,
      type: 'flow-rect',
      coefficientX: coefficient[0],
      coefficientY: coefficient[1],
      hasChildren: children.length,
      collapsed: item.collapsed || false
    }
    data[index] = item
    const { ...model } = item
    graphData.nodes.push(model)

    if (parentId) {
      graphData.edges.push({
        source: parentId,
        target: toString(item.id),
        targetAnchor: 0,
        srouceAnchor: 1,
        type: index === 0 ? 'line' : 'flow-cubic'
      })
    }

    if ((children.length && animate) || (children.length && !collapsed)) {
      recursion(
        children,
        afterDrawHidden ? matrixX : matrixX + 1,
        graphData,
        toString(item.id),
        currentX,
        currentY,
        animate
      )
    }
  })
}

/**
 * 展开时的特殊处理
 */
function recursionExpand (
  data: any[],
  parentMatrixX: number,
  graphData: GraphData,
  parentX?: number,
  parentY?: number,
  parentAnimate?: string
): void {
  if (!data || !data.length) {
    return
  }
  data.forEach((item, index) => {
    const matrixX = parentMatrixX || 0
    const children = _.get(item, 'childList', [])
    const animate = _.get(item, 'animate', false)
    const afterDrawHidden = _.get(item, 'afterDrawHidden', false)
    const collapsed = _.get(item, 'collapsed')
    const currentX = parentAnimate === 'expand' ? parentX : item.x
    const currentY = parentAnimate === 'expand' ? parentY : item.y

    item = {
      ...item,
      id: toString(item.id),
      x: currentX,
      y: currentY,
      hasChildren: children.length
    }

    data[index] = item
    const { ...model } = item
    graphData.nodes.push(model)

    if ((children.length && animate) || (children.length && !collapsed)) {
      recursionExpand(
        children,
        afterDrawHidden ? matrixX : matrixX + 1,
        graphData,
        currentX,
        currentY,
        animate
      )
    }
  })
}

/**
 * 计算位置
 * @param {data} Array<Item>
 * @param {flag} string[] | string
 * @param {position} Object
 */
function getPosition (data: ListItem[] | undefined, init?: boolean): GraphData {
  maxMatrixY = 0
  const graphData: GraphData = {
    nodes: [],
    edges: []
  }

  if (!data) {
    return graphData
  }
  if (init) {
    initAnimateData(data, graphData)
  } else {
    recursion(data, 0, graphData)
  }

  return graphData
}

/**
 * 计算位置(额外展开)
 */
function getExpandPosition (data: ListItem[] |undefined): GraphData {
  maxMatrixY = 0
  const graphData = {
    nodes: [],
    edges: []
  }

  if (!data) {
    return graphData
  }

  recursionExpand(data, 0, graphData)

  return graphData
}

/**
 * 数据转换，生成图表数据
 */
function transformData (data: any[], parentIndex?: string): void {
  if (!data || !data.length) {
    return
  }
  const {
    config: { defaultLevel = 10, padding = [20, 20] }
  } = props
  data.forEach((item, index) => {
    const { status, finishRate } = item
    const children = _.get(item, 'childList', [])
    const recordIndex = _.isUndefined(parentIndex) ? `${parentIndex}-${index}` : toString(index)
    maxMatrixY = index === 0 ? maxMatrixY : maxMatrixY + 1
    const recordLength = recordIndex.split('-').length
    const childrenKeys: string[] = []
    if (children.length) {
      getKeys(children, childrenKeys)
    }
    let lightColor: string
    if (status === 'I') {
      lightColor = '#DCDFE5'
    } else {
      lightColor = finishRate >= 0.95 ? '#1890FF' : '#EB2F96'
    }
    item = {
      ...item,
      lightColor,
      id: toString(item.id),
      x: padding[0],
      y: padding[1],
      recordIndex,
      collapsed: recordLength >= defaultLevel,
      hasChildren: children.length,
      childrenKeys
    }
    data[index] = item
    if (children.length) {
      transformData(_.get(item, 'childList', []), recordIndex)
    }
  })
}

/**
 * 更新当前数据的collapse状态以及子节点的afterDrawHidden状态
 * @param {id} string
 * @param {recordIndex} string 节点索引
 * @param {collapsed} boolean
 */
function updateCollapsedStatus (id: string, recordIndex: string, collapsed: boolean, animate?: string): void {
  let currentList: any = backUpData
  try {
    let currentRecord: any
    const indexs = recordIndex.split('-')
    for (let i = 0; i < indexs.length; i++) {
      currentRecord = currentList[indexs[i]]
      currentList = currentList[indexs[i]].childList
    }
    currentRecord.collapsed = !collapsed
    currentRecord.animate = animate
    const setHidden = (data: any[]): void => {
      if (!data || !data.length) {
        return
      }
      data.forEach((item, index) => {
        const children = _.get(item, 'childList', [])
        data[index] = {
          ...item,
          afterDrawHidden: !collapsed
        }
        if (children.length && !item.collapsed) {
          setHidden(children)
        }
      })
    }
    setHidden(currentList)
  } catch (error) {
    console.error(error, id, currentList)
  }
}

const initEvent = (): void => {
  graph.on('node: click', async (evt: any) => {
    if (isAnimating) {
      return
    }
    const { item, target } = evt
    const {
      attrs: { isCollapseShape }
    } = target
    if (isCollapseShape) {
      isAnimating = true
      const model = item.getModel()
      graph.setItemState(item, 'click', true)
      const { childrenKeys, id, collapsed, recordIndex } = model
      if (collapsed) {
        updateCollapseStatus(id, recordIndex, collapsed, 'expand')
        graph.changeData(getExpandPosition(backUpData))
        graph.stopAnimate()
        childrenKeys.forEach(async (key: string) => {
          const childrenItem = graph.findById(key)
          if (childrenItem) {
            childrenItem.toBack()
          }
        })
        updateCollapseStatus(id, recordIndex, collapsed)
        graph.changeData(getPosition(backUpData))
        // FIXME sleep(500)
        graph.setItemState(item, 'click', false)
        isAnimating = false
      } else {
        updateCollapseStatus(id, recordIndex, collapsed, 'collapsed')
        graph.changeData(getPosition(backUpData))
        childrenKeys.forEach(async (key: string) => {
          const childrenItem = graph.findById(key)
          if (childrenItem) {
            childrenItem.toBack()
          }
        })
        // FIXME sleep(500)
        updateCollapseStatus(id, recordIndex, collapsed)
        childrenKeys.forEach(async (key: string) => {
          const childrenItem = graph.findById(key)
          if (childrenItem) {
            graph.remove(childrenItem)
          }
        })
        graph.setItemState(item, 'click', false)
        isAnimating = false
      }
    } else {
      const { nodeClick } = props
      if (typeof nodeClick === 'function') {
        nodeClick(item.getModel())
      }
    }
  })

  graph.on('node: mouseenter', (evt: any) => {
    const node = evt.item
    graph.setItemState(node, 'hover', true)
    graph.updateItem(node, {
      style: {
        ...node._cfg.originStyle,
        shadowColor: '#bbb',
        shadowBlur: 6
      }
    })
  })

  graph.on('node: mousemove', (evt: any) => {
    if (isAnimating) {
      return
    }
    const { item, target, x, y } = evt
    const {
      attrs: { isTitleShape }
    } = target
    const model = item.getModel()
    const { name, id } = model
    if (isTitleShape) {
      const postion = graph.getClientByPoint(x, y)
      createTooltip(postion, name, id)
    } else {
      removeTooltip(id)
    }
  })

  graph.on('node: mouseout', (evt: any) => {
    if (isAnimating) {
      return
    }
    const { item, target } = evt
    const {
      attrs: { isTitleShape }
    } = target
    const model = item.getModel()
    const { id } = model
    if (isTitleShape) {
      removeTooltip(id)
    }
  })

  graph.on('node: mouseleave', (evt: any) => {
    const node = evt.item
    graph.setItemState(node, 'hover', false)
    graph.updateItem(node, {
      style: {
        ...node._cfg.originStyle,
        shadowColor: 'transparent',
        shadowBlur: 0
      }
    })
  })
}

export function initGraph (container: HTMLDivElement, data?: ListItem[]): void{
  if (!data?.length) {
    return
  }
  transformData(data)
  const { onInit, config } = props
  graph = new G6.Graph({
    container: container,
    ...defaultConfig,
    ...config
  })

  initEvent()
  // if (typeof onInit === 'function') {
  //   onInit(graph)
  // }

  // backUpData = JSON.parse(JSON.stringify(data))
  // graph.data(getPosition(data, true))
  // graph.render()
  // graph.zoom(config.defaultZoom || 1)
  // if (data?.length) {
  //   console.log(backUpData, 'back')
  //   graph.changeData(getPosition(backUpData))
  // }
}

<<<<<<< HEAD
import React, { useEffect } from 'react';
import { Button } from 'antd'
import G6 from '@antv/g6';
=======
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import G6 from '@antv/g6'
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1

const treeData = {
  id: 'root',
  label: 'Root',
  children: [
    {
      id: 'SubTreeNode1',
      label: 'subroot1',
      children: [
        {
          id: 'SubTreeNode1.1',
<<<<<<< HEAD
          label: 'subroot1.1',
=======
          label: 'subroot1.1'
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
        }
      ]
    },
    {
      id: 'SubTreeNode2',
      label: 'subroot2',
      children: [
        {
          id: 'SubTreeNode2.1',
<<<<<<< HEAD
          label: 'subroot2.1',
        },
        {
          id: 'SubTreeNode2.2',
          label: 'subroot2.2',
=======
          label: 'subroot2.1'
        },
        {
          id: 'SubTreeNode2.2',
          label: 'subroot2.2'
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
        }
      ]
    }
  ]
<<<<<<< HEAD
};
=======
}
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1

const TreeGraphReact = () => {
  const ref = React.useRef(null)
  let graph = null

  useEffect(() => {
<<<<<<< HEAD
    if(!graph) {

=======
    if (!graph) {
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
      graph = new G6.TreeGraph({
        container: ref.current,
        width: 500,
        height: 500,
        modes: {
          default: ['drag-canvas']
        },
        defaultEdge: {
<<<<<<< HEAD
          shape: 'cubic-horizontal',
=======
          type: 'cubic-horizontal',
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
          style: {
            stroke: '#A3B1BF'
          }
        },
        defaultNode: {
<<<<<<< HEAD
          shape: 'rect',
=======
          type: 'rect',
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
        layout: {
          type: 'dendrogram', // 布局类型
<<<<<<< HEAD
          direction: 'LR',    // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
          nodeSep: 50,      // 节点之间间距
          rankSep: 200      // 每个层级之间的间距
=======
          direction: 'LR', // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
          nodeSep: 50, // 节点之间间距
          rankSep: 200 // 每个层级之间的间距
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
        }
      })
    }
    graph.data(treeData)
    graph.render()
  }, [])

  const handleChangeData = () => {
    const node = graph.findById('SubTreeNode1')
    graph.updateItem(node, {
      label: 'xxx',
      style: {
        fill: 'red'
      }
    })
  }

  return (
    <div ref={ref}>
      <Button onClick={handleChangeData} type='primary'>更新数据源</Button>
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
}

export default TreeGraphReact

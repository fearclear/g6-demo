import React from 'react'
import { Timeline } from 'antd'
import 'antd/es/timeline/style/css'
import styles from './index.css'
const NodeToolTips = ({ x, y }) => {
  return (
<<<<<<< HEAD
    <div className={styles.nodeTooltips} style={{ top: `${y}px`, left: `${x}px`}}>
=======
    <div className={styles.nodeTooltips} style={{ top: `${y}px`, left: `${x}px` }}>
>>>>>>> d33dfd7aac5a6085bff900ab0ccc89165716eef1
      <Timeline>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
    </div>
  )
}

export default NodeToolTips

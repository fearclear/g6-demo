import React, { useRef, useEffect } from 'react'
import { decisionTree, mockData } from '@/utils'

export default function App (): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    console.log(decisionTree.graph)
    if (!decisionTree.graph) {
      decisionTree.initGraph(ref.current, mockData)
    } else {

    }
    setTimeout(() => {
      console.log(decisionTree.graph)
      decisionTree.graph.data(mockData)
    }, 3000)
  }, [])
  return (
    <div ref={ref}></div>
  )
}

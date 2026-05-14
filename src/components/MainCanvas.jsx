import React, { useCallback, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import './MainCanvas.css'
import { INITIAL_NODES, INITIAL_EDGES } from '../data/flowData.js'
import FlowNode from './FlowNode.jsx'

const nodeTypes = { flowNode: FlowNode }

export default function MainCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES)

  const onConnect = useCallback(
    params => setEdges(eds => addEdge({
      ...params,
      style: { stroke: '#e8c84a', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#e8c84a' },
    }, eds)),
    [setEdges]
  )

  const onDragOver = useCallback(e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const onDrop = useCallback(e => {
    e.preventDefault()
    const type = e.dataTransfer.getData('nodeType')
    if (!type) return
    const bounds = e.currentTarget.getBoundingClientRect()
    const position = { x: e.clientX - bounds.left - 60, y: e.clientY - bounds.top - 20 }
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'flowNode',
      position,
      data: { label: type.toUpperCase(), shape: type },
    }
    setNodes(nds => [...nds, newNode])
  }, [setNodes])

  return (
    <div className="canvas-wrapper">
      <div className="canvas-label">FLOWCHART_VIEWER</div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode="Delete"
        style={{ background: 'transparent' }}
      >
        <Background color="#ffffff0a" gap={22} size={1} />
        <Controls
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--bdr)',
            borderRadius: 0,
          }}
        />
        <MiniMap
          style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}
          nodeColor="#e8c84a44"
          maskColor="#0a0b0dcc"
        />
      </ReactFlow>
    </div>
  )
}

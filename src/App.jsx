import React, { useState, useCallback, useRef } from 'react'
import TopNavBar       from './components/TopNavBar.jsx'
import SidebarToolbox  from './components/SidebarToolbox.jsx'
import MainCanvas      from './components/MainCanvas.jsx'
import RightSplitPanel from './components/RightSplitPanel.jsx'
import { INITIAL_CPP, INITIAL_ASM, INITIAL_CONSOLE } from './data/codeSnippets.js'
import './App.css'

export default function App() {
  const [filename,    setFilename]    = useState('noname.cpp')
  const [cppCode,     setCppCode]     = useState(INITIAL_CPP)
  const [asmCode,     setAsmCode]     = useState(INITIAL_ASM)
  const [consoleLogs, setConsoleLogs] = useState(INITIAL_CONSOLE)
  const [isCompiling, setIsCompiling] = useState(false)
  const [buildStatus, setBuildStatus] = useState('VISUAL')
  const [ramUsage,    setRamUsage]    = useState('64K')
  const [sidebarW,    setSidebarW]    = useState(150)
  const [rightW,      setRightW]      = useState(window.innerWidth * 0.38)
  const [fontSize,    setFontSize]    = useState(11)

  const bodyRef = useRef(null)

  const changeFontSize = (delta) => setFontSize(f => Math.max(8, Math.min(18, f + delta)))

  const startResize = useCallback((side) => (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startW = side === 'left' ? sidebarW : rightW
    const onMove = (mv) => {
      const delta = mv.clientX - startX
      if (side === 'left') {
        setSidebarW(Math.max(100, Math.min(400, startW + delta)))
      } else {
        setRightW(Math.max(250, Math.min(800, startW - delta)))
      }
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [sidebarW, rightW])

  const handleCompile = useCallback(() => {
    if (isCompiling) return
    setIsCompiling(true)
    setBuildStatus('BUILD')
    const buildLines = [
      { type: 'warn', text: 'COMPILING...' },
      { type: 'info', text: `g++ -O2 -o program ${filename}` },
      { type: 'info', text: 'nasm -f elf64 out.asm' },
      { type: 'info', text: 'ld out.o -o program' },
      { type: 'info', text: `ejecutar con "./program"` },
    ]
    setConsoleLogs([{ type: 'warn', text: `> BUILD START · ${filename}` }])
    let i = 0
    const iv = setInterval(() => {
      setConsoleLogs(buildLines.slice(0, i + 1))
      i++
      if (i >= buildLines.length) {
        clearInterval(iv)
        setTimeout(() => {
          setConsoleLogs([
            ...buildLines,
            { type: 'ok',   text: '[OK] build finished in 0.42s' },
            { type: 'ok',   text: 'OUTPUT: 0 1 2 3 4' },
            { type: 'info', text: '> _' },
          ])
          setIsCompiling(false)
          setBuildStatus('RUN_OK')
          setRamUsage(Math.round(64 + Math.random() * 32) + 'K')
        }, 350)
      }
    }, 220)
  }, [isCompiling, filename])

  return (
    <div className="app-layout">
      <TopNavBar
        filename={filename}
        setFilename={setFilename}
        onCompile={handleCompile}
        isCompiling={isCompiling}
        buildStatus={buildStatus}
        ramUsage={ramUsage}
        fontSize={fontSize}
        onFontSize={changeFontSize}
      />
      <div className="app-body" ref={bodyRef} style={{ '--fs-base': `${fontSize}px` }}>
        <SidebarToolbox width={sidebarW} />
        <div className="resize-handle" onMouseDown={startResize('left')} />
        <MainCanvas />
        <div className="resize-handle" onMouseDown={startResize('right')} />
        <RightSplitPanel
          width={rightW}
          fontSize={fontSize}
          cppCode={cppCode}
          asmCode={asmCode}
          consoleLogs={consoleLogs}
        />
      </div>
    </div>
  )
}
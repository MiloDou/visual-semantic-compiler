import React, { useState, useCallback } from 'react'
import TopNavBar      from './components/TopNavBar.jsx'
import SidebarToolbox from './components/SidebarToolbox.jsx'
import MainCanvas     from './components/MainCanvas.jsx'
import RightSplitPanel from './components/RightSplitPanel.jsx'
import { INITIAL_CPP, INITIAL_ASM, INITIAL_CONSOLE } from './data/codeSnippets.js'
import './App.css'

export default function App() {
  const [filename, setFilename]       = useState('noname.cpp')
  const [cppCode,  setCppCode]        = useState(INITIAL_CPP)
  const [asmCode,  setAsmCode]        = useState(INITIAL_ASM)
  const [consoleLogs, setConsoleLogs] = useState(INITIAL_CONSOLE)
  const [isCompiling, setIsCompiling] = useState(false)
  const [buildStatus, setBuildStatus] = useState('VISUAL')
  const [ramUsage,    setRamUsage]    = useState('64K')

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
      />
      <div className="app-body">
        <SidebarToolbox />
        <MainCanvas />
        <RightSplitPanel
          cppCode={cppCode}
          asmCode={asmCode}
          consoleLogs={consoleLogs}
        />
      </div>
    </div>
  )
}

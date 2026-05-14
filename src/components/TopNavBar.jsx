import React, { useState, useEffect } from 'react'
import './TopNavBar.css'

export default function TopNavBar({
  filename, setFilename,
  onCompile, isCompiling,
  buildStatus, ramUsage
}) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTime([d.getHours(), d.getMinutes(), d.getSeconds()]
        .map(n => String(n).padStart(2, '0')).join(':'))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const btnLabel = isCompiling ? '⏳ COMPILING...'
    : buildStatus === 'RUN_OK' ? '✓ COMPILED'
    : '▶ COMPILE_RUN'

  const btnClass = `compile-btn ${isCompiling ? 'compiling' : ''} ${buildStatus === 'RUN_OK' ? 'success' : ''}`

  return (
    <nav className="topnav">
      <div className="topnav-left">
        <div className="app-logo">
          <div className="logo-sq">C</div>
          <span className="app-name">CYBER_DRIVE</span>
        </div>
        <div className="nav-menus">
          {['FILE', 'EDIT', 'VIEW'].map(m => (
            <button key={m} className="menu-btn">{m}</button>
          ))}
          <button className="menu-btn debug-tab">DEBUG</button>
        </div>
      </div>

      <div className="topnav-center">
        <input
          className="filename-input"
          value={filename}
          onChange={e => setFilename(e.target.value)}
          spellCheck={false}
        />
        <button className={btnClass} onClick={onCompile} disabled={isCompiling}>
          {btnLabel}
        </button>
      </div>

      <div className="topnav-right">
        <span className="stat-pill">RAM: <b>{ramUsage}</b></span>
        <span className="stat-pill">DISK: <b>720K</b></span>
        <span className="stat-pill">NODE: <b>{buildStatus}</b></span>
        <span className="stat-pill time">{time}</span>
        <button className="icon-btn" title="Settings">⚙</button>
        <button className="icon-btn" title="Display">▣</button>
        <button className="icon-btn" title="Help">?</button>
      </div>
    </nav>
  )
}

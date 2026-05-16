import React from 'react'
import Editor from '@monaco-editor/react'
import './RightSplitPanel.css'

const MONACO_OPTIONS = {
  readOnly: true,
  minimap: { enabled: false },
  lineHeight: 18,
  fontFamily: "'Share Tech Mono', 'Courier New', monospace",
  scrollBeyondLastLine: false,
  renderLineHighlight: 'none',
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 },
  lineNumbers: 'on',
  glyphMargin: false,
  folding: false,
  padding: { top: 6, bottom: 6 },
}

const MONACO_THEME = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword',   foreground: 'c084fc' },
    { token: 'type',      foreground: '4ade80' },
    { token: 'identifier',foreground: '86efac' },
    { token: 'string',    foreground: 'f0abfc' },
    { token: 'number',    foreground: 'a5f3fc' },
    { token: 'comment',   foreground: '166534', fontStyle: 'italic' },
    { token: 'delimiter', foreground: '86efac' },
    { token: 'tag',       foreground: '86efac' },
  ],
  colors: {
    'editor.background':           '#080d0a',
    'editor.foreground':           '#86efac',
    'editorLineNumber.foreground': '#166534',
    'editorCursor.foreground':     '#a855f7',
    'editor.selectionBackground':  '#4c1d9566',
    'editorIndentGuide.background':'#ffffff0a',
  },
}

function beforeMount(monaco) {
  monaco.editor.defineTheme('cyber', MONACO_THEME)
}

export default function RightSplitPanel({ cppCode, asmCode, consoleLogs, width, fontSize }) {
  return (
    <div className="right-panel" style={{ width, minWidth: width }}>
      <div className="panel-hdr">
        <span className="panel-title">■ CODE_OUT.SRC</span>
        <div className="panel-dot" />
      </div>
      <div className="code-viewer">
        <div className="code-col">
          <div className="col-hdr">C++</div>
          <div className="col-body">
            <Editor
              height="100%"
              language="cpp"
              value={cppCode}
              theme="cyber"
              beforeMount={beforeMount}
              options={{ ...MONACO_OPTIONS, fontSize }}
            />
          </div>
        </div>
        <div className="col-divider" />
        <div className="code-col">
          <div className="col-hdr">ASSEMBLER</div>
          <div className="col-body">
            <Editor
              height="100%"
              language="asm"
              value={asmCode}
              theme="cyber"
              beforeMount={beforeMount}
              options={{ ...MONACO_OPTIONS, fontSize }}
            />
          </div>
        </div>
      </div>
      <div className="console-panel">
        <div className="panel-hdr">
          <span className="panel-title">■ ECHO_TERMINAL</span>
          <span className="panel-sub">TTY1</span>
        </div>
        <div className="console-body">
          {consoleLogs.map((line, i) => (
            <div key={i} className={`con-line con-${line.type}`}>
              <span className="con-prompt">&gt;</span>
              <span>{line.text}</span>
            </div>
          ))}
          <span className="con-cursor" />
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import Editor from '@monaco-editor/react'
import './RightSplitPanel.css'

const MONACO_OPTIONS = {
  readOnly: true,
  minimap: { enabled: false },
  fontSize: 11,
  lineHeight: 18,
  fontFamily: "'Courier New', monospace",
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
    { token: 'keyword',         foreground: '569cd6' },
    { token: 'type',            foreground: '4ec9b0' },
    { token: 'identifier',      foreground: 'd4d8e0' },
    { token: 'string',          foreground: 'ce9178' },
    { token: 'number',          foreground: 'b5cea8' },
    { token: 'comment',         foreground: '6a9955', fontStyle: 'italic' },
    { token: 'delimiter',       foreground: 'd4d8e0' },
    { token: 'tag',             foreground: 'dcdcaa' },
  ],
  colors: {
    'editor.background':           '#0a0b0d',
    'editor.foreground':           '#d4d8e0',
    'editorLineNumber.foreground': '#4a5568',
    'editorCursor.foreground':     '#e8c84a',
    'editor.selectionBackground':  '#1a4fa066',
    'editorIndentGuide.background':'#ffffff0a',
  },
}

function beforeMount(monaco) {
  monaco.editor.defineTheme('cyber', MONACO_THEME)
}

export default function RightSplitPanel({ cppCode, asmCode, consoleLogs }) {
  return (
    <div className="right-panel">
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
              options={MONACO_OPTIONS}
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
              options={MONACO_OPTIONS}
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

import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';

import { Buffer } from 'buffer';
import process from 'process';
import './CodeEditor.css';

window.process = window.process || process;
window.Buffer = window.Buffer || Buffer;

interface EditorProps {
  value: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const onChangeHandler: OnChange = (
    value: string | undefined,
    e: editor.IModelContentChangedEvent
  ) => {
    if (value) {
      onChange(value);
    }
  };
  const onMountHandler: OnMount = async (
    editor: editor.IStandaloneCodeEditor,
    monaco
  ) => {
    const { default: traverse } = await import('@babel/traverse');
    const { parse } = await import('@babel/parser');
    const { default: MonacoJSXHighlighter } = await import(
      'monaco-jsx-highlighter'
    );

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      parse,
      traverse,
      editor
    );

    monacoJSXHighlighter.highlightOnDidChangeModelContent();
    monacoJSXHighlighter.addJSXCommentCommand();
  };
  const formatCodeHandler = () => {
    const formattedValue = prettier
      .format(value, {
        parser: 'babel',
        plugins: [parserBabel],
        singleQuote: true,
      })
      .replace(/\n$/, '');
    onChange(formattedValue);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button is-primary is-small"
        onClick={formatCodeHandler}
      >
        Format
      </button>
      <Editor
        value={value}
        onMount={onMountHandler}
        onChange={onChangeHandler}
        options={{
          wordWrap: 'on',
          minimap: {
            enabled: false,
          },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          showUnused: false,
        }}
        theme="vs-dark"
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </div>
  );
};
export default CodeEditor;

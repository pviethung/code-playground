import bundle from 'bundle/bundle';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import './CodeCell.css';
import CellToolbar from './CellToolbar';

const CodeCell = () => {
  const [input, setInput] = useState('const a = 1;');
  const [bundledCode, setBundledCode] = useState('');
  const [bundledError, setBundledError] = useState('');

  useEffect(() => {
    const timeOutID = setTimeout(async () => {
      const result = await bundle(input);
      setBundledCode(result.code);
      setBundledError(result.error);
    }, 1000);

    return () => clearTimeout(timeOutID);
  }, [input]);

  return (
    <div className="code-cell-wrapper">
      <CellToolbar />
      <Resizable axis="y">
        <div className="cell-wrapper">
          <Resizable axis="x">
            <CodeEditor value={input} onChange={(value) => setInput(value)} />
          </Resizable>
          <div className="iframe-wrapper">
            <Preview bundledCode={bundledCode} bundledError={bundledError} />
          </div>
        </div>
      </Resizable>
    </div>
  );
};
export default CodeCell;

import bundle from 'bundle/bundle';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import './CodeCell.css';

const CodeCell = () => {
  const [input, setInput] = useState('const a = 1;');
  const [bundledCode, setBundledCode] = useState('');

  useEffect(() => {
    const timeOutID = setTimeout(async () => {
      const result = await bundle(input);
      setBundledCode(result);
    }, 1000);

    return () => clearTimeout(timeOutID);
  }, [input]);

  return (
    <Resizable axis="y">
      <div className="cell-wrapper">
        <Resizable axis="x">
          <CodeEditor value={input} onChange={(value) => setInput(value)} />
        </Resizable>
        <div className="iframe-wrapper">
          <Preview bundledCode={bundledCode} />
        </div>
      </div>
    </Resizable>
  );
};
export default CodeCell;

import bundle from 'bundle/bundle';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

const CodeCell = () => {
  const [input, setInput] = useState('const a = 1;');
  const [bundledCode, setBundledCode] = useState('');

  useEffect(() => {
    const timeOutID = setTimeout(async () => {
      const result = await bundle(input);
      setBundledCode(result);
    }, 2000);

    return () => clearTimeout(timeOutID);
  }, [input]);

  return (
    <>
      <CodeEditor value={input} onChange={(value) => setInput(value)} />
      <Preview bundledCode={bundledCode} />
    </>
  );
};
export default CodeCell;

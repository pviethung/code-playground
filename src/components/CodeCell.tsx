import React, { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import './CodeCell.css';
import CellActionBar from './CellActionBar';
import { BundleState, Cell } from 'store/state';
import { useAppActions, useAppSelector } from 'hooks';

const CodeCell = ({ id, content }: Cell) => {
  const { bundle, updateCell } = useAppActions();
  const bundleResult = useAppSelector(({ bundle }) => bundle) as BundleState;
  let time = 3000;
  if (!bundleResult[id]) {
    time = 0;
  }

  const inputChangeHandler = (input: string) => {
    return updateCell(id, input);
  };

  useEffect(() => {
    const timeOutID = setTimeout(async () => {
      console.log('start bundle', time);

      return bundle(id, content);
    }, time);

    return () => clearTimeout(timeOutID);
  }, [bundle, id, content, time]);

  return (
    <div className="code-cell-wrapper">
      <CellActionBar id={id} />
      <Resizable axis="y">
        <div className="cell-wrapper">
          <Resizable axis="x">
            <CodeEditor value={content} onChange={inputChangeHandler} />
          </Resizable>
          <div className="iframe-wrapper">
            {(bundleResult[id]?.code || bundleResult[id]?.error) && (
              <Preview
                bundledCode={bundleResult[id]?.code}
                bundledError={bundleResult[id]?.error}
              />
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};
export default CodeCell;

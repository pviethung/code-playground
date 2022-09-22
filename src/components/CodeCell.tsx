import bundle from 'bundle/bundle';
import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import './CodeCell.css';
import CellActionBar from './CellActionBar';
import { Cell } from 'store/state';
import { useAppActions } from 'hooks/useAppActions';
import { useAppSelector } from 'hooks/useAppSelector';

const CodeCell = ({ id, content }: Cell) => {
  const { bundle, updateCell } = useAppActions();
  const code = useAppSelector(({ bundle }) => bundle);

  const inputChangeHandler = (input: string) => {
    updateCell(id, input);
  };

  console.log('[code ', code);
  console.log('[content ', content);

  useEffect(() => {
    const timeOutID = setTimeout(async () => {
      console.log('[start bundle]');
      bundle(id, content);
    }, 1000);

    return () => clearTimeout(timeOutID);
  }, [bundle, id, content]);

  return (
    <div className="code-cell-wrapper">
      <CellActionBar id={id} />
      <Resizable axis="y">
        <div className="cell-wrapper">
          <Resizable axis="x">
            <CodeEditor value={content} onChange={inputChangeHandler} />
          </Resizable>
          <div className="iframe-wrapper">
            {/* <Preview bundledCode={bundledCode} bundledError={bundledError} /> */}
          </div>
        </div>
      </Resizable>
    </div>
  );
};
export default CodeCell;

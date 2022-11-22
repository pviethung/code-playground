import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import CellActionBar from './CellActionBar';
import './TextEditor.css';

const TextEditor = ({ id }: { id: string }) => {
  const [value, setValue] = useState('**Click outside to collaspe**');
  const [editing, setEditing] = useState(true);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!editorRef.current?.contains(event.target as Node)) {
        setEditing(false);
      }
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

  const previewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setEditing(true);
  };

  return (
    <div className={`text-editor ${editing && 'editing'}`}>
      <CellActionBar id={id} />
      {editing ? (
        <div ref={editorRef}>
          <MDEditor value={value} onChange={(value) => setValue(value || '')} />
        </div>
      ) : (
        <div className="text-editor-preview" onClick={(e) => previewClick(e)}>
          <MDEditor.Markdown className="card card-content" source={value} />
        </div>
      )}
    </div>
  );
};
export default TextEditor;

import React, { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { TextFormatType } from 'lexical';

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    code: false,
  });

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setFormats({
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        underline: selection.hasFormat('underline'),
        code: selection.hasFormat('code'),
      });
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => updateToolbar());
    });
  }, [editor, updateToolbar]);

  const formatButtons: { type: TextFormatType; label: string }[] = [
    { type: 'bold', label: 'B' },
    { type: 'italic', label: 'I' },
    { type: 'underline', label: 'U' },
    { type: 'code', label: '</>' },
  ];

  return (
    <div className="toolbar">
      {formatButtons.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, type)}
          className={formats[type as keyof typeof formats] ? 'active' : ''}
          aria-label={type}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ToolbarPlugin;

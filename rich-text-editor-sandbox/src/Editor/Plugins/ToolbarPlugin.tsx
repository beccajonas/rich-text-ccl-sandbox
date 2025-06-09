import React, { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
    $isListNode,
  } from '@lexical/list';
  
import type { TextFormatType } from 'lexical';


const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    code: false,
    orderedList: false,
    unorderedList: false,
  });

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getTopLevelElementOrThrow();
      const listType = $isListNode(element) ? element.getListType() : null;
  
      setFormats({
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        underline: selection.hasFormat('underline'),
        code: selection.hasFormat('code'),
        orderedList: listType === 'number',
        unorderedList: listType === 'bullet',
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
  
      <button
        onClick={() => {
          if (formats.orderedList) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }
        }}
        className={formats.orderedList ? 'active' : ''}
        aria-label="ordered list"
      >
        OL
      </button>
  
      <button
        onClick={() => {
          if (formats.unorderedList) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }
        }}
        className={formats.unorderedList ? 'active' : ''}
        aria-label="unordered list"
      >
        UL
      </button>
    </div>
  );
}  

export default ToolbarPlugin;

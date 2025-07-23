import React, { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ListButtons from './ToolbarButtons/ListButtons'; 
import TextFormatButtons from './ToolbarButtons/TextFormatButtons';

import { $isListNode } from '@lexical/list';

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    code: false,
    orderedList: false,
    unorderedList: false,
    highlight: false
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
        highlight: selection.hasFormat('highlight'),
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
  
  
  return (
    <div className="toolbar">
     <TextFormatButtons activeFormats={formats} />
     <ListButtons
        orderedListActive={formats.orderedList}
        unorderedListActive={formats.unorderedList}
     />
    </div>
  );
}  

export default ToolbarPlugin;

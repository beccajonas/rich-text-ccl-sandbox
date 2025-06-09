import React, { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';


import './editor.css';


const theme = {
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    code: 'editor-text-code',
    underline: 'editor-text-underline'
  },
};

function onError(error: Error): void {
  console.error(error);
}

const SaveHtmlPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const saveHtml = () => {
    editor.getEditorState().read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      console.log('Editor HTML:', htmlString);
      // You can also store this in localStorage or send to server
      // localStorage.setItem('editorContent', htmlString);
    });
  };

  return (
    <button onClick={saveHtml} className="save-button">
      Save as HTML
    </button>
  );
};

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const bold = selection.hasFormat('bold');
      const italic = selection.hasFormat('italic');
      const code = selection.hasFormat('code');
      const underline = selection.hasFormat('underline');

      const selectedText = selection.getTextContent();
      if (selectedText.length > 0) {
        console.log(`Text highlighted: "${selectedText}"`);
      }
    
      setIsBold(bold);
      setIsItalic(italic);
      setIsCode(code);
      setIsUnderline(underline);
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  return (
    <div className="toolbar">
      <button
        onClick={() => {
          console.log('Bold button clicked');
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={isBold ? 'active' : ''}
        aria-label="Bold"
      >
        B
      </button>
      <button
        onClick={() => {
          console.log('Italic button clicked');
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={isItalic ? 'active' : ''}
        aria-label="Italic"
      >
        I
      </button>
      <button
        onClick={() => {
          console.log('Underline button clicked');
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={isUnderline ? 'active' : ''}
        aria-label="Underline"
      >
        U
      </button>
      <button
        onClick={() => {
          console.log('Code button clicked');
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
        className={isCode ? 'active' : ''}
        aria-label="Code"
      >
        {'</>'}
      </button>
    </div>
  );
};


const Editor: React.FC = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="editor-input"
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      
      <HistoryPlugin />
      <AutoFocusPlugin />
      <SaveHtmlPlugin /> {/* Add this line */}
    </LexicalComposer>
  );
};

export default Editor;

import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

const SaveHtmlPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const saveHtml = () => {
    editor.getEditorState().read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      console.log('Editor HTML:', htmlString);
    });
  };

  return (
    <button onClick={saveHtml} className="save-button">
      Save as HTML
    </button>
  );
};

export default SaveHtmlPlugin;

import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import ToolbarPlugin from './Plugins/ToolbarPlugin';
import SaveHtmlPlugin from './Plugins/SaveHTMLPlugin';
import theme from './Config/Theme';
import { onError } from './Config/ErrorHandler';
import '../Editor/Editor.css';

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
        contentEditable={<ContentEditable className="editor-input" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <SaveHtmlPlugin />
    </LexicalComposer>
  );
};

export default Editor;

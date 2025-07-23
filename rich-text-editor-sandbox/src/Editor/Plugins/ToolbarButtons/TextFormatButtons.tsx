// TextFormatButtons.tsx

import React from 'react';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type FormatType = 'bold' | 'italic' | 'underline' | 'code' | 'highlight';

type TextFormatButtonsProps = {
  activeFormats: Record<FormatType, boolean>;
};

const TextFormatButtons: React.FC<TextFormatButtonsProps> = ({ activeFormats }) => {
  const [editor] = useLexicalComposerContext();

  const formatButtons: { type: FormatType; label: string }[] = [
    { type: 'bold', label: 'B' },
    { type: 'italic', label: 'I' },
    { type: 'underline', label: 'U' },
    { type: 'code', label: '</>' },
    { type: 'highlight', label: 'Highlight' },
  ];

  return (
    <>
      {formatButtons.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, type)}
          className={activeFormats[type] ? 'active' : ''}
          aria-label={type}
        >
          {label}
        </button>
      ))}
    </>
  );
};

export default TextFormatButtons;

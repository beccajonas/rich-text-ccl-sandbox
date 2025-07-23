import React from 'react';
import { 
  INSERT_ORDERED_LIST_COMMAND, 
  INSERT_UNORDERED_LIST_COMMAND, 
  REMOVE_LIST_COMMAND 
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type ListButtonProps = {
  orderedListActive: boolean;
  unorderedListActive: boolean;
};

const ListButtons: React.FC<ListButtonProps> = ({ orderedListActive, unorderedListActive }) => {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <button
        onClick={() => {
          if (orderedListActive) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }
        }}
        className={orderedListActive ? 'active' : ''}
        aria-label="ordered list"
      >
        OL
      </button>

      <button
        onClick={() => {
          if (unorderedListActive) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }
        }}
        className={unorderedListActive ? 'active' : ''}
        aria-label="unordered list"
      >
        UL
      </button>
    </>
  );
};

export default ListButtons;

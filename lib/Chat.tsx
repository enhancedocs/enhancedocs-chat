import { useState } from 'react';
import useCustomTheme from './hooks/use-custom-theme';
import useKeyDown from './hooks/use-key-down';
import { classNames } from './helpers/styles';
import CloseIcon from './components/icons/CloseIcon';
import MagicIcon from './components/icons/MagicIcon';
import ChatPopover from './components/chat-popover/ChatPopover';
import classes from './Chat.module.css';
import './global.css';

export type Config = {
  projectId: string;
  accessToken: string;
  apiBaseURL?: string;
}

export type Theme = {
  primaryColor?: string;
}

export type ChatProps = {
  config: Config;
  theme?: Theme;
  size?: 'small' | 'middle' | 'large';
  shape?: 'square' | 'round';
}

export default function Chat ({
  config,
  theme,
  size = 'middle',
  shape = 'round'
}: ChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleChatPopover() {
    setIsOpen((prevOpen) => !prevOpen);
  }

  useCustomTheme(theme);
  useKeyDown('h', toggleChatPopover);

  return (
    <>
      <button
        aria-label="Chat"
        className={
          classNames(
            classes.EnhancedChat,
            classes[`EnhancedChat__${size}`],
            classes[`EnhancedChat__${shape}`]
          )
        }
        onClick={toggleChatPopover}
      >
        {isOpen ? <CloseIcon /> : <MagicIcon />}
      </button>
      <ChatPopover
        config={config}
        isOpen={isOpen}
        onClose={toggleChatPopover}
      />
    </>
  );
}

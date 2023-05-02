import { ReactNode, useState } from 'react';
import useCustomTheme from './hooks/use-custom-theme';
import useKeyDown from './hooks/use-key-down';
import { classNames } from './helpers/styles';
import MagicIcon from './components/icons/MagicIcon';
import RobotIcon from './components/icons/RobotIcon';
import HelpIcon from './components/icons/HelpIcon';
import ChatIcon from './components/icons/ChatIcon';
import SmilyChatIcon from './components/icons/SmilyChatIcon';
import ChatPopover from './components/chat-popover/ChatPopover';
import classes from './Chat.module.css';
import './global.css';

const icons = {
  magic: MagicIcon,
  robot: RobotIcon,
  help: HelpIcon,
  chat: ChatIcon,
  smilyChat: SmilyChatIcon
};

export type Config = {
  projectId: string;
  accessToken: string;
  apiBaseURL?: string;
}

export type Theme = {
  primaryColor?: string;
  botName?: string;
  logo?: ReactNode;
}

export type ChatProps = {
  config: Config;
  theme?: Theme;
  size?: 'small' | 'middle' | 'large';
  shape?: 'square' | 'round';
  icon?: 'magic' | 'robot' | 'help' | 'chat' | 'smilyChat';
}

export default function Chat ({
  config,
  size = 'middle',
  shape = 'round',
  icon = 'chat',
  theme
}: ChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = icons[icon] || MagicIcon;

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
            classes[`EnhancedChat__${shape}`],
            isOpen && classes.EnhancedChat__Hidden,
            !isOpen && classes.EnhancedChat__Visible
          )
        }
        onClick={toggleChatPopover}
      >
        <Icon />
      </button>
      <ChatPopover
        config={config}
        theme={theme}
        isOpen={isOpen}
        onClose={toggleChatPopover}
      />
    </>
  );
}

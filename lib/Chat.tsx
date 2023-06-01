import {useEffect, useState} from 'react';
import mixpanel from 'mixpanel-browser';
import useCustomTheme from './hooks/use-custom-theme';
import { classNames } from './helpers/styles';
import MagicIcon from './components/icons/MagicIcon';
import RobotIcon from './components/icons/RobotIcon';
import HelpIcon from './components/icons/HelpIcon';
import ChatIcon from './components/icons/ChatIcon';
import SmilyChatIcon from './components/icons/SmilyChatIcon';
import ChatPopover from './components/chat-popover';
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
  telemetryDisabled?: boolean;
}

export type Theme = {
  primaryColor?: string;
  botName?: string;
  logo?: { src: string, alt?: string };
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

  useEffect(() => {
    if (!config.telemetryDisabled) {
      const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
      const token = isDev ? '4c52247f066a41858fdb60e2ca5a8cfc' : '9b06d52b4a508ae7602e58852ea63562';
      mixpanel.init(token, { debug: isDev });
    }
  }, []);

  useCustomTheme(theme);

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
      {
        typeof window !== 'undefined' && (
          <ChatPopover
            config={config}
            theme={theme}
            isOpen={isOpen}
            onClose={toggleChatPopover}
          />
        )
      }
    </>
  );
}

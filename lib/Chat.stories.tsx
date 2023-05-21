import { useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Chat from './Chat';
import { renderChat } from './render-chat';

const ENHANCED_CONFIG = {
  projectId: '646a4e6158de6ee4ab3076cd',
  accessToken: 'pk_919329ca3f52aeae4ba58aa1021f4a63eba7454d54ca86c7'
};

export default {
  title: 'Chat',
  component: Chat
} as ComponentMeta<typeof Chat>;

const Template: ComponentStory<typeof Chat> = (args) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  function toggleMode() {
    if (currentTheme == 'light') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      setCurrentTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      setCurrentTheme('light');
    }
  }

  return (
    <div>
      <div>
        {currentTheme} theme
        <button onClick={toggleMode} style={{ marginLeft: 8, marginBottom: 32, cursor: 'pointer' }}>
          {currentTheme == 'light' ? '🌝' : '🌚'}
        </button>
      </div>
      <Chat {...args} />
    </div>
  );
};

export const EnhancedChat = Template.bind({});
EnhancedChat.args = {
  config: ENHANCED_CONFIG
};

export const CustomTheme = Template.bind({});
CustomTheme.args = {
  config: ENHANCED_CONFIG,
  theme: {
    primaryColor: '#009485',
    botName: 'Bob',
    logo: {
      src: '/chatgpt-logo.png',
      alt: 'ChatGPT Logo'
    }
  }
};

export const RenderChat = () => {
  useEffect(() => {
    const props = { config: ENHANCED_CONFIG };
    renderChat('chat', props);
  }, []);

  return <div id="chat"></div>;
};

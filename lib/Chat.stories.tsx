import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Chat from './Chat';

const ENHANCED_CONFIG = {
  projectId: '642c2d009557653a6d46cdda',
  accessToken: 'pk_c237abe4951408b069e6482ad7b4214ea7ce6901bf699dbe'
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
    primaryColor: '#bdbe22'
  }
};

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
}

export default function Chat ({ config, theme }: ChatProps) {
  return (
    <>
      Chat
    </>
  );
}

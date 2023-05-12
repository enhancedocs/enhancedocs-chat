import { createRoot } from 'react-dom/client';
import Chat from './Chat';
import type { ChatProps } from './Chat';

export function loadScript (src: string, onLoadCallback: () => void) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onLoadCallback;
  document.head.appendChild(script);
}

export function appendGlobalStyles (href: string) {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = href || 'https://unpkg.com/enhancedocs-chat/dist/style.css';
  document.head.appendChild(linkElement);
}

export function renderChat (elementId: string, props: ChatProps) {
  const domNode = document.getElementById(elementId);

  if (domNode) {
    const root = createRoot(domNode);
    root.render(<Chat {...props} />);

    return root;
  }
}

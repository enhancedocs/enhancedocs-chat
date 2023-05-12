<h1 align="center" style="margin-top: 32px">
  <a href="https://enhancedocs.com">
    <img src="./public/logo-enhance-docs-small.png?raw=true" alt="EnhanceDocs">
  </a>
</h1>

<div align="center">

  [![npm version](https://img.shields.io/npm/v/enhancedocs-chat.svg)](https://www.npmjs.com/package/enhancedocs-chat)
  [![Downloads](https://img.shields.io/npm/dm/enhancedocs-chat.svg)](https://www.npmjs.com/package/enhancedocs-chat)
  [![License: MIT](https://img.shields.io/badge/license-Apache--2.0-yellow)](https://www.apache.org/licenses/LICENSE-2.0)
  [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/enhancedocs.svg?style=social&label=Follow%20%40EnhanceDocs)](https://twitter.com/langchainai)
  [![](https://dcbadge.vercel.app/api/server/AUDa3KZavw?compact=true&style=flat)](https://discord.com/invite/AUDa3KZavw)

</div>

# EnhanceDocs Chat

## 📦 Installing

### Package manager

Using npm:

```bash
npm install enhancedocs-chat
```

Using yarn:

```bash
yarn add enhancedocs-chat
```

## 🚀 Usage

### Getting Started

First you will need to create a project and a public key (`pk_`) in our [Discord Channel](https://discord.com/invite/AUDa3KZavw).
Then you can install the package and start using it 🎉🎉

Use your public key to enable the **EnhanceDocs chat** powered by AI:

```js
import EnhancedChat from 'enhancedocs-chat';

import 'enhancedocs-chat/dist/style.css';

<EnhancedChat
  config={{
    projectId: "abc123", // <your-project-id>
    accessToken: "pk_abc123" // <your-access-token>
  }}
  {...props}
/>
```

### Usage via script

Use the Chat component in any project, not just React.
Load the CSS via style tag, refer to an element by id in your HTML and load EnhanceDocs script using a CDN for NPM:

- **unpkg**: `https://unpkg.com/enhancedocs-chat@1.0.0/dist/enhancedocs-chat.umd.js`
- **jsdelivr**: `https://cdn.jsdelivr.net/npm/enhancedocs-chat@1.0.0/dist/enhancedocs-chat.umd.js`

**NOTE**: You will need to load peer dependencies `react` and `react-dom`.

```html
<link href="https://unpkg.com/enhancedocs-chat@1.0.0/dist/style.css" rel="stylesheet">

<script>
  document.addEventListener('DOMContentLoaded', () => {
    function loadScript(src, onLoadCallback) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = onLoadCallback;
      document.head.appendChild(script);
    }

    function initEnhanceDocsChat() {
      EnhancedocsChat.renderChat('enhancedocs-chat', {
        config: {
          projectId: 'abc123', // <your-project-id>
          accessToken: 'pk_abc123' // <your-access-token>
        }
        // ...props
      });
    }

    loadScript('https://unpkg.com/react@18/umd/react.production.min.js', () => {
      loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', () => {
        loadScript('https://unpkg.com/enhancedocs-chat@1.0.0/dist/enhancedocs-chat.umd.js', initEnhanceDocsChat);
      });
    });
  })
</script>

<div id="enhancedocs-chat"></div>
```

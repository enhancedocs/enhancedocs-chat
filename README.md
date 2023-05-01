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

Use your public key to enable the **enhanced chat** powered by AI:

```js
import EnhancedChat from 'enhancedocs-chat';

import 'enhancedocs-chat/dist/style.css';

<EnhancedChat
  config={{
    projectId: "abc123",
    accessToken: "pk_abc123"
  }}
  {...props}
/>
```

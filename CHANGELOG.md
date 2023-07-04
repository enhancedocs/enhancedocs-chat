# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.1.8] - 2023-07-04

- 🐞 Markdown pre with nested code background color.

## [1.1.7] - 2023-07-03

- 🐞 Markdown HTML tags color overriding.

## [1.1.6] - 2023-06-30

- 🐞 Markdown `code` and `pre` overflow-x auto.

## [1.1.5] - 2023-06-29

- 🐞 Markdown `code` and `pre` font styling.

## [1.1.4] - 2023-06-01

- 🐞 if process is not defined assume is prod.

## [1.1.3] - 2023-05-30

- 🐞 Markdown inline/block `<code>` styling.

## [1.1.2] - 2023-05-27

- 🆕 Add mixpanel
- 🆕 Add support to disable telemetry

## [1.1.1] - 2023-05-25

- 🐞 Handle URLs from sources which have sub paths

## [1.1.0] - 2023-05-21

- 🆕 Display answer sources links.
- 🆕 Full screen mode.
- 🛠 API improvements `X-EnhanceDocs-Version: 1.0` using `threadId`.

## [1.0.0] - 2023-05-12

- 🆕 Render chat documentation and helpers.
- 🆕 Set global style `--base-color` when customising `theme.primaryColor` to improve primary variations.
- 🐞 Support for `theme.logo` in any project. From ReactNode to object to be used without using JSX.

## [0.1.3] - 2023-05-09

- 🛠 Build: Rollup Node Polyfills.

## [0.1.2] - 2023-05-09

- 🛠 Build: Added named export and specific fileName `{format}.js`.

## [0.1.1] - 2023-05-09

- 🆕 `loadScript` and `renderChat` utilities to use Chat component in any JS project ([#10](https://github.com/enhancedocs/enhancedocs-chat/issues/10)).
- 🛠 Build: Vitejs with ReactDOM as external/global and remove named export.

## [0.1.0] - 2023-05-08

- 🆕 Answer feedback UX/UI ([#8](https://github.com/enhancedocs/enhancedocs-chat/issues/8)).

## [0.0.12] - 2023-05-05

- 🐞 Floating button SVG width/height.

## [0.0.11] - 2023-05-02

- 🐞 Filter initial history item without mutating original history list.

## [0.0.10] - 2023-05-02

- 🆕 Get enhanced answers as stream ([#2](https://github.com/enhancedocs/enhancedocs-chat/issues/2)).

## [0.0.9] - 2023-05-02

- 🆕 Use chat history to get enhanced answers ([#4](https://github.com/enhancedocs/enhancedocs-chat/issues/4)).

## [0.0.8] - 2023-05-02

- 🐞 Popover z-index.
- 🐞 Popover min height.

## [0.0.7] - 2023-05-02

- 🐞 Check if code is running client side.
- 🐞 Popover fixed height.

## [0.0.6] - 2023-05-02

- 🛠 Create React Portal for ChatPopover.
- 🐞 Add `Suspense` with `lazy`.

## [0.0.5] - 2023-05-02

- 🐞 Remove `Suspense`.

## [0.0.4] - 2023-05-02

- 🐞 Remove `crypto`.

## [0.0.3] - 2023-05-02

- 🐞 Floating button sizes.
- 🐞 Chat popover content max height.
- 🐞 Chat popover footer class names naming.

## [0.0.2] - 2023-05-02

- 🆕 Float button that opens chat popover ([#3](https://github.com/enhancedocs/enhancedocs-chat/issues/3)).
- 🆕 Basic history rendering ([#3](https://github.com/enhancedocs/enhancedocs-chat/issues/3)).
- 🆕 Theme `logo` and theme `botName`.

## [0.0.1] - 2023-05-01

- 🛠 Project scaffolding ([#1](https://github.com/enhancedocs/enhancedocs-chat/issues/1)).

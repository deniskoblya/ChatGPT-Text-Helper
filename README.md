# ChatGPT Text Helper Chrome Extension

A powerful Chrome extension that integrates ChatGPT into any textarea on any website. Simply click the ChatGPT icon next to any textarea to generate AI-powered content directly in your browser.

![Extension Demo](screenshots/demo.gif)

## Features

- 🎯 Works with any textarea on any website
- 🤖 Direct integration with ChatGPT API
- 🔒 Secure API key storage
- ⚡ Fast and responsive
- 🎨 Clean and intuitive interface
- ⌨️ Keyboard shortcuts support
- 🌐 Works across all websites

## Installation

1. Download the `dist` folder from this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `dist` folder
5. The extension is now installed and ready to use!

## Setup

1. Click the extension icon in your Chrome toolbar
2. Enter your OpenAI API key
   - Get your API key from [OpenAI API Keys](https://platform.openai.com/api-keys)
   - The key should start with `sk-`
3. Click "Save API Key"
4. You're all set! The extension is ready to use

## Usage

1. Navigate to any website with a textarea
2. Look for the ChatGPT icon (🤖) in the top-right corner of any textarea
3. Click the icon to open the prompt modal
4. Enter your prompt and click "Generate" or press Enter
5. The generated text will automatically appear in the textarea

## Keyboard Shortcuts

- `Enter`: Generate text (in the prompt modal)
- `Shift + Enter`: Add a new line in the prompt
- `Esc`: Close the prompt modal

## Privacy & Security

- Your API key is stored securely in Chrome's storage sync
- No data is collected or transmitted except to the OpenAI API
- All communication with OpenAI is done via HTTPS
- The extension only requires necessary permissions

## Technical Details

- Built with TypeScript and Vite
- Uses the OpenAI GPT-3.5 Turbo API
- Implements event throttling for performance
- Follows Chrome's Manifest V3 guidelines

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/chatgpt-text-helper/issues) on GitHub.
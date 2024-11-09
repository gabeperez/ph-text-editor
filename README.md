# PH Text Editor

## Description
PH Text Editor is a Chrome extension designed to enhance the commenting experience on Product Hunt. This extension provides a formatting toolbar for comments, allowing users to easily add bold, italics, links, images, GIFs, and videos to their Product Hunt comments and replies.

## Features
- **Floating Toolbar:** A convenient formatting toolbar appears when focusing on comment boxes.
- **Text Formatting:** Easily apply bold, italic, and strikethrough styles to selected text.
- **Link Insertion:** Quickly insert hyperlinks with custom URLs.
- **Image Insertion:** Add images to comments with custom URLs and alt text.

## Keyboard Shortcuts
The following keyboard shortcuts are available:
- **Bold:** ⌘+B (Mac) or Ctrl+B (Windows)
- **Italic:** ⌘+I (Mac) or Ctrl+I (Windows)
- **Link:** ⌘+K (Mac) or Ctrl+K (Windows)

## Installation
To install PH Text Editor, follow these steps:

1. **Download the Extension:**
   - Clone this repository or download the `phtext.js` and `manifest.json` files.

2. **Install the Extension:**
   - Go to `chrome://extensions/` in your Chrome browser.
   - Enable "Developer mode" by toggling the switch in the top right corner.
   - Click on "Load unpacked" and select the directory containing the extension files.

## Usage
Once installed, navigate to any Product Hunt page. The extension will be active on all Product Hunt pages:
- Click on any comment box to focus it.
- The formatting toolbar will appear at the top right of the text box.
- Select the text you want to format and click the appropriate button on the toolbar or use Keyboard shortcuts CMD+B, CMD+I, CMD+K.
- For links and images, you'll be prompted to enter the necessary information.

## Permissions
The extension requires the following permissions:
- `activeTab`: To access the content of the current tab and insert formatted text into comment boxes.

## Development
If you would like to contribute or modify the extension, you can edit the `phtext.js` file. The main components are:

- `createToolbar()`: Creates and styles the formatting toolbar.
- `formatText(tag)`: Applies the selected formatting to the text.
- `toggleToolbar(event)`: Shows or hides the toolbar based on focus events.

## Customization
To add or modify formatting options, edit the `buttons` array in the `createToolbar` function. Each button object should have `text`, `tag`, and `title` properties.

**TOOLBAR**
<img width="562" alt="Screenshot 2024-10-29 at 22 54 57" src="https://github.com/user-attachments/assets/a13433ec-9fd7-4803-ae47-058b94a0f0e5">

**FORMATTING PRE-POST**
<img width="984" alt="Screenshot 2024-10-29 at 22 55 55" src="https://github.com/user-attachments/assets/f812e73f-2756-4ff6-beb4-2cfdde241bcc">

**POST WITH FORMATTING**
![Screen Recording mov (2)](https://github.com/user-attachments/assets/e66466d3-d40c-49c8-a3c9-c2dc0f59c51e)

## License
This project is licensed under the MIT License.

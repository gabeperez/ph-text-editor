// Content script for the Chrome extension

// At the beginning of the file
console.log('PH Text Formatter script loaded');

// Function to check if the current URL matches the Product Hunt product page pattern
function isProductHuntProductPage() {
  const url = window.location.href;
  console.log('Current URL:', url);
  const result = url.includes('https://www.producthunt.com/posts/');
  console.log('Is Product Hunt page:', result);
  return result;
}

// Function to create the toolbar
function createToolbar() {
  if (document.getElementById('ph-formatter-toolbar')) return;

  const toolbar = document.createElement('div');
  toolbar.id = 'ph-formatter-toolbar';
  toolbar.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px;
    display: none;
    z-index: 9999;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  `;

  const buttons = [
    { icon: '🅱️', tag: 'b', title: 'Bold' },
    { icon: '𝐼', tag: 'i', title: 'Italic' },
    { icon: '🔗', tag: 'a', title: 'Insert Link' },
    { icon: '🖼️', tag: 'media', title: 'Insert Image or Video' },
  ];

  buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.innerHTML = button.icon;
    btn.title = button.title;
    btn.style.cssText = `
      background-color: transparent;
      border: none;
      color: #222f3e;
      cursor: pointer;
      font-size: 16px;
      margin-right: 5px;
      padding: 5px 10px;
      transition: background-color 0.3s;
    `;
    btn.addEventListener('mouseover', () => {
      btn.style.backgroundColor = '#e0e0e0';
    });
    btn.addEventListener('mouseout', () => {
      btn.style.backgroundColor = 'transparent';
    });
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const activeTextarea = document.activeElement;
      if (activeTextarea && activeTextarea.tagName === 'TEXTAREA') {
        formatText(button.tag);
        activeTextarea.focus();
      }
    });
    toolbar.appendChild(btn);
  });

  document.body.appendChild(toolbar);
  console.log('Toolbar created');
  return toolbar;
}

// Function to format selected text
function formatText(tag) {
  const textarea = getActiveTextarea();
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  let formattedText = '';
  switch (tag) {
    case 'a':
      const url = prompt('Enter URL:');
      if (url) {
        formattedText = `<a href="${url}" target="_blank">${selectedText}</a>`;
      }
      break;
    case 'media':
      const mediaUrl = prompt('Enter image, GIF, or video URL:');
      if (mediaUrl) {
        if (isVideoUrl(mediaUrl)) {
          // For videos, we'll just insert the URL directly
          formattedText = mediaUrl;
        } else {
          // For images and GIFs, use the <img> tag
          formattedText = `<img src="${mediaUrl}">`;
        }
      }
      break;
    case 'b':
      formattedText = `<b>${selectedText}</b>`;
      break;
    case 'i':
      formattedText = `<i>${selectedText}</i>`;
      break;
    default:
      formattedText = selectedText;
  }

  if (formattedText) {
    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    textarea.value = newValue;
    textarea.selectionStart = start;
    textarea.selectionEnd = start + formattedText.length;
    textarea.focus();
    
    const inputEvent = new Event('input', { bubbles: true });
    textarea.dispatchEvent(inputEvent);
  }
}

function isVideoUrl(url) {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
}

// Function to show/hide toolbar
function toggleToolbar(event) {
  if (!isProductHuntProductPage()) return;

  const textarea = getActiveTextarea();
  if (!textarea) return;

  let toolbar = document.getElementById('ph-formatter-toolbar');
  if (!toolbar) {
    toolbar = createToolbar();
  }

  if (!toolbar) {
    console.error('Failed to create toolbar');
    return;
  }

  if (event.target.tagName === 'TEXTAREA') {
    const rect = event.target.getBoundingClientRect();
    toolbar.style.bottom = `${window.innerHeight - rect.top + 10}px`;
    toolbar.style.right = `${window.innerWidth - rect.right + 10}px`;
    toolbar.style.display = 'block';
  } else if (!textarea.contains(event.target) && !toolbar.contains(event.target)) {
    toolbar.style.display = 'none';
  }
}

// Function to handle keyboard shortcuts
function handleKeyboardShortcut(event) {
  if (!event.metaKey && !event.ctrlKey) return; // Only proceed if CMD (Mac) or CTRL (Windows) is pressed

  const textarea = getActiveTextarea();
  if (!textarea) return;

  if (event.key === 'b') {
    event.preventDefault();
    formatText('b');
  } else if (event.key === 'i') {
    event.preventDefault();
    formatText('i');
  } else if (event.key === 'k') {
    event.preventDefault();
    formatText('a');
  }
}

// Initialize the extension
function init() {
  console.log('Initializing PH Text Formatter');
  try {
    document.addEventListener('click', toggleToolbar);
    document.addEventListener('focus', toggleToolbar, true);
    document.addEventListener('keydown', handleKeyboardShortcut); // Add keyboard shortcut listener
    console.log('PH Text Formatter initialized');
    console.log('Current URL:', window.location.href);
    
    // Attempt to find the textarea immediately
    const textarea = document.querySelector('textarea[placeholder="What do you think?"]');
    console.log('Textarea found on initial load:', !!textarea);
    
    if (textarea) {
      console.log('Textarea placeholder:', textarea.placeholder);
    } else {
      console.log('No textarea found. DOM structure:', document.body.innerHTML);
    }
  } catch (error) {
    console.error('Error initializing PH Text Formatter:', error);
  }
}

// Run the initialization when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Ensure the script runs even if it's injected after page load
init();

// Update the textarea selector to be more inclusive
function getActiveTextarea() {
  const activeElement = document.activeElement;
  
  // If the active element is a textarea, return it
  if (activeElement && activeElement.tagName === 'TEXTAREA') {
    return activeElement;
  }
  
  // Only fall back to the main comment box if no textarea is focused
  return document.querySelector('textarea[placeholder="What do you think?"]');
}

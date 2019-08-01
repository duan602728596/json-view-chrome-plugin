import React, { useState } from 'react';
import { render } from 'react-dom';

function Popup() {
  const [injectFile, setInjectFile] = useState(false);

  // 格式化json
  function handleFormatJsonClick(event) {
    if (injectFile) return;

    // 发送事件
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0].id !== undefined) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'FORMAT_JSON'
        });
      }
    });

    setInjectFile(true);
  }

  return (
    <div className="popup-box">
      <button className="format-json-btn" type="button" onClick={ handleFormatJsonClick }>格式化JSON</button>
    </div>
  );
}

render(
  <Popup />,
  document.getElementById('app')
);
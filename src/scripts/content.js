import formatJson from './content/formatJson';

/* 监听信息 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.type === 'FORMAT_JSON') {
    formatJson();
  }
});
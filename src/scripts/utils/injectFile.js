/**
 * 注入css文件
 * @param { string } file: 文件地址
 */
export function injectCSS(file) {
  return new Promise((resolve, reject) => {
    chrome.tabs.insertCSS({ file }, function() {
      resolve();
    });
  });
}

/**
 * 注入js文件
 * @param { string } file: 文件地址
 */
export function injectJS(file) {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript({ file }, function() {
      resolve();
    });
  });
}
import React from 'react';
import { render } from 'react-dom';
import FormatJsonView from './FormatJsonView';

/* 格式化json */
function formatJson() {
  // 获取json
  const pre = document.getElementsByTagName('pre');

  if (pre.length !== 1) return;

  if (pre[0].classList.contains('content-pre-hidden')) return;

  const json = JSON.parse(pre[0].innerHTML);

  pre[0].classList.add('content-pre-hidden');

  // 显示json
  let element = document.createElement('div');

  element.classList.add('app');
  element.id = 'app';
  document.body.appendChild(element);
  element = null;

  render(
    <FormatJsonView json={ json } />,
    document.getElementById('app')
  );
}

export default formatJson;
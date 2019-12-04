import React from 'react';
import { render } from 'react-dom';
import FormatJsonView from './FormatJsonView';
import style from '../../styles/content.css';

/* 格式化json */
function formatJson() {
  // 获取json
  const pre = document.getElementsByTagName('pre');

  if (pre.length !== 1) return;

  if (pre[0].classList.contains(style.preHidden)) return;

  const json = JSON.parse(pre[0].innerHTML);

  pre[0].classList.add(style.preHidden);

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
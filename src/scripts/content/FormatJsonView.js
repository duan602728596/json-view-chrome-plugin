import React, { Fragment } from 'react';
import JsonView from 'react-json-view';

function FormatJsonView(props) {
  const { json } = props;

  // 打开新页面
  function handleOpenNewTargetClick(event) {
    const e = event.target;
    const url = e.innerHTML
      .replace(/^"/, '')
      .replace(/"$/, '');

    window.open(url);
  }

  // 鼠标退出
  function handleValueMouseOut(event) {
    const e = event.target;

    e.classList.remove('content-link');
    e.removeEventListener('click', handleOpenNewTargetClick, false);
    e.removeEventListener('mouseout', handleValueMouseOut, false);
  }

  // 鼠标进入
  function handleValueMouseOver(event) {
    const e = event.target;

    if (e.className !== 'string-value') return;

    const text = e.innerHTML;

    if (!/^"(?:https?:)?\/\/.+"$/.test(text)) return;

    e.classList.add('content-link');
    e.addEventListener('click', handleOpenNewTargetClick, false);
    e.addEventListener('mouseout', handleValueMouseOut, false);
  }

  // 返回顶部
  function handleGoToTopClick(event) {
    window.scroll(0, 0);
  }

  return (
    <Fragment>
      {/* 显示json */}
      <div onMouseOver={ handleValueMouseOver }>
        <JsonView src={ json }
          theme="summerfruit:inverted"
          iconStyle="circle"
          collapsed={ false }
          displayObjectSize={ true }
          displayDataTypes={ true }
          indentWidth={ 4 }
          name={ false }
        />
      </div>
      {/* 返回顶部 */}
      <button className="content-go-to-top-btn" type="button" title="返回顶部" onClick={ handleGoToTopClick }>
        <img className="content-go-to-top-svg" src={ require('../../images/go-to-top.svg').default } />
      </button>
    </Fragment>
  );
}

export default FormatJsonView;
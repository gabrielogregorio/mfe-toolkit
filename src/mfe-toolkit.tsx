// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { Root } from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  // @ts-ignore
  errorBoundary(err, info, props) {
    <div>
      <div>Error on load remaining money</div>

      <div>err {JSON.stringify(err)}</div>
      <div>info {JSON.stringify(info)}</div>
      <div>props {JSON.stringify(props)}</div>
    </div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

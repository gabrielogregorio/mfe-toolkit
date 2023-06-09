/* eslint-disable spellcheck/spell-checker */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { AcceptAudioProvider } from './contexts/acceptAudio';
import { Root } from './root.component';

const lifeCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: () => {
    return (
      <AcceptAudioProvider>
        <Root />
      </AcceptAudioProvider>
    );
  },
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

export const { bootstrap, mount, unmount } = lifeCycles;

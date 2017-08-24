import * as React from 'react';

interface HtmlProps {
  content?: any;
  storeState?: any;
}
;

export function Html(props: HtmlProps) {
  return (
    <html>
    <head>
      <title>Another react typescript boilerplate</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
      <script dangerouslySetInnerHTML={{__html: `window.__CONTEXT__=${JSON.stringify(props.storeState)}`}}/>
    </head>
    <body>
    <div id="root" dangerouslySetInnerHTML={{__html: props.content}}/>
    <script src="/static/bundle.js"></script>
    </body>
    </html>
  );
}

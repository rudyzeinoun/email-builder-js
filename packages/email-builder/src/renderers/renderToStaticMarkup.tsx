import React from 'react';
import { renderToStaticMarkup as baseRenderToStaticMarkup } from 'react-dom/server';

import Reader, { TReaderDocument } from '../Reader/core';

type TOptions = {
  rootBlockId: string;
};
export default function renderToStaticMarkup(document: TReaderDocument, { rootBlockId }: TOptions) {
  return (
    '<!DOCTYPE html>' +
    baseRenderToStaticMarkup(
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style type="text/css">
            {`
              .responsive-mobile { display: none !important; }
              .responsive-desktop { display: block !important; }
              @media (max-width: 450px) {
                .responsive-mobile { display: block !important; }
                .responsive-desktop { display: none !important; }
              }
              .no-underline a { text-decoration: none }

              @media only screen and (max-width: 450px) {
              .stack { 
                display: table-row-group !important;
                width: 100% !important; 
                max-width: 100% !important;
              }
              .stack.stack-header { display: table-header-group !important; } 
              .stack.stack-footer { display: table-footer-group !important; } 
              .stack img { 
                width: 100% !important; 
                height: auto !important; 
              }
            }
          `}
          </style>
        </head>
        <body>
          <Reader document={document} rootBlockId={rootBlockId} />
        </body>
      </html>
    )
  );
}

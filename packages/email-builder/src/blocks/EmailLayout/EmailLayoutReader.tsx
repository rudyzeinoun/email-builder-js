import React, { Fragment } from 'react';

import { ReaderBlock } from '../../Reader/core';

import { EmailLayoutProps } from './EmailLayoutPropsSchema';

function getFontFamily(fontFamily: EmailLayoutProps['fontFamily']) {
  const f = fontFamily ?? 'MODERN_SANS';
  switch (f) {
    case 'HELVETICA':
      return 'Helvetica, Arial, sans-serif';
    case 'GEORGIA':
      return 'Georgia, "Times New Roman", Times, serif';
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
}

function getBorder({ borderColor }: EmailLayoutProps) {
  if (!borderColor) {
    return undefined;
  }
  return `1px solid ${borderColor}`;
}

export default function EmailLayoutReader(props: EmailLayoutProps) {
  const childrenIds = props.childrenIds ?? [];
  return (
     <Fragment>
      {props.previewText && (
        <div
          style={{ display: 'none', maxHeight: '0px', overflow: 'hidden'}}
        >
          {props.previewText}
          &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;
        </div>
      )}
      <div
        style={{
          backgroundColor: props.backdropColor ?? '#F5F5F5',
          color: props.textColor ?? '#262626',
          fontFamily: getFontFamily(props.fontFamily),
          fontSize: '16px',
          fontWeight: '400',
          letterSpacing: '0.15008px',
          lineHeight: '1.5',
          margin: '0',
          padding: '32px 0',
          minHeight: '100%',
          width: '100%',
        }}
      >
        <table
          align="center"
          width="100%"
          style={{
            margin: '0 auto',
            maxWidth: '600px',
            backgroundColor: props.canvasColor ?? '#FFFFFF',
            borderRadius: props.borderRadius ?? undefined,
            border: getBorder(props),
          }}
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          border={0}
        >
          <tbody>
            <tr style={{ width: '100%' }}>
              <td>
                {childrenIds.map((childId) => (
                  <ReaderBlock key={childId} id={childId} />
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

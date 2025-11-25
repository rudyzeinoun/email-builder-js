import React, { CSSProperties } from 'react';
import { z } from 'zod';

export const SpacerPropsSchema = z.object({
  props: z
    .object({
      height: z.number().gte(0).optional().nullish(),
    })
    .optional()
    .nullable(),
});

export type SpacerProps = z.infer<typeof SpacerPropsSchema>;

export const SpacerPropsDefaults = {
  height: 16,
};

export function Spacer({ props }: SpacerProps) {
  const height = props?.height ?? SpacerPropsDefaults.height;
  const cellStyle: CSSProperties = {
    height,
    lineHeight: `${height}px`,
    fontSize: '1px',
  };
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      style={{ width: '100%', borderCollapse: 'collapse' }}
    >
      <tbody>
        <tr>
          <td style={cellStyle} dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
        </tr>
      </tbody>
    </table>
  );
}

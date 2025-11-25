import React, { CSSProperties } from 'react';
import { z } from 'zod';

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const ContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      borderColor: COLOR_SCHEMA,
      borderRadius: z.number().optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  className: z.string().optional().nullable(),
  responsiveDisplay: z.string().optional().nullable(),
  conditionStatement: z.string().optional().nullable(),
  loopStart: z.number().optional().nullable(),
  loopEnd: z.number().optional().nullable(),
});

export type ContainerProps = {
  style?: z.infer<typeof ContainerPropsSchema>['style'];
  children?: JSX.Element | JSX.Element[] | null;
  className?: z.infer<typeof ContainerPropsSchema>['className'];
  responsiveDisplay?: z.infer<typeof ContainerPropsSchema>['responsiveDisplay'];
  conditionStatement?: z.infer<typeof ContainerPropsSchema>['conditionStatement'];
  loopStart?: z.infer<typeof ContainerPropsSchema>['loopStart'];
  loopEnd?: z.infer<typeof ContainerPropsSchema>['loopEnd'];
};

function getBorder(style: ContainerProps['style']) {
  if (!style || !style.borderColor) {
    return undefined;
  }
  return `1px solid ${style.borderColor}`;
}

export function Container({
  style,
  children,
  className,
  loopStart,
  loopEnd,
  responsiveDisplay,
  conditionStatement,
}: ContainerProps) {
  const wStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    border: getBorder(style),
    borderRadius: style?.borderRadius ?? undefined,
    padding: getPadding(style?.padding),
  };

  if (!className) className = '';

  if (!loopStart) loopStart = 0;

  if (!loopEnd) loopEnd = 0;

  let classesList = '';
  if (responsiveDisplay == 'mobile') {
    classesList += ' responsive-mobile';
  } else if (responsiveDisplay == 'desktop') {
    classesList += ' responsive-desktop';
  }

  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      style={{ width: '100%', borderCollapse: 'collapse' }}
      className={classesList}
      data-loop={className}
      data-loop-start={loopStart}
      data-loop-end={loopEnd}
      data-condition={conditionStatement ?? undefined}
    >
      <tbody>
        <tr>
          <td style={wStyle}>{children ?? null}</td>
        </tr>
      </tbody>
    </table>
  );
}

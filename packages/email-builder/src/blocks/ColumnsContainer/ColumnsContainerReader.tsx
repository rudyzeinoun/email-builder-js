import React from 'react';

import { ColumnsContainer as BaseColumnsContainer } from '@rudyzeinoun/block-columns-container';

import { ReaderBlock } from '../../Reader/core';

import { ColumnsContainerProps } from './ColumnsContainerPropsSchema';

export default function ColumnsContainerReader({ style, props, className, loopStart, loopEnd, responsiveDisplay }: ColumnsContainerProps) {
  const { columns, ...restProps } = props ?? {};
  let cols = undefined;
  if (columns) {
    cols = columns.map((col) => col.childrenIds.map((childId) => <ReaderBlock key={childId} id={childId} />));
  }

  return <BaseColumnsContainer props={restProps} columns={cols} style={style} className={className} loopStart={loopStart} loopEnd={loopEnd} responsiveDisplay={responsiveDisplay} />;
}

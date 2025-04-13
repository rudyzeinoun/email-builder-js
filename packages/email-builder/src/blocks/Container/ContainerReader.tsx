import React from 'react';

import { Container as BaseContainer } from '@rudyzeinoun/block-container';

import { ReaderBlock } from '../../Reader/core';

import { ContainerProps } from './ContainerPropsSchema';

export default function ContainerReader({ style, props, className, loopStart, loopEnd }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];
  return (
    <BaseContainer className={className} data-loop-start={loopStart} data-loop-end={loopEnd} style={style}>
      {childrenIds.map((childId) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </BaseContainer>
  );
}

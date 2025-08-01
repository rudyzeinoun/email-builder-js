import React from 'react';

import { Container as BaseContainer } from '@rudyzeinoun/block-container';

import { ReaderBlock } from '../../Reader/core';

import { ContainerProps } from './ContainerPropsSchema';

export default function ContainerReader({ style, props, className, loopStart, loopEnd, responsiveDisplay, conditionStatement }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];
  return (
    <BaseContainer className={className} loopStart={loopStart} loopEnd={loopEnd} style={style} responsiveDisplay={responsiveDisplay} conditionStatement={conditionStatement}>
      {childrenIds.map((childId) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </BaseContainer>
  );
}

import { z } from 'zod';

import { ContainerPropsSchema as BaseContainerPropsSchema } from '@rudyzeinoun/block-container';

export const ContainerPropsSchema = z.object({
  style: BaseContainerPropsSchema.shape.style,
  className: z.string().optional().nullable(),
  responsiveDisplay: z.string().optional().nullable(),
  loopStart: z.number().optional().nullable(),
  loopEnd: z.number().optional().nullable(),
  props: z
    .object({
      childrenIds: z.array(z.string()).optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type ContainerProps = z.infer<typeof ContainerPropsSchema>;

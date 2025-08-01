import { z } from 'zod';

import { ColumnsContainerPropsSchema as BaseColumnsContainerPropsSchema } from '@rudyzeinoun/block-columns-container';

const BasePropsShape = BaseColumnsContainerPropsSchema.shape.props.unwrap().unwrap().shape;

const ColumnsContainerPropsSchema = z.object({
  style: BaseColumnsContainerPropsSchema.shape.style,
  className: z.string().optional().nullable(),
  responsiveDisplay: z.string().optional().nullable(),
  conditionStatement: z.string().optional().nullable(),
  loopStart: z.number().optional().nullable(),
  loopEnd: z.number().optional().nullable(),
  props: z
    .object({
      ...BasePropsShape,
      columns: z.tuple([
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
      ]),
    })
    .optional()
    .nullable(),
});

export default ColumnsContainerPropsSchema;
export type ColumnsContainerProps = z.infer<typeof ColumnsContainerPropsSchema>;

import { type SchemaTypeDefinition } from 'sanity'
import { postSchema } from './posts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postSchema],
}

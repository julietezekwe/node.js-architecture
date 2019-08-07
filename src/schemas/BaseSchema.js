import { Schema } from 'mongoose';
/**
 * @description Base Mongo Schema
 * @class BaseSchema
 */
class BaseSchema extends Schema {
  /**
   * constructor
   * @param {object} definitions
   * @param {object} schemaOptions
   */
  constructor(definitions, schemaOptions) {
    const defaultDefinition = {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    };
    super(
      { ...defaultDefinition, ...definitions },
      { ...schemaOptions },
    );
  }
}
export default BaseSchema;

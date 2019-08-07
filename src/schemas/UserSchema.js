
// import { SchemaTypes } from 'mongoose';
import BaseSchema from './BaseSchema';

const userSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  age: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
  },
});
export default userSchema;

import BaseRepository from './BaseRepository';
import userSchema from '../schemas/UserSchema';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
class UserRepository extends BaseRepository {
  /**
   * UserRepository constructor
   */
  constructor({ db }) {
    super('User', userSchema, db);
  }
}
export default UserRepository;

import autoBind from 'auto-bind';
/**
   * Creates an instance of UserController.
   */
class UserService {
  /**
   * Creates an instance of UserController.
   * @param {object} param
   * @memberof UsersController
   */
  constructor({ userRepository, redis }) {
    this.userRepository = userRepository;
    this.redis = redis;
    autoBind(this);
  }

  /**
   * Retrieves user details
   * @param {number} - id
   *@returns {object} - user
   */
  async retrieveUser(id) {
    try {
      let user;
      // retrieve user from redis
      user = await this.redis.getObject('id', id);
      if (user && Object.entries(user).length > 0) {
        return user;
      }
      user = await this.userRepository.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves user details
   * @param {number} - id
   *@returns {object} - user
   */
  async createAUser(options) {
    try {
      const newUser = await this.userRepository.create(options);
      await this.redis.setObject('id', newUser.id, newUser, 86400);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;

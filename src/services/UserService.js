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
  constructor({ userRepository }) {
    this.userRepository = userRepository;
    autoBind(this);
  }

  /**
   * Retrieves user details
   * @param {number} - id
   *@returns {object} - user
   */
  async retrieveUser(id) {
    try {
      return await this.userRepository.findById(id);
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
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;

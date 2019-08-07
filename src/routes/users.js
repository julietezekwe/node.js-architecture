import { Router } from 'express';

const createUsersRoute = ({ usersController }) => {
  const router = Router();
  router.get('/:id', usersController.getUser);
  router.post('/', usersController.createUser);
  return router;
};
export default createUsersRoute;

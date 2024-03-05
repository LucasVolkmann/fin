import { User } from '../../models/User';
import { UserDTOType } from '../../models/dtos/UserDTOType';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';

export const createUser = async (userDTO: UserDTOType): Promise<number | void> => {

  const user = new User(userDTO.username, userDTO.email, userDTO.password);

  await user.save().then((user) => {
    if(!user.id) {
      throw new InternalServerError('Error while creating user.');
    } else {
      return user.id;
    }
  }).catch((error) => {
    throw new InternalServerError(error.message);
  });

};

import UserModel  from '../models/user';

let cache = {
    User:    new UserModel.Model(),
    locale:  'en',
    version: null
};

export default cache;


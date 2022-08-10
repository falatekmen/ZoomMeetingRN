// This util is to generate JWTs.
// THIS IS NOT A SAFE OPERATION TO DO IN YOUR APP IN PRODUCTION.
// JWTs should be provided by a backend server as they require a secret
// WHICH IS NOT SAFE TO STORE ON DEVICE!
import * as jwt from 'react-native-pure-jwt';

import { ZOOM_APP_KEY, ZOOM_APP_SECRET } from '../../config';

function makeId(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default async function generateJwt(sessionName, roleType) {
  try {
    const token = await jwt.sign(
      {
        app_key: ZOOM_APP_KEY,
        version: 1,
        user_identity: makeId(10),
        iat: new Date().getTime(),
        exp: new Date(Date.now() + 23 * 3600 * 1000).getTime(),
        tpc: sessionName,
        role_type: parseInt(roleType, 10),
      },
      ZOOM_APP_SECRET,
      {
        alg: 'HS256',
      }
    );
    return token;
  } catch (e) {
    console.log(e);
    return '';
  }
}
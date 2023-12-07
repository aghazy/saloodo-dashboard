import get from 'lodash/get';
import { Auth, API } from 'aws-amplify';
import { head } from 'lodash';

const currentAuthenticatedUser = async () =>
    new Promise(async (resolve, reject) => {
        try {
            const cognitoUser = await Auth.currentAuthenticatedUser({
                // send a request to Cognito to get the latest user data
                bypassCache: true,
            });
            const mongoUser = head(await API.get('api', `/user/${cognitoUser.username}`, {
                headers: {
                    Authorization: `Bearer ${get(
            cognitoUser,
            ['signInUserSession', 'idToken', 'jwtToken'],
            '',
          )}`,
                },
            }));
            resolve({
                userId: get(cognitoUser, 'username'),
                email: get(cognitoUser, 'email'),
                name: get(mongoUser, 'name'),
                type: get(mongoUser, 'type'),
                id: get(mongoUser, '_id'),
                token: get(cognitoUser, ['signInUserSession', 'idToken', 'jwtToken'], ''),
            });
        } catch (error) {
            reject(error);
        }
    });

export default currentAuthenticatedUser;

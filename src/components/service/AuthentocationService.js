
export class AuthentocationService {

    setUserDatails(objUser) {
        localStorage['userDetails'] = objUser;
    }

    getUserDatails() {
        return localStorage?.getItem('userDetails');
    }
}
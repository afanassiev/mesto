export default class UserInfo {
  constructor({nameProfile, descrProfile}) {
    this._nameProfile = nameProfile;
    this._descrProfile = descrProfile;
    this._userData = {
      name: this._nameProfile.textContent,
      descr: this._descrProfile.textContent
    }
  }

  getUserInfo () {
    return this._userData;
  }

  setUserInfo (data) {
    this._nameProfile.textContent = data.profileNameInput;
    this._descrProfile.textContent = data.profileDescrInput;
  }

}
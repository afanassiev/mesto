export default class UserInfo {
  constructor({nameProfile, descrProfile, linkAvatar}) {
    this._nameProfile = nameProfile;
    this._descrProfile = descrProfile;
    this._linkAvatar = linkAvatar;
    this._userData = {
      name: this._nameProfile.textContent,
      about: this._descrProfile.textContent,
      avatar: this._linkAvatar.src
    }
  }

  getUserInfo () {
    return this._userData;
  }

  setUserInfo (data) {
      this._nameProfile.textContent = data.name;
      this._descrProfile.textContent = data.about;
      this._linkAvatar.src = data.avatar;
    }

  // setAvatar (data) {
  //   this._linkAvatar.src = data.avatar;
  //   }

}
'use strict';

var adverts = {
  'avatar': randomAvatar()
}

function randomAvatar() {
  var avatar = 'img/avatars/user0' + Math.floor(Math.random() * 8 + 1) + '.png';
  return avatar;
}
console.log(adverts.avatar);

export function canActivate(user, restrictionLevel) {
  return !(user.userType === 'appUser' && restrictionLevel === 1);
}

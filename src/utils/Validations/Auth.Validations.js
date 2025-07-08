export const emailValidation = value => {
  if (value?.length) {
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(value) ? true : false;
  } else {
    return false;
  }
};

export const passwordValidation = password => {
  return password?.length >= 6 ? true : false;
};

export const nameValidation = name => {
  return name?.length >= 3 ? true : false;
};

export const otpValidation = otp => {
  return otp?.length === 4 ? true : false;
};

export const newPasswordValidation = (password, confirmPassword) => {
  if (password.length <= 6 || confirmPassword.length <= 6) {
    return false;
  } else if (password != confirmPassword) {
    return false;
  } else {
    return true;
  }
};

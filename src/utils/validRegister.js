export const validRegister = (userRegister) => {
  const { userName, email, password, cf_password } = userRegister;
  const errors = [];

  if (!userName) {
    errors.push("Please add your name.")
  } else if (userName.length > 20) {
    errors.push("Your userName is up to 20 chars long.")
  }

  if (!email) {
    errors.push("Please add your email")
  } else if (!validateEmail(email)) {
    errors.push("Email format is incorrect.")
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 chars.")
  } else if (password !== cf_password) {
    errors.push("Confirm password did not match.")
  }

  return {
    errMsg: errors,
    errLength: errors.length
  }
};

export const validUpdate = (userUpdate) => {
  const { name, surname, bio } = userUpdate;
  const errors = [];

  if (!name) {
    errors.push("Please add your name.")
  } else if (name.length > 20) {
    errors.push("Your Name is up to 20 chars long.")
  }

  if (!surname) {
    errors.push("Please add your surname.")
  } else if (surname.length > 20) {
    errors.push("Your Surname is up to 20 chars long.")
  }

  if (!bio) {
    errors.push("Please add your bio.")
  } else if (bio.length > 100) {
    errors.push("Your Bio is up to 100 chars long.")
  }

  return {
    errMsg: errors,
    errLength: errors.length
  }
};


export const validChangePassword = (changePassword) => {
  const { oldPassword, password, passwordConfirmation } = changePassword;
  const errors = [];

  if (!oldPassword) {
    errors.push("Please write your old password!")
  } else if (oldPassword.length < 8) {
    errors.push("Your old password must be at least 8 characters!")
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 chars.")
  } else if (password !== passwordConfirmation) {
    errors.push("Confirm password did not match.")
  }

  return {
    errMsg: errors,
    errLength: errors.length
  }
};

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
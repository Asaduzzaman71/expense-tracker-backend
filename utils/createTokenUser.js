const createTokenUser = (user) => {
  return { userId: user.id, firstName: user.first_name, lastName: user.lastName, role: user.role, userVerify: user.userVerify };
};

module.exports = createTokenUser;

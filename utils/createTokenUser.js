const createTokenUser = (user) => {
  return { userId: user._id, first_name: user.first_name, last_name: user.last_name, role: user.role };
};

module.exports = createTokenUser;

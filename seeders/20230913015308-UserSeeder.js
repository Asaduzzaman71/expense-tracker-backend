const bcrypt = require('bcrypt');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'asaduzzaman',
        lastName: 'rabbi',
        email: 'asaduzzaman@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        role: 'user',
        profilePic: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'super',
        lastName: 'admin',
        email: 'superadmin@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        role: 'admin',
        profilePic: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

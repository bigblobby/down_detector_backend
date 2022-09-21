'use strict';
const {faker} = require("@faker-js/faker/locale/en_GB");
const bcrypt = require('bcrypt');

const makePassword = (pw) => {
    return bcrypt.hash(pw, 10);
}

function generateUsers(){
  return [...Array(100)].map(async user => {
    return {
      username: faker.internet.userName(),
      password: await makePassword("test"),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      permissions: ['GET', 'POST', 'PUT', 'DELETE'],
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await generateUsers();
    const settledUsers = await Promise.all(users);

    return queryInterface.bulkInsert('User', settledUsers, {}, { permissions: { type: new Sequelize.JSON() } });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};

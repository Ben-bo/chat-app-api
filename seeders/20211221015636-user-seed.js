"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const pass = "123456";
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(pass, salt);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "beni@gmail.com",
          name: "beni",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "ahmad@gmail.com",
          name: "ahmad",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "edwin@gmail.com",
          name: "edwin",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

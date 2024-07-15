const { add } = require("winston");

module.exports = {
  async up(queryInterface, Sequelize) {
    //enter database "workshop"
    await queryInterface.sequelize.query("USE `workshop`;");
    // insert seed data
    await queryInterface.bulkInsert("user", [
      {
        username: "default user",
        password:
          "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "defaultuser@example.com",
        address: "123 Street, City",
        address: "1234 Main St, Anytown, USA 12345",
        age: 30,
        gender: 1,
        access: "admin",
        avatar: "https://avatar.iran.liara.run/public/77",
        nickname: "Default User",
        active: true,
      },
      {
        username: "admin",
        password:
          "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "admin@example.com",
        address: "1234 Main St, Anytown, USA 12345",
        address: "456 Avenue, City",
        age: 35,
        gender: 1,
        nickname: "Admin",
        active: true,
        access: "admin",
        avatar: "https://avatar.iran.liara.run/public/79"
      },
      {
        username: "Mark",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "teresa82@gmail.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 38,
        gender: 0,
        access: "teacher",
        avatar: "https://avatar.iran.liara.run/public/19"
      },
      {
        username: "Debbie",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "myersjon@frederick.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 34,
        gender: 1,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Patrick",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "pwarren@gmail.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 23,
        gender: 0,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "James",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "lisa36@cox-peterson.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 52,
        gender: 0,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Anthony",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "timothy95@mendoza-anderson.net",
        address: "1234 Main St, Anytown, USA 12345",
        age: 50,
        gender: 1,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Stephanie",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "davistami@potter.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 56,
        gender: 0,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Katherine",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "stephanieromero@taylor.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 42,
        gender: 1,
        access: "student",
        avatar: "default.jpg"
      },
      {
        username: "Colin",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "robert77@garcia.net",
        address: "1234 Main St, Anytown, USA 12345",
        age: 49,
        gender: 0,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Shane",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "angelabridges@hotmail.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 18,
        gender: 1,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Robin",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "thomaswilliams@walker.info",
        address: "1234 Main St, Anytown, USA 12345",
        age: 24,
        gender: 1,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Jason",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "cannonabigail@yoder.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 22,
        gender: 1,
        access: "student",
        avatar: "default.jpg"
      },
      {
        username: "Steve",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "stephen83@hotmail.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 19,
        gender: 0,
        access: "teacher",
        avatar: "default.jpg"
      },
      {
        username: "Kevin",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "iramirez@yahoo.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 25,
        gender: 0,
        access: "student",
        avatar: "default.jpg"
      },
      {
        username: "Alex",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "operry@mora.info",
        address: "1234 Main St, Anytown, USA 12345",
        age: 36,
        gender: 0,
        access: "student",
        avatar: "default.jpg"
      },
      {
        username: "Beverly",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "nicolefox@hotmail.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 18,
        gender: 0,
        access: "student",
        avatar: "default.jpg"
      },
      {
        username: "Colleen",
        password: "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
        email: "williamsdalton@hendrix-russell.com",
        address: "1234 Main St, Anytown, USA 12345",
        age: 52,
        gender: 0,
        access: "student",
        avatar: "default.jpg"
      },


    ], {});
    // console.log("Database, table, and data have been seed successfully.");
  },

  async down(queryInterface, Sequelize) {
    // delete table if necessary
    await queryInterface.bulkDelete("user", null, {});

    await queryInterface.dropTable("user");

    console.log("Database, table, and data have been deleted successfully.");
  },
};

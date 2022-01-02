'use strict';

const accountsales = require("../models/accountsales");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let array=[];
    for(var i=0;i<1000;i++)
    {
      var fake_email={
        email:'',
        password:'',
        status:false,
        account_id:1,
        createdAt:'',
        updatedAt:''
      };

      fake_email.email=Math.random().toString(36).substring(2, 15)+'@gmail.com';
      fake_email.password=Math.random().toString(36).substring(2, 15);
      fake_email.status=false;
      fake_email.createdAt = new Date();
      fake_email.updatedAt = new Date()
      array.push(fake_email)
    }
    return queryInterface.bulkInsert('Accountsales',array);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

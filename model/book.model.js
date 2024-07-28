module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
      Student_Name: {
        type: Sequelize.STRING
      },
      Arabic_Name: {
        type: Sequelize.STRING
      },
      Level: {
        type: Sequelize.STRING
      },
      Section: {
        type: Sequelize.STRING
      },
      Father_Mobile: {
        type: Sequelize.STRING
      },
      Mother_Mobile: {
        type: Sequelize.STRING
      },
      Father_Email: {
        type: Sequelize.STRING
      },
      Mother_Email: {
        type: Sequelize.STRING
      },
    });
  
    return Book;
  };
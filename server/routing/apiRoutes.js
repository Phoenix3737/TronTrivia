var questions = require('../data/questions.js')


module.exports = function (app) {
 

  app.get('/api/questions', function (req,res) {
      res.json(questions);
  });

};
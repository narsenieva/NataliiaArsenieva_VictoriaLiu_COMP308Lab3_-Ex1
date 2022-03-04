const students = require('../../app/controllers/students.server.controller');
const articles = require('../../app/controllers/articles.server.controller');
//
module.exports = function (app) {
        app.route('/api/articles')
            .get(articles.list)
            .post(students.requiresLogin, articles.create);
        //
        app.route('/api/articles/:articleId')
            .get(articles.read)
            .put(students.requiresLogin, articles.hasAuthorization, articles.
                update)
            .delete(students.requiresLogin, articles.hasAuthorization, articles.
                delete);
        //
        app.param('articleId', articles.articleByID);
};

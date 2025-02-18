const students = require('../controllers/students.server.controller');
const courses = require('../controllers/courses.server.controller');
//
module.exports = function (app) {
        app.route('/api/courses')
            .get(students.requiresLogin, courses.list)
            .post(students.requiresLogin, courses.create);
        //
        app.route('/api/courses/:courseId')
            .get(courses.read)
            .put(students.requiresLogin, courses.hasAuthorization, courses.update)
            .delete(students.requiresLogin, courses.hasAuthorization, courses.delete);
        //
        app.param('courseId', courses.courseByID);
};
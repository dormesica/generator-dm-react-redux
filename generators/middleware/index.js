var path = require('path');
var generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _ = require('lodash');


function constructor() {
    generator.Base.apply(this, arguments);

    var nameOptions = {
        type: String,
        required: true,
        desc: "The name of the middleware"
    };
    this.argument("name", nameOptions);

    var notRegisteredOptions = {
        desc: "Don't register the middleware in the middleware.js file",
        alias: "N",
        type: Boolean,
        defaults: false
    };
    this.option('not-registered', notRegisteredOptions);
}

function createMiddleware() {
    var middlewareFolderPath = this.destinationPath('src/store/middleware');

    // make sure folder exists
    mkdirp.sync(middlewareFolderPath);

    // create filename and copy file
    var filename = _.kebabCase(this.name) + '.js';
    this.fs.copy(
        this.templatePath('middleware.js'),
        path.join(middlewareFolderPath, filename)
    );

    // register middleware in middleware.js
    if (this.options['not-registered']) {
        return;
    } else {
        // default behavior - register
        updateMiddlewareJs.call(this);
    }
}

function updateMiddlewareJs() {
    if (!this.fs.exists(this.destinationPath('src/store/middleware.js'))) {
        this.log.error('src/store/middleware.js file does not exist');
    }

    // force override on conflict
    this.conflicter.force = true;

    // generate relevant templates
    var importTemplate = _.template(
        "import <%= middlewareFunction %> from './middleware/<%= middlewareFile %>';"
    );
    var middlewareJsTemplate = _.template(
        this.fs.read(this.templatePath('all-middleware.js'))
    );

    // read current file content and prepare function and file names
    var code = this.fs.read(this.destinationPath('src/store/middleware.js'));
    code = code.split('\n');
    var filename = _.kebabCase(this.name);
    var functionName = _.camelCase(this.name);

    // create the import array to be written to the new file
    var importStatements = code.filter(function (statement) {  // get all current imports
        return _.startsWith(statement, 'import');
    });
    importStatements.push(importTemplate({  // push the new import
        middlewareFile: filename,
        middlewareFunction: functionName
    }));
    // reduce to a multiline statement
    var importContent = importStatements.reduce(function (current, statement) {
        return current + statement + '\n';
    }, '');

    // create the fields array to be written to the new file
    var middlewareFunctions = code.filter(function (field) {
        return _.startsWith(field, '    ');
    });
    middlewareFunctions.push('    ' + filename + ',');
    var functionsContent = middlewareFunctions.reduce(function (current, statement) {
        return current + statement + '\n'
    }, '');

    // write all content
    this.fs.write(
        this.destinationPath('src/store/middleware.js'),
        middlewareJsTemplate(
            { imports: importContent, middleware: functionsContent }
        )
    );
}


module.exports = generator.Base.extend({
    constructor: constructor,
    writing: createMiddleware
});

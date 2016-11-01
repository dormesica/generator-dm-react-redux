var path = require('path');
var generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var program = require('ast-query');


function constructor() {
    generator.Base.apply(this, arguments);

    var nameOptions = {
        type: String,
        required: true,
        desc: "The name of the reducer"
    };
    this.argument("name", nameOptions);

    var notRegisteredOptions = {
        desc: "Don't generate test file",
        alias: "N",
        type: Boolean,
        defaults: false
    };
    this.option('no-test', notRegisteredOptions);
}

function promptTestMessage() {
    var nameCamelCased = _.camelCase(this.name);
    var portionDefault = _.endsWith(nameCamelCased, 'Reducer') ? 
        nameCamelCased.substring(0, nameCamelCased.length - 7) :  // subtrack 7 for the length of 'Reducer' 
        nameCamelCased;

    var messageDefault = _.words(this.name).reduce(function (value, nextWord) {
            return value + _.capitalize(nextWord) + ' ';
        }, '') + 'Logic';

    return this.prompt([{
        type: 'input',
        name: 'portion',
        message: 'name of the state potion for this recuder',
        default: portionDefault
    }, {
        type: 'input',
        name: 'message',
        message: 'message for the test file',
        default: messageDefault
    }]).then(function (answers) {
        this.testMessage = answers.message;
        this.portion = answers.portion;
    }.bind(this));
}

function createReducer() {
    var reducerFolderPath = this.destinationPath('src/store/reducers');

    // make sure folder exists
    mkdirp.sync(reducerFolderPath);

    // create reducer filename and file
    var filename = _.kebabCase(this.name);
    if (!_.endsWith(filename, 'reducer')) {
        filename += '-reducer';
    }
    this.fs.copy(
        this.templatePath('reducer.js'),
        path.join(reducerFolderPath, filename) + '.js'
    );

    // register reducer in reducers.js
    var reducersFile = this.destinationPath('src/store/reducers.js');
    if (this.fs.exists(reducersFile)) {
        updateReducersJs.call(this, filename);
    }

    // generate test file
    var reducerFunction = _.camelCase(filename);  // the name of the recuder function after import
    var reducerFile = '../src/store/reducers/' + filename;
    var testFileName = filename + '.specs.js';
    this.fs.copyTpl(
        this.templatePath('test-reducer-template.js'),
        this.destinationPath(path.join('test', testFileName)),
        { reducerFunction: reducerFunction,
            reducerFile: reducerFile, 
            message: this.testMessage }
    )
}

function updateReducersJs(reducerToAdd) {
    if (!this.fs.exists(this.destinationPath('src/store/reducers.js'))) {
        this.log.error('src/store/reducers.js file does not exist');
        return;
    }

    // force override on conflict
    this.conflicter.force = true;

    // tempalte for the import statement and 
    // the field of the new reducer in the statea
    var importTemplate = _.template(
        "import <%= reducerFunction %> from './reducers/<%= reducerFile %>';"
    );
    var fieldTemplate = _.template("    <%= portion %>: <%= reducerFunction %>,");
    var reducersJsTemplate = _.template(
        this.read(this.templatePath('reducers.js'))
    );
    
    // create the imported reducer function name
    var reducerFunction = _.camelCase(reducerToAdd);

    // read the code of reducers.js
    var code = this.fs.read(this.destinationPath('src/store/reducers.js'));
    code = code.split('\n');

    // extract all import statements from reducers.js
    var importStatements = code.filter(function (statement) {
        return _.startsWith(statement, 'import');
    });
    // create a new import statement for the new reducer and push it to the imports array
    var newImport = importTemplate(
        { reducerFile: reducerToAdd, reducerFunction: reducerFunction }
    );
    importStatements.push(newImport);

    // extract the fields of the previous reducers im the statea
    // create new field and push to the fields array
    var objectFields = code.filter(function (statement) {
        return _.startsWith(statement, '    ');
    });
    var newField = fieldTemplate(
        { reducerFunction: reducerFunction, portion: this.portion }
    );
    objectFields.push(newField);

    // reduce arrays to a new reducers.js file
    var imports = importStatements.reduce(function (current, statement) {
        return current + statement + '\n';
    }, '');
    var fields = objectFields.reduce(function (current, field) {
        return current + field + '\n';
    }, '');
    this.fs.write(
        this.destinationPath('src/store/reducers.js'),
        reducersJsTemplate(
            { fields: fields, imports: imports }
        )
    );
}


module.exports = generator.Base.extend({
    constructor: constructor,
    prompting: promptTestMessage,
    writing: createReducer
});

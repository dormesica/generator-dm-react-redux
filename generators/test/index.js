var path = require('path');
var generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _ = require('lodash');


function constructor() {
    generator.Base.apply(this, arguments);

    // register the arguments and the options
    var nameOptions = {
        type: String,
        required: true,
        desc: "The name of the test file"
    };
    this.argument("name", nameOptions);
}

function requestMessage() {
    return this.prompt({
        type: 'input',
        name: 'message',
        message: 'describe message for the test',
        default: ''
    }).then(function (answers) {
        this.message = answers.message;
    }.bind(this));
}

function createTestFile() {
    // create the test file name - format <name>.specs.js
    var filename = createTestFileName(this.name);
    var testFolder = this.destinationPath('test');

    // name sure the test folder exists
    mkdirp(testFolder);

    // copy the file
    this.fs.copyTpl(
        this.templatePath('test-template.js'),
        path.join(testFolder, filename),
        { message: this.message }
    );
}

function createTestFileName(inputName) {
    var brokenName = _.words(inputName);
    brokenName = brokenName.map(function (word) {
        return _.lowerCase(word);
    });

    if (brokenName[brokenName.length - 1] === 'js') {
        // if the given name ends with .js extension --> ignore
        // pop the last item i.e. 'js'
        brokenName.pop();
    }

    if (brokenName[brokenName.length - 1] === 'specs') {
        // if the given name ends with specs (after discarding js ending) --> ignore
        // pop the last item i.e. 'specs'
        brokenName.pop();
    }

    return _.kebabCase(brokenName.reduce(
        function (current, word) { return current + _.upperFirst(word) }, 
        ''
    )) + '.specs.js';
}

module.exports = generator.Base.extend({
    constructor: constructor,
    prompting: requestMessage,
    writing: createTestFile
});

var generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var dependencies = require('./dependencies');


/**
 * The constructor of the application
 */
function constructor() {
    generator.Base.apply(this, arguments);

    // the name of the react application
    var appnameOptions = {
        type: String,
        required: true,
        desc: "The name of the generated app"
    }
    this.argument('appname', appnameOptions);
}

/**
 * Creates the directory structure of the project
 */
function createFolderStructure() {
    // log a message
    this.log('creating folder structure');

    // create the src folder and its sub-directories
    mkdirp.sync(this.destinationPath('src/component/common'));
    mkdirp.sync(this.destinationPath('src/actions'));
    mkdirp.sync(this.destinationPath('src/routes'));
    mkdirp.sync(this.destinationPath('src/store/middleware'));
    mkdirp.sync(this.destinationPath('src/store/reducers'));

    // create the destination folder
    mkdirp.sync(this.destinationPath('dist'));

    // create assets folder
    mkdirp.sync(this.destinationPath('assets'));

    // create test folder
    mkdirp.sync(this.destinationPath('test'));
}

/**
 * Copies basic boilerplate files into the directories
 */
function copyBasicFiles() {
    // copy package.json
    this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        { appname: this.appname }
    );

    // copy .yo-rc.json
    this.fs.copy(
        this.templatePath('.yo-rc.json'),
        this.destinationPath('.yo-rc.json')
    );

    // copy .babelrc
    this.fs.copy(
        this.templatePath('.babelrc'),
        this.destinationPath('.babelrc')
    );

    // copy index.html
    this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('index.html')
    );

    // copy webpack.config.js
    this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
    );

    // copy .gitignore file
    this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
    )
}

/**
 * Copies the source files to the src folder
 */
function copySourceFiles() {
    // copy index.jsx and root.jsx
    this.fs.copy(
        this.templatePath('src/index.jsx'),
        this.destinationPath('src/index.jsx')
    );
    this.fs.copy(
        this.templatePath('src/Root.jsx'),
        this.destinationPath('src/Root.jsx')
    );

    // copy the store files
    this.fs.copy(
        this.templatePath('src/store/middleware.js'),
        this.destinationPath('src/store/middleware.js')
    );
    this.fs.copy(
        this.templatePath('src/store/reducers.js'),
        this.destinationPath('src/store/reducers.js')
    );
    this.fs.copy(
        this.templatePath('src/store/store.js'),
        this.destinationPath('src/store/store.js')
    );
}

/**
 * Copies the test files to the test folder
 */
function copyTestFiles() {
    // copy the configurate test file
    this.fs.copy(
        this.templatePath('test/test-helper.js'),
        this.destinationPath('test/test-helper.js')
    )
}

/**
 * Installs the project dependencies
 */
function installDependencies() {
    this.npmInstall(dependencies.dependencies, { 'save': true });
}

/**
 * Installs the project dev-dependencies
 */
function installDevDependencies() {
    this.npmInstall(dependencies.devDependencies, { 'save-dev': true });
}

/**
 * Logs running instructions for the project
 */
function runningInstructions() {
    this.log('Your project has been created.');
    this.log('In order to run the project, create a dist/bundle.js file by running "npm compile"');
    this.log('Run webpack-dev-server by running: "npm start"');
    this.log('Go to http://localhost:8080/');
    this.log('For production simply set NODE_ENV=production and execute the above commands again.');
}

module.exports = generator.Base.extend({
    constructor: constructor,
    default: createFolderStructure,
    writing: {
        copyBasicFiles: copyBasicFiles,
        copySourceFiles: copySourceFiles,
        copyTestFiles: copyTestFiles
    },
    install: {
        installDependencies: installDependencies,
        installDevDependencies: installDevDependencies
    },
    end: runningInstructions
});

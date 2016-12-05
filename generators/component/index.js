var path = require('path');
var generator = require('yeoman-generator');
var _ = require('lodash');
var mkdirp = require('mkdirp');

function constructor() {
    generator.Base.apply(this, arguments);

    // register the arguments and the options
    var nameOptions = {
        type: String,
        required: true,
        desc: "The name of the component"
    };
    this.argument("name", nameOptions);

    var commonFlagOptions = {
        desc: "Place the component under the common directory",
        alias: "C",
        type: Boolean,
        defaults: false
    };
    this.option("common", commonFlagOptions);

    var connectedFlagOptions = {
        desc: "Also contains a container that is mapped to the Redux store",
        alias: "c",
        type: Boolean,
        defaults: false
    }
    this.option("connected", connectedFlagOptions);

    var pathOption = {
        desc: 'Place the component at the given path relative to the components folder',
        alias: 'p',
        type: String
    };
    this.option('path', pathOption);
}

function createComponent() {
    // parse the given name to a conventional class name
    componentName = _.upperFirst(_.camelCase(this.name));

    // detemine destination
    var destinationPath = 'src/components';
    if (this.options.common) {
        destinationPath = 'src/components/common';
    }
    if (this.options.path) {
        destinationPath = path.join(destinationPath, this.options.path);
    }
    destinationPath = path.join(destinationPath, componentName);

    // create the component directory
    this.log('creating the component direcory: ', destinationPath);
    mkdirp.sync(this.destinationPath(destinationPath));

    // determine source file
    var sourceFile = '';
    if (this.options.connected) {
        sourceFile = 'connected-component.jsx';
    } else {
        sourceFile = 'component.jsx';
    }

    // create the component file and css files
    var containerName = this.name + 'Container';
    var fileName = path.join(this.destinationPath(destinationPath), componentName);
    this.fs.copyTpl(
        this.templatePath(sourceFile),
        fileName + '.jsx',
        { containerName, componentName }
    );
    this.fs.copy(
        this.templatePath('style.css'),
        fileName + '.css'
    );
}

module.exports = generator.Base.extend({
    constructor: constructor,
    writing: createComponent
})

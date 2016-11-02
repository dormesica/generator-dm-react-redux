# generator-dm-react-redux
Yeoman generator for a React-Redux project

## Installation
``` sh
npm install -g generator-dm-react-redux
```

## Usage
See [react-boilderplate](https://github.com/dormesica/react-boilerplate) for reference 
about the boilderplate this generator is based upon.

First create the folder where the project should be generated.
In this folder run:
```sh
yo dm-react-redux appname
```
This will create the boilerplate into the directory.

### Creating Components
Creates a <code>.jsx</code> file and a <code>.css</code> file 
inside a new folder under the <code>src/components</code> directory.<br>

```sh
yo dm-react-redux:component component_name [flags]
```

possible flags:
<ul>
	<li> <b>common | C</b> - place the component under the common directory (Boolean)
    <li> <b>connected | c</b> - Also contains a container that is mapped to the Redux store (Boolean)
</ul>

### Creating Reducers
Creates a new reducer file in the <code>src/store/reducers</code> directory and 
a test file for this reducer in the <code>test</code> directory.<br>
This commands also configures the new reducer in the <code>combineReducers</code> method of Redux.

```sh
yo dm-react-redux:reducer reducer_name [flags]
```

possible flags:
<ul>
	<li> <b>no-test | N</b> - don't generate test file (Boolean)
</ul>

### Creating Redux Middleware
Creates a new Redux middleware in the <code>src/store/middleware</code> directory.<br>
This command also configures the new middleware in the <code>applyMiddleware</code> method of Redux.

```sh
yo dm-react-redux:middleware middleware_name [flags]
```

Possible flags:
<ul>
	<li><b>not-registered | N</b> - Don't register the middleware in the middleware.js file
</ul>

### Creating Test Files
Creates a new test file in the <code>test</code> directory with the extension <code>.specs.js</code><br>

```sh
yo dm-react-redux:test test_file_name
```

## Running the Project
Create a <code>dist/dunble.js</code> file by running the command:
```sh
npm run build
```

Then, run the webpack-dev-server by executing:
```sh
npm start
```

Go to http://localhost:8080/ to view your project.
<br>

For production the the <code>NODE_ENV</code> variable to <code>production</code> in order to create
a minified version of the <code>bundle.js</code> file.

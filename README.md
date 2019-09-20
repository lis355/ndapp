ndapp - its node application starter helper. It helps you do not write long requires, parse command line arguments, use application with components hierarchy, define your tools or favourte modules to fast access to him (without require in every new file)

ndapp create a global variable **app** - it's yours application with with everything you need 

In new app by default avaliable few modules: path, fs-extra, os, lodash, moment
To use them, in every

```
const ndapp = require("ndapp");
```

Create application
```
ndapp(options)
```
Where _options_ - is object with fields, you can omit **any** option:

* app - instance of your app, use base class:
    ```
    class MyApp extends ndapp.Application {
    };
    
    ndapp({ app: new MyApp() });
    ```

* arguments - command line arguments
    You can define **enum** for your argument list, and define **options** to parse arguments (parsing is provided by module [minimist](https://github.com/substack/minimist))
    ```
    const ARGUMENTS = new ndapp.enum({
        "ARG1": "arg1",
        "ARG2": "arg2"
    });

    ndapp({
        arguments: {
            enum: ARGUMENTS,
            options: {
                boolean: [
                    ARGUMENTS.ARG1,
                    ARGUMENTS.ARG2
                ],
                default: {
                    [ARGUMENTS.ARG1]: false,
                    [ARGUMENTS.ARG2]: false
                }
            }
        }
    });
    ```
    If you provide a enum for arguments, you can acess to arguments by these methods:
    ```
    console.log(app.arguments[app.enums.arguments.ARG1]);
    console.log(app.arguments.ARG1);
    ```    
    Otherwise, you always acess to arguments by it's names (how you will write it in console)
    ```
    console.log(app.arguments.arg1);
    ```
    ```app.arguments``` - it's a minimist result (for example, you can acess to undefined args by app.arguments._)

* enums - define your own enums
    ```
    ndapp({
        enums: {
            myEnum: new ndapp.enum(["MY_ENUM1", "MY_ENUM2"])
        }
    });
    ```

* constants - define your own constants
    ```
    ndapp({
        constants: {
            "MY_CONSTANT": 123
        }
    });
    ```

* libs - define libs
    ```
    ndapp({
        libs: {
            express: require("express")
        }
    });

    const application = app.libs.express();
    ```

    Default libs
    path
    os
    fs (fs-extra)
    _ (lodash)
    moment (moment.js)

* tools - define any function/classes, what you need
    ```
    ndapp({
        tools: {
            convert: x => x * 100
        }
    });

    const result = app.tools.convert(20);
    ```

* components - define application components
    ```
    class MyComponentApp extends ndapp.ApplicationComponent {
        constructor(options) {
            // ...
        }
    };

    ndapp({
        components: [
            new MyComponentApp({ a: 1})
        ]
    });
    ```

Simpliest application will looks like:
```
ndapp()

const data = app.tools.json.load("mydata.js");
```

Complex example:
```
const ARGUMENTS = new ndapp.enum({
	"MY_ARG": "myarg"
});

class MyApp extends ndapp.Application {
};

ndapp({
	info: {
		name: "abb-server",
		version: "2.0.0"
	},
	app: new MyApp(),
	arguments: {
		enum: ARGUMENTS,
		options: {
			boolean: [
				ARGUMENTS.MY_ARG
			],
			default: {
				[ARGUMENTS.MY_ARG]: true
			}
		}
	},
	enums: {
	},
	constants: {
	},
	libs: {
	},
	tools: {
	},
	components: [
	]
});
```
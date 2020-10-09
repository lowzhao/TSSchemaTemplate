
To build a example chat app.

\* make sure you have installed [Angular CLI](https://cli.angular.io/)

\* add environment variable `mongodb_gdg` for your MongoDb, the `gdg_test` database will be used. <br/>
`export mongodb_gdg='<<USERNAME>>:<<PASSWORD>>@<<MONGODB_URL>>'`

Start:
```bash
npm i;
cd web;
npm i;
ng build --prod && 
cd .. && 
npm run serve;
```

<kbd>goto</kbd> http://localhost:3000




start a mongodb atlas server


## Start from scratch
```bash
npm init;
npm install express mongoose apollo-server-express graphql class-validator type-graphql reflect-metadata @typegoose/typegoose body-parser
 --save;
npm install @types/express @types/mongoose @types/body-parser --save-dev;
```
typescript config file.
```json
{
	"compilerOptions": {
		"outDir": "./build",
		"rootDir": ".",
		"experimentalDecorators": true,
    	"emitDecoratorMetadata": true,
		"strictPropertyInitialization": false,
	},
	"exclude": [
		"web/**/*",
	]
}
```

```
mkdir web;
cd web;
ng new ui --directory ./;
ng serve;
```

`angular.json`
```json
{
	"projects": {
		"ui": {
			"architect": {
				"build": {
					"options": {
						"outputPath": "dist/dev"
					},
					"configurations": {
						"production": {
							"outputPath": "dist/production"
						}
					}
				}
			}
		}
	}
}
```

`web/package.json`
```json
{
	"scripts": {
		"bp": "ng build --prod --aot --vendor-chunk --common-chunk --buildOptimizer"
	}
}
```

```
mkdir schema;
mkdir server;
```


#### Adding Apollo to angular
```bash
ng add apollo-angular;
```

A new Angular Module `graphql.module.ts` file should be automatically created

If you do not get this file please visit: https://www.apollographql.com/docs/angular/basics/setup/#installation-without-angular-schematics

#### Adding GraphQL Code Generation Tools
```bash
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript;
npx graphql-codegen init;
```

1. What type of application are you building? `Application built with Angular`
2. Where is your schema? `http://localhost:3000/graphql`
3. Where are your operations and fragments? <kbd>Enter</kbd>
4. Pick plugins: <kbd>Enter</kbd>
5. Where to write the output: <kbd>Enter</kbd>
6. Do you want to generate an introspection file? <kbd>Enter</kbd>
7. How to name the config file? <kbd>Enter</kbd>
8. What script in package.json should run the codegen? `cg`
   1. This allow you to use `npm run cg;` to do code generate from graphql query

```bash
npm i;
```

Create a file with simple query @ `src > app > test.graphql`
```graphql
query Test{
	scho
}
```





### Notes:
1. If you need a MongoDb database use [MongoDb Atlas](https://www.mongodb.com/cloud/atlas) its' free.
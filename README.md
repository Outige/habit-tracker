# npm jest tutorial

```shell
$ sudo apt install npm
$ sudo npm init -y
$ npm i --save-dev jest
$ npm i --save-dev babel-jest @babel/preset-env
$ npm i --save-dev @babel/plugin-transform-modules-commonjs # doesn't seem to be needed
```

Update `package.json`. `"test": "jest"`
```shell
$ npm test
```
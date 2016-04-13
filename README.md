# gulp-cordova-build-windows

> Build the cordova project for the Windows platform.


## Installation

```
$ npm install --save-dev https://github.com/trojanc/gulp-cordova-build-windows.git
```


## Usage

```js
const gulp = require('gulp');
const create = require('gulp-cordova-create');
const plugin = require('gulp-cordova-plugin');
const windows = require('gulp-cordova-build-windows');

gulp.task('build', () => {
    return gulp.src('www')
        .pipe(create())
        .pipe(plugin('org.apache.cordova.dialogs'))
        .pipe(plugin('org.apache.cordova.camera'))
        .pipe(windows());
});
```

This plugin will build the cordova project for the Windows platform.


## API

### Windows([options])

#### options

##### reAdd

Type: `boolean`  
Default: `false`

If the value is `true`, this will cause the Windows platform to be removed and re-added.

#### version

Type: `string`

Windows platform version.


## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.


## License

MIT © TrojanC

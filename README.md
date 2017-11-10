# material-ripple

> Provides a simple function that creates the [material ripple animation](https://material.io/guidelines/motion/choreography.html#choreography-radial-reaction) clicking the given elements  

```js
MaterialRipple.set('.ripple-container');
MaterialRipple.set(['.material-button', '#cta-send'])
```

### [Demo](https://codepen.io/violapeter/pen/OOpmmx)

### Install
```console
npm install material-design-ripple
```

### Usage
###### with plain js 
```html
<script src="https://unpkg.com/material-design-ripple@0.1.0/public/material-ripple.min.js"></script>
```
```js
MaterialRipple.set('.ripple-container');
```

###### npm
```console 
npm install material-design-ripple
```
```js
import set as makeRipple from 'material-design-ripple'; // ES6

...

makeRipple('.material-button');
```

### Developing

Auto transpile/refresh
```console
npm start
```

Build prod
```console
npm run build:prod
```

Build dev
```console
npm run build:dev
```

### License
MIT © [Viola Péter](https://violapeter.hu)
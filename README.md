# hilbert-curve-cli
Print the [Hilbert Curve](https://en.wikipedia.org/wiki/Hilbert_curve) to the console!

![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-banner.png)

[![npm version](https://img.shields.io/npm/v/hilbert-curve-cli)](https://www.npmjs.com/package/hilbert-curve-cli)
[![bundle size](https://img.shields.io/bundlephobia/min/hilbert-curve-cli)](https://bundlephobia.com/package/hilbert-curve-cli)
[![downloads](https://img.shields.io/npm/dy/hilbert-curve-cli)](https://www.npmjs.com/package/hilbert-curve-cli)
[![license](https://img.shields.io/npm/l/hilbert-curve-cli)](https://github.com/spirometaxas/hilbert-curve-cli/blob/main/LICENSE)

Why the console?  Because it's the *cool* way.  

[See All Fractals](https://spirometaxas.com/projects/fractals-cli) in the [fractals-cli](https://www.npmjs.com/package/fractals-cli) project.

## Usage
### Via `npx`:
```
$ npx hilbert-curve-cli <n>
$ npx hilbert-curve-cli <n> [options]
```
where `n >= 1`.

### Via Global Install
```
$ npm install --global hilbert-curve-cli
$ hilbert-curve-cli <n>
$ hilbert-curve-cli <n> [options]
```
where `n >= 1`.

### Via Import
```
$ npm install hilbert-curve-cli
```
then:
```
const hilbert_curve = require('hilbert-curve-cli');
console.log(hilbert_curve.create(<n>);
console.log(hilbert_curve.create(<n>, { 
    rotation: <left|right|flip|standard>,
    line: <bold|double|standard> 
});
```
The config params are optional. 

## Options
### Recursive Step  
```
$ hilbert-curve-cli <n>
```
The first param `<n>` is the recursive step.  `<n>` should be an integer greater than or equal to 1.

#### Examples:
```
$ hilbert-curve-cli 4
```
![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-4.png)

```
$ hilbert-curve-cli 5
```
![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-5.png)

### Rotation
```
$ hilbert-curve-cli <n> --rotate=<left|right|flip|standard>
```
The optional `--rotate` param rotates the Hilbert Curve.  Supported values:

- `left`: Rotate left 90 degrees
- `right`: Rotate right 90 degrees
- `flip`: Rotate 180 degrees
- `standard`: No rotation (default)

#### Example:
```
$ hilbert-curve-cli 5 --rotate=right
```
![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-5-rotate_right.png)

```
$ hilbert-curve-cli 5 --rotate=flip
```
![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-5-rotate_flip.png)

```
$ hilbert-curve-cli 5 --rotate=left
```
![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-5-rotate_left.png)

### Line Type
```
$ hilbert-curve-cli <n> --line=<bold|double|standard>
```
The optional `--line` param draws the Hilbert Curve using different line types.  Supported values:

- `bold`: Draw using bold lines
- `double`: Draw using double lines
- `standard`: Draw using standard lines (default)

#### Examples:
```
$ hilbert-curve-cli 5 --line=bold
```
![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-5-line_bold.png)

```
$ hilbert-curve-cli 5 --line=double
```
![What hilbert-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/hilbert-curve-cli/main/img/hilbert-curve-5-line_double.png)

## Related

#### Main Project
- [fractals-cli](https://www.npmjs.com/package/fractals-cli) - Print 22 Fractals to the console

#### Fractal Shapes
- [sierpinski-triangle-cli](https://www.npmjs.com/package/sierpinski-triangle-cli) - Print the Sierpinski Triangle to the console
- [sierpinski-carpet-cli](https://www.npmjs.com/package/sierpinski-carpet-cli) - Print the Sierpinski Carpet to the console
- [sierpinski-hexagon-cli](https://www.npmjs.com/package/sierpinski-hexagon-cli) - Print the Sierpinski Hexagon to the console
- [hexaflake-cli](https://www.npmjs.com/package/hexaflake-cli) - Print the Hexaflake Fractal to the console
- [koch-snowflake-cli](https://www.npmjs.com/package/koch-snowflake-cli) - Print the Koch Snowflake to the console
- [koch-antisnowflake-cli](https://www.npmjs.com/package/koch-antisnowflake-cli) - Print the Koch Anti-Snowflake to the console
- [triflake-cli](https://www.npmjs.com/package/triflake-cli) - Print the Triflake Fractal to the console

#### Fractal Patterns
- [cantor-set-cli](https://www.npmjs.com/package/cantor-set-cli) - Print the Cantor Set to the console
- [cantor-dust-cli](https://www.npmjs.com/package/cantor-dust-cli) - Print the Cantor Dust Fractal to the console
- [h-tree-cli](https://www.npmjs.com/package/h-tree-cli) - Print the H-Tree Fractal to the console
- [minkowski-sausage-cli](https://www.npmjs.com/package/minkowski-sausage-cli) - Print the Minkowski Sausage to the console
- [t-square-cli](https://www.npmjs.com/package/t-square-cli) - Print the T-Square Fractal to the console
- [vicsek-fractal-cli](https://www.npmjs.com/package/vicsek-fractal-cli) - Print the Vicsek Fractal to the console
- [v-tree-cli](https://www.npmjs.com/package/v-tree-cli) - Print the V-Tree Fractal to the console

#### Space Filling Curves
- [dragon-curve-cli](https://www.npmjs.com/package/dragon-curve-cli) - Print the Dragon Curve to the console
- [moore-curve-cli](https://www.npmjs.com/package/moore-curve-cli) - Print the Moore Curve to the console
- [peano-curve-cli](https://www.npmjs.com/package/peano-curve-cli) - Print the Peano Curve to the console
- [greek-cross-cli](https://www.npmjs.com/package/greek-cross-cli) - Print the Greek Cross Fractal to the console
- [gosper-curve-cli](https://www.npmjs.com/package/gosper-curve-cli) - Print the Gosper Curve to the console
- [sierpinski-arrowhead-cli](https://www.npmjs.com/package/sierpinski-arrowhead-cli) - Print the Sierpinski Arrowhead Curve to the console
- [sierpinski-curve-cli](https://www.npmjs.com/package/sierpinski-curve-cli) - Print the Sierpinski "Square" Curve to the console

## License
- [MIT](https://github.com/spirometaxas/hilbert-curve-cli/blob/main/LICENSE) &copy; [Spiro Metaxas](https://spirometaxas.com)
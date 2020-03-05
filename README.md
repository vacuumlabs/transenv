# transenv
Transform ENV configuration into JavaScript object.

Environment variables are standard way of configuration server apps however they are not much fun to work with. `transenv` helps you transform your ENV configuration into nice JavaScript object with support for:
* conversion to number or boolean
* default values
* human readable errors on missing envs or envs of wrong format
* ability to use .env file in development mode

## Example

### Source (index.js)

```js
import transenv from 'transenv'

console.log('---ENV---')
console.log(process.env)
const config = transenv()(function({str, num, bool}) {
  return {
    apiKey: str('API_KEY'), // Required API_KEY env
    host: str('HOST', 'localhost'), // HOST env with default value
    port: num('PORT', 3000), // numeric env PORT
    disableAuthorization: bool('DISABLE_AUTHORIZATION'), // boolean env
  }
})

console.log('\n---CONFIG---')
console.log(config)
```
### Standard output
```
---ENV---
{ API_KEY: 'very-secret-key',
  PORT: '3124',
  DISABLE_AUTHORIZATION: 'true' }
  
---CONFIG---
{ apiKey: 'very-secret-key',
  host: 'localhost',
  port: 3124,
  disableAuthorization: true }
```

## API

### `transenv({env, path, debug, encoding} = {})(fn({str, num, bool}))`
The optional argument `env` can be used in a place of `process.env`. If the `env` is not specified and the `NODE_ENV` is not set to the `"production"`, the `.env` file is loaded and merged with the actual `process.env` content. The content of `.env` is ignored in the production mode (`NODE_ENV==="production"`).

Other parameters are [dotenv options](https://github.com/motdotla/dotenv#options) and will be propagated.

The return value of `transenv(env?)` is a transformation function providing `fn` with helpers `{str, num, bool}`. The result of calling `transenv(env)(fn)` is the `fn({str, num, bool})`.

### `str(key, default)`
Returns a value of `env[key]` or a `default` if not found. If no `default` is provided, throws an error.

### `num(key, default)`
The same as `str` but converts the value to a number.

### `bool(key)`
The same as `str` but converts the value to a boolean. Default value is always `false`.


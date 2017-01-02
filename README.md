# transenv
Transform ENV into js object.

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

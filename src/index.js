import dotenv from 'dotenv'

export default ({env, path, debug, encoding} = {}) => {
  if (env == null) {
    if (process.env['NODE_ENV'] !== 'production') {
      dotenv.config({path, debug, encoding})
    }
    env = process.env
  }

  const errors = []
  const _val = (transform, key, notFound) => {
    if (env[key] !== undefined) return transform(env[key], key)
    if (notFound !== undefined) return notFound
    errors.push(`Missing env: ${key}`)
    return undefined
  }

  const _str2num = (str, key) => {
    const val = parseInt(str, 10)
    if (isNaN(val)) {
      errors.push(`Numeric ${key} has non-numeric value: ${str}.`)
    } else return val
  }

  const _str2bool = (str, key) => {
    const val = {true: true, false: false}[str]
    if (val == null) {
      errors.push(`Boolean ${key} has non-boolean value: ${str}.`)
    } else return val
  }

  const str = (key, notFound) => _val((x) => x, key, notFound)
  const num = (key, notFound) => _val(_str2num, key, notFound)
  const bool = (key) => _val(_str2bool, key, false)
  return (fn) => {
    const result = fn({str, num, bool})
    if (errors.length > 0) throw new Error(errors.join('\n'))
    else return result
  }
}

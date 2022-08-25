import { PromiseError } from './../util/PromiseError'
import { describe, expect, it } from 'vitest'
describe('JsError', () => {
  it('happy path', () => {
    expect(
      new PromiseError(
        "Cannot set property 'error' of undefined",
        'unhandledrejection',
        'unhandledrejectionError',
        'http://localhost:8080/',
        '75:38',
        ''
      )
    ).toMatchInlineSnapshot(`
      PromiseError {
        "errorType": "unhandledrejectionError",
        "fileName": "http://localhost:8080/",
        "message": "Cannot set property 'error' of undefined",
        "position": "75:38",
        "selector": "",
        "type": "unhandledrejection",
      }
    `)
  })
})

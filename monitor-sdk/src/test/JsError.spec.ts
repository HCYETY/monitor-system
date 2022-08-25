import { JsError } from './../util/JsError'
import { describe, expect, it } from 'vitest'
describe('JsError', () => {
  it('happy path', () => {
    expect(
      new JsError(
        'jsError',
        'http://localhost:8080/',
        "Uncaught TypeError: Cannot set property 'error' of undefined",
        '71:34',
        '',
        'error'
      )
    ).toMatchInlineSnapshot(`
      JsError {
        "errorType": "Uncaught TypeError: Cannot set property 'error' of undefined",
        "fileName": "71:34",
        "message": "jsError",
        "position": "",
        "selector": "error",
        "type": "http://localhost:8080/",
      }
    `)
  })
})

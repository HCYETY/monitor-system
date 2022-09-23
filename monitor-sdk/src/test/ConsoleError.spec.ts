import { ConsoleError } from '../monitor/class/ConsoleError'
import { describe, expect, it } from 'vitest'
describe('JsError', () => {
  it('happy path', () => {
    expect(
      new ConsoleError(
        '错误捕获222',
        27,
        82,
        `Error: 错误捕获222 at bugConsole (http://localhost:8080/:82:27) at HTMLButtonElement.onclick (http://localhost:8080/:21:62)`,
        'http://localhost:8080/'
      )
    ).toMatchInlineSnapshot(`
      ConsoleError {
        "column": 27,
        "message": "错误捕获222",
        "row": 82,
        "stack": "Error: 错误捕获222 at bugConsole (http://localhost:8080/:82:27) at HTMLButtonElement.onclick (http://localhost:8080/:21:62)",
        "url": "http://localhost:8080/",
      }
    `)
  })
})

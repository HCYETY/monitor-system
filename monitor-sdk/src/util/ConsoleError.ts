export class ConsoleError {
  public message: string
  public column: number
  public row: number
  public stack: string
  public url: string
  constructor(message, column, row, stack, url) {
    this.message = message
    this.column = column
    this.row = row
    this.stack = stack
    this.url = url
  }
}

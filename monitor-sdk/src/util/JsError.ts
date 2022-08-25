export class JsError {
  public message: string
  public type: string
  public errorType: string
  public fileName: string
  public position: string
  public selector: string

  constructor(message, type, errorType, fileName, position, selector) {
    this.message = message
    this.type = type
    this.errorType = errorType
    this.fileName = fileName
    this.position = position
    this.selector = selector
  }
}

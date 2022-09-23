export class ResourceError {
  public type: string
  public url: string
  public message: string
  public html: string
  public errorType: string
  public tagName: string
  public selector: string

  constructor(type, url, message, html, errorType, tagName, selector) {
    this.type = type
    this.url = url
    this.message = message
    this.html = html
    this.errorType = errorType
    this.tagName = tagName
    this.selector = selector
  }
}

export class ResourceError {
  private _type
  private _url: string
  private _message: string
  private _html
  private _errorType
  private _tagName
  private _selector

  constructor(type, url, message, html, errorType, tagName, selector) {
    this._type = type
    this._url = url
    this._message = message
    this._html = html
    this._errorType = errorType
    this._tagName = tagName
    this._selector = selector
  }


  public get tagName() {
    return this._tagName
  }
  public set tagName(value) {
    this._tagName = value
  }

  public get errorType() {
    return this._errorType
  }
  public set errorType(value) {
    this._errorType = value
  }
  public get message(): string {
    return this._message
  }
  public set message(value: string) {
    this._message = value
  }

  public get type() {
    return this._type
  }
  public set type(value) {
    this._type = value
  }
  public get url(): string {
    return this._url
  }
  public set url(value: string) {
    this._url = value
  }
  public get html() {
    return this._html
  }
  public set html(value) {
    this._html = value
  }
  public get selector() {
    return this._selector
  }
  public set selector(value) {
    this._selector = value
  }
}
export class JsError {
  private _message
  private _type
  private _errorType
  private _fileName
  private _position
  private _selector

  constructor(message, type, errorType, fileName, position, selector) {
    this._message = message
    this._type = type
    this._errorType = errorType
    this.fileName = fileName
    this.position = position
    this._selector = selector
  }


  get message() {
    return this._message
  }
  set message(value) {
    this._message = value
  }
  get type() {
    return this._type
  }
  set type(value) {
    this._type = value
  }
  get errorType() {
    return this._errorType
  }
  set errorType(value) {
    this._errorType = value
  }
  get fileName() {
    return this._fileName
  }
  set fileName(value) {
    this._fileName = value
  }
  get position() {
    return this._position
  }
  set position(value) {
    this._position = value
  }
  get selector() {
    return this._selector
  }
  set selector(value) {
    this._selector = value
  }
}
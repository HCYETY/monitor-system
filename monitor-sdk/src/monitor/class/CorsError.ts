export class CorsError {

  private _errorType;
  private _type;
  private _message;
  private _url;
  private _method;
  private _status;
  private _response;
  private _request;
  private _params;

  constructor(errorType, type, message, url, method, status, response, request, params) {
    this._errorType = errorType;
    this._type = type;
    this._url = url;
    this._message = message;
    this._method = method;
    this._status = status;
    this._response = response;
    this._request = request;
    this._params = params;
  }

  public get errorType() {
    return this._errorType;
  }
  public set errorType(value) {
    this._errorType = value;
  }
  public get type() {
    return this._type;
  }
  public set type(value) {
    this._type = value;
  }
  public get message() {
    return this._message;
  }
  public set message(value) {
    this._message = value;
  }
  public get url() {
    return this._url;
  }
  public set url(value) {
    this._url = value;
  }
  public get method() {
    return this._method;
  }
  public set method(value) {
    this._method = value;
  }
  public get status() {
    return this._status;
  }
  public set status(value) {
    this._status = value;
  }
  public get response() {
    return this._response;
  }
  public set response(value) {
    this._response = value;
  }
  public get request() {
    return this._request;
  }
  public set request(value) {
    this._request = value;
  }
  public get params() {
    return this._params;
  }
  public set params(value) {
    this._params = value;
  }

}

import { JsError } from './JsError';
export class PromiseError extends JsError {
  constructor(message, type, errorType, fileName, position, selector) {
    super(message, type, errorType, fileName, position, selector);
  }
}
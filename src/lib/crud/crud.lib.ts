import * as service from "./service/index";

class CrudLibrary {
  [key: string]: any;

  constructor() {
    Object.assign(this, service);
  }
}

const crudLibrary = new CrudLibrary();

export default crudLibrary;

import * as service from "./service/index";

class CrudLibrary {
  [key: string]: any;

  constructor() {
    Object.assign(this, service);
  }

  create = service.create;
  getSingle = service.get_single;
  getMany = service.getMany;
  getManyWithPagination = service.getManyWithPagination;
  update = service.update;
  delete = service.deleteData;
}

const crudLibrary = new CrudLibrary();

export default crudLibrary;

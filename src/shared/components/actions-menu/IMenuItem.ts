interface IAction {
  args: Array<any>;
  func: Function;
}

export default interface IMenuItem {
  to?: any;
  action?: IAction;
  text: String;
  icon: String;
  permisos?: Array<String>;
}

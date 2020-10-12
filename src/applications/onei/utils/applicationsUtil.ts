import {$store} from "@/main";

const getApplication = (items: any[], id: string, field: any = "") => {
  const data = items.find((el: any) => el.id === id);

  return (field) ? data[field] : data;
};

const downloadFile = (data: any, name: string): void => {
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${name}`) //or any other extension
  document.body.appendChild(link)
  link.click()
}

const $can = (pAuthorities:Array<String>): boolean => {
  const authorities = $store.getters["@onei.login/authorities"];
  return (authorities.some((elem: any) => pAuthorities.includes(elem)));
}

export {getApplication, downloadFile,$can};


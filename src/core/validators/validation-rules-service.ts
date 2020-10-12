/**
 * Servicio para validar los campos de los formularios
 *
 * solo se han agrupado las reglas que ya estban
 *
 * ejemplo de uso
 *
 * import {passwordConfirm} fom "@validator/validation-rules-service"
 *
 * data(){
 *   rerturn {
 *     rules:{
 *       passwordConfirm:passwordConfirm
 *     }
 *   }
 * }
 * HTML
 * <campo
 * :rules=[rules.passwordConfirm(elPassword)]
 * ></campo>
 * **/


import Validator from "@validator/validator";


// esto es de arnel y el limon creo que son los campos requeridos y que contengan letras y - (apellidos y eso)
const generic = () => {
  return (val: any) => Validator.of(val).required().lettersForRoland().validate;
};

const required = () => {
  return (val: any) => Validator.of(val).required().validate;
};

const passwordConfirm = (passwordValue: any) => {
  return (val: any) => Validator.of(val).required().passwordConfirm(passwordValue).validate;
};

const select = (id = '') => {
  debugger;
  return (val: any) => Validator.of(id !== '' ? val[id] : val).requiredSelected().validate;
};

const email = () => {
  return (val: any) => Validator.of(val).email().validate;
};

const numbersOnlyInteger = () => {
  return (val: any) => Validator.of(Number(val)).numericInteger().validate;
};

const numbers = () => {
  return (val: any) => Validator.of(Number(val)).numeric().validate;
};

const greaterThanEqual = (to: any) => {
  return (val: any) => Validator.of(Number(val)).greaterThanEqual(to).validate;
};

//const lessThanEqual = (val: any) => Validator.of(val).numeric().validate;

export {
  generic, required, email, greaterThanEqual, numbers,
  numbersOnlyInteger, passwordConfirm, select
}

import {$i18n} from "@/main";

const Emailconstraint = {
  email: true,
};

const Requiredconstraint = {
  presence: {allowEmpty: false},
};

const NumberIntegerconstraint = {
  numericality: {
    onlyInteger: true,
    strict: true,
    noStrings: true
  }
};

const Numberconstraint = {
  numericality: {
    strict: true,
    noStrings: true
  }
};

const ConfirmPasswordconstraint = {
  "passwordConfirm": {
    equality: "password",
  }
};

const greaterThanEqualConstraint = {
  value: {
    numericality: {
      strict: true,
      noStrings: true,
      greaterThanOrEqualTo: 1
    }
  }
};

const RequiredSelectedconstraint = {
  presence: {allowEmpty: false},
  exclusion: {
    within: [-1],
    message: $i18n.t('validations.required')
  }
}

const StrongerPassword = {
  length: {minimum: 8},
  format: {
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])",
    message: "",
  }
}

const LettersForRolandconstraint = {
  format: {
    pattern: "(([a-zA-ZñÑáéíóúÁÉÍÓÚ])+([\-])?)*[a-zA-ZñÑáéíóúÁÉÍÓÚ]+",
    message: $i18n.t('validations.lettersForRoland'),
  }
}

const Lettersconstraint = {
  format: {
    pattern: "(([a-zA-ZñÑáéíóúÁÉÍÓÚ])+([' '])?)*[a-zA-ZñÑáéíóúÁÉÍÓÚ]+",
    message: $i18n.t('validations.letters'),
  }
}
const Vacio_not_requiredConstraint = {
  format: {
    pattern: "(([a-zA-ZñÑáéíóúÁÉÍÓÚ])+([' '])?)*[a-zA-ZñÑáéíóúÁÉÍÓÚ]*",
    message: $i18n.t('validations.letters'),
  }
}

export {
  Emailconstraint, Requiredconstraint, NumberIntegerconstraint,
  Numberconstraint, ConfirmPasswordconstraint, RequiredSelectedconstraint,
  StrongerPassword, LettersForRolandconstraint, Lettersconstraint, greaterThanEqualConstraint,Vacio_not_requiredConstraint
}

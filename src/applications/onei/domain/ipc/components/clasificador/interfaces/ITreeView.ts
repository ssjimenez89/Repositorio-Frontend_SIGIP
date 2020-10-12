export interface IClassifier {
  id: number;
  name: string;
  childrens: IClassifier[];
  active: boolean;
  level: number;
  parent: string;
  oneiIndex: number;
  index: number;
  code: string;
  classifierType: ClassifierType;
}

export interface IClassifierInput {
  id: number;
  description: string;
  action: string;
  parent: number;
  oneiIndex?: number;
  weights?: IClassifierWeighingInput[];
  varietyType?: number;
  idclassifierType: number;
  code: string;
  marketCurrencies?:[];
  varietyCharactSpecifics?:[];
  specifics?:[]
}

export interface IClassifierWeighingInput {
  id?: number;
  weighing: number;
  currency: number;
  value: number;
}

export interface IMoneda {
  id?: number;
  acronym?: string;
  description: string;
}


export interface IPonderacion {
  id?: number;
  description: string;
}

export interface IComboCombination {
  moneda: IMoneda;
  ponderacion: IPonderacion;
}

export interface IPonderacionTable {
  value: number;
  currency?: IMoneda;
  weighingType?: IPonderacion;
}

export interface ClassifierType {
  id: number;
  description: string;
  active: boolean;
  codeClassifier: string;
}

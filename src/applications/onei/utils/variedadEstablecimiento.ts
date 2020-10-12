const variedadEstabUtils = {
  getUmAndCant: function (specs: Array<any>)  {
    const UM = this.getSpecsById(193, specs);
    const cant = this.getSpecsById(126, specs);

    return {cant: this.getValueOfSpec(cant), um: this.getValueOfSpec(UM)}
  },
  getSpecsById: (id: number, specs: Array<any>) => {
    return specs.filter(e => {
      return e.carac.id === id
    });
  },
  getValueOfSpec: (spec: any) => {
    return spec.length > 0 ? spec[0].spec : '-';
  }
};

export  {variedadEstabUtils}

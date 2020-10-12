const mixinTest = {
  data(){
    return {
      pepe:'pro el mixin'
    }
  }
};


const useFilter: any = {
  bind: function (el: any, binding: any, vNode: any) {
    let {componentInstance} = vNode;
    componentInstance.directiveTest = 'la tiza ppaaa';
    debugger;
    componentInstance.popo = 'lplp';

  }
};

export {useFilter};

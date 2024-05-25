class GestaoPedestresCiclistas {
    constructor() {
      this.pedestres = [];
      this.ciclistas = [];
    }
  
    addPedestre(nome) {
      this.pedestres.push(nome);
    }
  
    addCiclista(nome) {
      this.ciclistas.push(nome);
    }
  
    removerPedestre(nome) {
      this.pedestres = this.pedestres.filter(p => p !== nome);
    }
  
    removerCiclista(nome) {
      this.ciclistas = this.ciclistas.filter(c => c !== nome);
    }
  
    getPedestres() {
      return this.pedestres;
    }
  
    getCiclistas() {
      return this.ciclistas;
    }
  
    cruzamentoPerigoso() {
      const numPedestres = this.pedestres.length;
      const numCiclistas = this.ciclistas.length;
  
      return numPedestres > 0 && numCiclistas > 0;
    }
  }
  
  module.exports = GestaoPedestresCiclistas;

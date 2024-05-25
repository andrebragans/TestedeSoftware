const GestaoPedestresCiclistas = require('../src/gestao');

describe('Gestão de Pedestres e Ciclistas', () => {
  let gestao;

  beforeEach(() => {
    gestao = new GestaoPedestresCiclistas();
  });

  test('Adicionar e obter pedestres', () => {
    gestao.addPedestre('Pedro');
    gestao.addPedestre('Maria');
    expect(gestao.getPedestres()).toEqual(['Pedro', 'Maria']);
  });

  test('Adicionar e obter ciclistas', () => {
    gestao.addCiclista('João');
    gestao.addCiclista('Ana');
    expect(gestao.getCiclistas()).toEqual(['João', 'Ana']);
  });

  test('Remover pedestre', () => {
    gestao.addPedestre('Pedro');
    gestao.removerPedestre('Pedro');
    expect(gestao.getPedestres()).toEqual([]);
  });

  test('Remover ciclista', () => {
    gestao.addCiclista('João');
    gestao.removerCiclista('João');
    expect(gestao.getCiclistas()).toEqual([]);
  });

  test('Verificar cruzamento perigoso', () => {
    gestao.addPedestre('Pedro');
    gestao.addCiclista('João');
    expect(gestao.cruzamentoPerigoso()).toBe(true);
  });

  test('Verificar cruzamento não perigoso', () => {
    gestao.addPedestre('Pedro');
    expect(gestao.cruzamentoPerigoso()).toBe(false);
  });
});

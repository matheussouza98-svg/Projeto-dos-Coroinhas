const presencas = {};

export function getPresencasSessao() {
  return { ...presencas };
}

export function salvarPresencaSessao(presenca) {
  if (presenca?.activityKey) {
    presencas[presenca.activityKey] = presenca;
  }
  return getPresencasSessao();
}

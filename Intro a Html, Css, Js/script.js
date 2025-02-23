// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 2, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 3, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 4, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 5, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 6, formato: "duplo", status: true, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 7, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 8, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  armarioSorteado.status = false;
  
  let dataAtual = new Date();
  let dataEntrega = new Date(dataAtual.getTime() + 24 * 60 * 60 * 1000);
  
  armarioSorteado.dataReserva = dataAtual;
  armarioSorteado.dataEntrega = dataEntrega;
  
  usuario.pendencia = true;
  
  let opcoesFormato = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  let dataReservaFormatada = dataAtual.toLocaleString('pt-BR', opcoesFormato);
  let dataEntregaFormatada = dataEntrega.toLocaleString('pt-BR', opcoesFormato);
  
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!\nData da reserva: ${dataReservaFormatada}\nData de entrega: ${dataEntregaFormatada}`;
  
  console.log(usuario);
  console.log(armarios);
}

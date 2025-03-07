async function buscarOS() {
    const numeroSolicitacao = document.getElementById("numeroSolicitacao").value;
    const response = await fetch(`https://script.google.com/macros/s/AKfycbzJEvsUi_0moOeD_x5fFlcvOp4IHoJWhpf29MbF8B9PnR5k7_vwtqz1LTY8oenng3g1/exec?numero=${numeroSolicitacao}`);
    const osData = await response.json();
    
    if (osData.sucesso) {
        let locaisInstalacao = osData.locais ? osData.locais.map(local => `<p><strong>${local.nome}:</strong> ${local.valor}</p>`).join('') : '';

        document.getElementById("dadosOS").innerHTML = ` 
            <p><strong>Tipo de Manutenção:</strong> ${osData.tipoManutencao}</p>
            <p><strong>Prioridade:</strong> ${osData.prioridade}</p>
            <p><strong>Solicitante:</strong> ${osData.solicitante}</p>
            <p><strong>Setor:</strong> ${osData.setor}</p>
            <p><strong>Descrição do Serviço:</strong> ${osData.descricao}</p>
            ${locaisInstalacao}
            <p><strong>Informações Complementares:</strong> ${osData.informacoesComplementares}</p>
        `;
    } else {
        document.getElementById("dadosOS").innerHTML = "OS não encontrada.";
    }
}

async function salvarApontamento() {
    const apontamento = {
        numeroSolicitacao: document.getElementById("numeroSolicitacao").value,
        dataHoraInicial: document.getElementById("dataHoraInicial").value,
        dataHoraFinal: document.getElementById("dataHoraFinal").value,
        manutentor: document.getElementById("manutentor").value,
        centroTrabalho: document.getElementById("centroTrabalho").value,
        ordemConcluida: document.getElementById("ordemConcluida").value,
        observacao: document.getElementById("observacao").value
    };

    const response = await fetch("https://script.google.com/macros/s/AKfycbzJEvsUi_0moOeD_x5fFlcvOp4IHoJWhpf29MbF8B9PnR5k7_vwtqz1LTY8oenng3g1/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(apontamento)
    });

    const result = await response.json();
    alert(result.mensagem);
}

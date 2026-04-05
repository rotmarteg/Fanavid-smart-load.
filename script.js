const limitesVeiculos = {
"carreta": 33.00,
"truck": 22.00,
"vlc": 12.00
};

// Medidas e pesos oficiais que definimos
const racks = {
ethos: { area: (1.10 * 1.20), peso: 450 },
juandi: { area: (1.10 * 1.15), peso: 420 },
comax: { area: (1.15 * 1.15), peso: 380 }
};

function calcularCarga() {
const veiculo = document.getElementById('veiculo').value;
const empilhado = document.getElementById('empilhado').checked;
const display = document.getElementById('resultado');

// Captura valores ou define como 0 se estiver vazio
const qE = parseInt(document.getElementById('qEthos').value) || 0;
const qJ = parseInt(document.getElementById('qJuandi').value) || 0;
const qC = parseInt(document.getElementById('qComax').value) || 0;

if (qE + qJ + qC === 0) {
alert("Insira a quantidade de pelo menos um rack.");
return;
}

// Cálculos Totais
let areaTotal = (qE * racks.ethos.area) + (qJ * racks.juandi.area) + (qC * racks.comax.area);
let pesoTotal = (qE * racks.ethos.peso) + (qJ * racks.juandi.peso) + (qC * racks.comax.peso);

// Lógica de espaço no chão
let areaNoChao = empilhado ? (areaTotal / 2) : areaTotal;
let ocupacao = (areaNoChao / limitesVeiculos[veiculo]) * 100;
let qtdCaminhoes = Math.ceil(ocupacao / 100);

display.style.display = "block";
display.innerHTML = `
<div style="border: 2px dashed #2e7d32; padding: 20px; text-align: center; background: white; border-radius: 15px;">
<p style="color: #2e7d32; font-weight: bold; margin-bottom: 10px;">RELATÓRIO DE EXPEDIÇÃO</p>
<p style="font-size: 0.85em; color: #666;">Carga Mista: ${qE} Ethos | ${qJ} Juandi | ${qC} Comax</p>
<p style="margin: 10px 0;">Peso Total: <strong style="color: blue;">${(pesoTotal/1000).toFixed(2)} Toneladas</strong></p>
<hr style="border: 0; border-top: 1px solid #eee;">
<h4 style="margin: 10px 0; color: #d32f2f;">FROTA NECESSÁRIA:</h4>
<h1 style="margin: 0; color: #d32f2f; font-size: 2.5em;">${qtdCaminhoes}</h1>
<p style="font-weight: bold;">Unidade(s) de ${veiculo.toUpperCase()}</p>
<p style="font-size: 0.9em; color: #444; margin-top: 10px;">Ocupação total: <strong>${ocupacao.toFixed(1)}%</strong></p>
<div style="margin-top: 15px; font-size: 0.8em; padding: 5px; background: ${ocupacao > 100 ? '#fff3e0' : '#e8f5e9'}; border-radius: 5px;">
${ocupacao > 100 ? "⚠️ ATENÇÃO: CARGA DIVIDIDA EM MAIS VEÍCULOS" : "✅ CARGA TOTALMENTE ACOMODADA"}
</div>
</div>
`;};
let chartVendas;

// Formatar data DD/MM/YYYY
function formatarData(dataISO) {
    const d = new Date(dataISO);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Carregar resumo (cartões)
async function carregarResumo(filtros = {}) {
    try {
        const res = await fetch('/api/dashboard/resumo?' + new URLSearchParams(filtros));
        const data = await res.json();

        document.getElementById('cartTotalVendas').innerText = data.totalVendas;
        document.getElementById('cartFaturamento').innerText = 'R$ ' + data.faturamento.toFixed(2);
        document.getElementById('cartCusto').innerText = 'R$ ' + data.custo.toFixed(2);
        document.getElementById('cartLucro').innerText = 'R$ ' + data.lucro.toFixed(2);
    } catch (err) {
        console.error(err);
    }
}

// Carregar gráfico de vendas
async function carregarGrafico(filtros = {}) {
    try {
        const res = await fetch('/api/dashboard/vendas?' + new URLSearchParams(filtros));
        const dados = await res.json();

        const vendasPorData = {};
        dados.forEach(v => {
            const data = formatarData(v.data_venda);
            if (!vendasPorData[data]) vendasPorData[data] = 0;
            vendasPorData[data] += Number(v.vlr_total);
        });

        const labels = Object.keys(vendasPorData);
        const values = Object.values(vendasPorData);

        const ctx = document.getElementById('vendasMensais').getContext('2d');
        if (chartVendas) chartVendas.destroy();

        chartVendas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Vendas (R$)',
                    data: values,
                    backgroundColor: '#0061A2',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });

    } catch (err) {
        console.error(err);
    }
}

// Carregar tabela de vendas recentes
async function carregarTabela(filtros = {}) {
    try {
        const res = await fetch('/api/dashboard/vendas?' + new URLSearchParams(filtros));
        const dados = await res.json();

        const tbody = document.getElementById('tabelaVendasRecentes').querySelector('tbody');
        tbody.innerHTML = '';

        dados.forEach(v => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${formatarData(v.data_venda)}</td>
        <td>${v.produto}</td>
        <td>${v.qtd}</td>
        <td>R$ ${Number(v.vlr_total).toFixed(2)}</td>
        <td>${v.usuario}</td>
      `;
            tbody.appendChild(tr);
        });

    } catch (err) {
        console.error(err);
    }
}

// Aplicar filtros
document.getElementById('btnAplicarFiltros').addEventListener('click', () => {
    const filtros = {
        ano: document.getElementById('filtroAno').value,
        mes: document.getElementById('filtroMes').value,
        dia: document.getElementById('filtroDia').value
    };

    carregarResumo(filtros);
    carregarGrafico(filtros);
    carregarTabela(filtros);
});

// Carregar inicial
document.addEventListener('DOMContentLoaded', () => {
    carregarResumo();
    carregarGrafico();
    carregarTabela();
});

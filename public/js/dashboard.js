document.addEventListener("DOMContentLoaded", () => {

    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const btnAplicar = document.getElementById("btnAplicarFiltros");
    const btnHoje = document.getElementById("btnHoje");
    const btnPDF = document.getElementById("btnPDF");

    // CARDS (ATUALIZADO)
    const cardItens = document.getElementById("card-itens");
    const cardFaturamento = document.getElementById("card-faturamento");
    const cardLucro = document.getElementById("card-lucro");

    const tbody = document.getElementById("ultimas-vendas-body");

    let chartLinha = null;
    let chartBarra = null;
    let chartPizza = null;

    const ctxLinha = document.getElementById("chartLinha").getContext("2d");
    const ctxBarra = document.getElementById("chartBarra").getContext("2d");
    const ctxPizza = document.getElementById("chartPizza").getContext("2d");

    const br = n => Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2 });

    async function carregar(params = {}) {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`/api/dashboard/summary?${query}`);

        if (!response.ok) return;

        const data = await response.json();

        // ===== CARDS (ATUALIZADO) =====
        cardItens.textContent = data.items_sold;
        cardFaturamento.textContent = br(data.faturamento);
        cardLucro.textContent = br(data.lucro);

        // ===== TABELA =====
        tbody.innerHTML = "";
        data.latestSales.forEach(v => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${v.id_vendas}</td>
                <td>${v.data_venda}</td>
                <td>${v.produto_nome}</td>
                <td>${v.qtd}</td>
                <td>R$ ${br(v.valor_unitario)}</td>
                <td>R$ ${br(v.vlr_total)}</td>
            `;
            tbody.appendChild(tr);
        });

        // ===== GRÁFICO LINHA =====
        const labels = data.chart.map(d => d.dia);
        const valores = data.chart.map(d => d.faturamento);

        if (chartLinha) chartLinha.destroy();
        chartLinha = new Chart(ctxLinha, {
            type: "line",
            data: { labels, datasets: [{ data: valores, borderWidth: 3 }] }
        });

        // ===== GRÁFICO BARRA =====
        if (chartBarra) chartBarra.destroy();
        chartBarra = new Chart(ctxBarra, {
            type: "bar",
            data: { labels, datasets: [{ data: valores }] }
        });

        // ===== GRÁFICO PIZZA =====
        if (chartPizza) chartPizza.destroy();
        chartPizza = new Chart(ctxPizza, {
            type: "pie",
            data: {
                labels: data.produtosVendidos.map(p => p.produto),
                datasets: [{ data: data.produtosVendidos.map(p => p.total) }]
            }
        });
    }

    // FILTROS
    btnAplicar.addEventListener("click", () => {
        carregar({ start: startDate.value, end: endDate.value });
    });

    btnHoje.addEventListener("click", () => {
        const hoje = new Date().toISOString().split("T")[0];
        startDate.value = hoje;
        endDate.value = hoje;
        carregar({ start: hoje, end: hoje });
    });

    // PDF
    btnPDF.addEventListener("click", () => {
        const start = startDate.value || "";
        const end = endDate.value || "";

        window.open(`/api/dashboard/pdf?start=${start}&end=${end}`, "_blank");
    });

    carregar({});
});

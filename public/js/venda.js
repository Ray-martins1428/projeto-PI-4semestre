// ===============================
//  CARREGAR PRODUTOS DO BACKEND
// ===============================
async function carregarProdutos() {
    try {
        const resposta = await fetch("/api/vendas/produtos");
        const produtos = await resposta.json();

        const select = document.getElementById("produto");
        select.innerHTML = `<option value="">Selecione um produto</option>`;

        produtos.forEach(p => {
            const option = document.createElement("option");
            option.value = p.id_produtos;

            const estoque = (typeof p.estoque_saldo !== "undefined") ? p.estoque_saldo : 0;
            option.textContent = `${p.nome} (${p.volume || ""}) - Estoque: ${estoque}`;

            option.dataset.preco = p.valor;
            option.dataset.estoque = String(estoque);

            select.appendChild(option);
        });

        validarEstoque();

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        alert("Não foi possível carregar os produtos. Verifique o servidor.");
    }
}

carregarProdutos();

// ===============================
//  ATUALIZAR PREÇO UNITÁRIO
// ===============================
document.getElementById("produto").addEventListener("change", () => {
    const option = document.querySelector("#produto option:checked");

    if (!option || !option.value) {
        document.getElementById("preco-unitario").value = "";
        document.getElementById("preco-total").value = "0.00";
        validarEstoque();
        return;
    }

    const preco = Number(option.dataset.preco || 0);
    document.getElementById("preco-unitario").value = preco.toFixed(2);

    calcularTotal();
    validarEstoque();
});

// ===============================
//  CALCULAR PREÇO TOTAL
// ===============================
document.getElementById("quantidade").addEventListener("input", () => {
    calcularTotal();
    validarEstoque();
});

function calcularTotal() {
    const preco = Number(document.getElementById("preco-unitario").value);
    const qtd = Number(document.getElementById("quantidade").value);

    if (qtd <= 0 || isNaN(qtd)) {
        document.getElementById("preco-total").value = "0.00";
        return;
    }

    const total = preco * qtd;
    document.getElementById("preco-total").value = total.toFixed(2);
}

// ===============================
//  VALIDAR ESTOQUE
// ===============================
function validarEstoque() {
    const select = document.getElementById("produto");
    const option = select.options[select.selectedIndex];
    const qtd = Number(document.getElementById("quantidade").value) || 0;
    const estoque = Number(option?.dataset?.estoque || 0);

    const btn = document.querySelector("button[type='submit']");
    if (!btn) return;

    if (!option || !option.value || qtd <= 0) {
        btn.disabled = true;
        document.getElementById("quantidade").style.border = "1px solid #ccc";
        return;
    }

    if (estoque === 0 || qtd > estoque) {
        btn.disabled = true;
        document.getElementById("quantidade").style.border = "2px solid red";
        document.getElementById("quantidade").title = `Estoque disponível: ${estoque}`;
    } else {
        btn.disabled = false;
        document.getElementById("quantidade").style.border = "2px solid green";
        document.getElementById("quantidade").title = "";
    }
}

// ===============================
//  ENVIAR VENDA PARA O SERVIDOR
// ===============================
document.getElementById("form-venda").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const option = document.querySelector("#produto option:checked");
        const id_produto = option?.value;
        const quantidade = Number(document.getElementById("quantidade").value);
        const forma_pagamento = Number(document.querySelector("input[name='pagamento']:checked")?.value);
        const preco_unitario = Number(document.getElementById("preco-unitario").value);
        const preco_total = Number(document.getElementById("preco-total").value);
        const estoque = Number(option?.dataset?.estoque || 0);

        // VALIDAÇÕES
        if (!id_produto) return alert("Selecione um produto.");
        if (!forma_pagamento) return alert("Selecione a forma de pagamento.");
        if (quantidade <= 0) return alert("Quantidade inválida.");
        if (quantidade > estoque) return alert(`Estoque insuficiente! Estoque atual: ${estoque}.`);
        if (preco_unitario <= 0) return alert("Preço unitário inválido.");
        if (preco_total <= 0) return alert("Preço total inválido.");

        const venda = {
            id_produto,
            quantidade,
            forma_pagamento, // agora número
            preco_unitario,
            preco_total,
            id_usuario: 1 // temporário
        };

        const resposta = await fetch("/api/vendas/nova", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(venda)
        });

        const data = await resposta.json();

        if (data.erro) {
            alert("❌ " + data.erro);
        } else {
            alert("✅ " + data.mensagem);
            document.getElementById("form-venda").reset();
            document.getElementById("preco-unitario").value = "";
            document.getElementById("preco-total").value = "";
            carregarProdutos(); // atualizar estoque
        }

    } catch (error) {
        console.error("Erro ao enviar venda:", error);
        alert("Erro ao enviar venda. Verifique o servidor.");
    }
});

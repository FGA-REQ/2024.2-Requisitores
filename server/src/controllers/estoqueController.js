const { db } = require('../utils/dbUtils');
const util = require('util');

const dbRun = util.promisify(db.run).bind(db);
const dbGet = util.promisify(db.get).bind(db);
const dbAll = util.promisify(db.all).bind(db);

// 🔹 Função para remover os exemplos genéricos
const limparExemplos = async () => {
    try {
        await dbRun("DELETE FROM Estoque WHERE nome IN ('Remédio A', 'Remédio B', 'Remédio C')");
        console.log("✅ Exemplos genéricos removidos!");
    } catch (error) {
        console.error("❌ Erro ao remover exemplos genéricos:", error);
    }
};

// 🔹 Listar todos os produtos do estoque
exports.getEstoques = async (req, res) => {
    try {
        await limparExemplos(); // Limpa os exemplos antes de listar
        const estoques = await dbAll('SELECT * FROM Estoque');
        res.json({ estoques });
    } catch (error) {
        console.error("❌ Erro ao buscar estoques:", error);
        res.status(500).json({ error: "Erro ao buscar estoques" });
    }
};

exports.getEstoqueById = async (req, res) => {
    const { id } = req.params;
    try {
        db.get('SELECT * FROM Estoque WHERE ID_Estoque = ?', [id], (err, row) => {
            if (err) return res.status(500).json({ error: "Erro ao buscar estoque" });
            if (!row) return res.status(404).json({ error: "Estoque não encontrado" });
            res.json({ estoque: row });
        });
    } catch (error) {
        console.error("Erro ao buscar estoque:", error);
        res.status(500).json({ error: "Erro ao buscar estoque" });
    }
};

// 🔹 Adicionar um novo produto ao estoque
exports.addEstoque = async (req, res) => {
    const { nome, quantidade } = req.body;

    if (!nome || !quantidade || isNaN(quantidade)) {
        return res.status(400).json({ error: "Nome e quantidade válida são obrigatórios." });
    }

    try {
        const result = await dbRun('INSERT INTO Estoque (nome, quantidade) VALUES (?, ?)', [nome, quantidade]);
        res.status(201).json({ message: "Produto cadastrado no estoque com sucesso!", id: result.lastID });
    } catch (error) {
        console.error("❌ Erro ao adicionar produto ao estoque:", error);
        res.status(500).json({ error: "Erro ao adicionar produto ao estoque." });
    }
};

// 🔹 Atualizar informações do estoque
exports.updateEstoque = async (req, res) => {
    const { id } = req.params;
    const { nome, quantidade } = req.body;

    if (!nome || !quantidade || isNaN(quantidade)) {
        return res.status(400).json({ error: "Nome e quantidade válida são obrigatórios." });
    }

    try {
        const result = await dbRun('UPDATE Estoque SET nome = ?, quantidade = ? WHERE ID_Estoque = ?', [nome, quantidade, id]);

        result.changes > 0
            ? res.json({ message: "Estoque atualizado com sucesso!" })
            : res.status(404).json({ error: "Produto não encontrado no estoque." });

    } catch (error) {
        console.error("❌ Erro ao atualizar estoque:", error);
        res.status(500).json({ error: "Erro ao atualizar estoque." });
    }
};

// 🔹 Deletar um produto do estoque
exports.deleteEstoque = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await dbRun('DELETE FROM Estoque WHERE ID_Estoque = ?', [id]);

        result.changes > 0
            ? res.json({ message: "Produto removido do estoque com sucesso!" })
            : res.status(404).json({ error: "Produto não encontrado." });

    } catch (error) {
        console.error("❌ Erro ao deletar estoque:", error);
        res.status(500).json({ error: "Erro ao deletar estoque." });
    }
};

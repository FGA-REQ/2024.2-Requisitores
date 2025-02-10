const { db } = require('../utils/dbUtils');
const util = require('util');

const dbRun = util.promisify(db.run).bind(db);
const dbGet = util.promisify(db.get).bind(db);
const dbAll = util.promisify(db.all).bind(db);

// 🔹 Listar todos os ajustes de estoque
exports.getAjustesEstoque = async (req, res) => {
    try {
        const ajustes = await dbAll('SELECT * FROM Ajuste_Estoque');
        res.json({ ajustes });
    } catch (error) {
        console.error("❌ Erro ao buscar ajustes de estoque:", error);
        res.status(500).json({ error: "Erro ao buscar ajustes de estoque" });
    }
};

// 🔹 Buscar ajuste específico por ID
exports.getAjusteEstoqueById = async (req, res) => {
    const { id } = req.params;
    try {
        const ajuste = await dbGet('SELECT * FROM Ajuste_Estoque WHERE ID_Ajuste = ?', [id]);
        ajuste ? res.json({ ajuste }) : res.status(404).json({ error: "Ajuste não encontrado" });
    } catch (error) {
        console.error("❌ Erro ao buscar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao buscar ajuste de estoque" });
    }
};

// 🔹 Criar um novo ajuste de estoque
exports.addAjusteEstoque = async (req, res) => {
    const { ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa } = req.body;

    if (!ID_Usuario || !ID_Lote || !TipoAjuste || !Quantidade || !Local) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        const result = await dbRun(
            'INSERT INTO Ajuste_Estoque (ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa) VALUES (?, ?, ?, ?, ?, ?)',
            [ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa]
        );

        res.status(201).json({ message: "Ajuste cadastrado com sucesso!", id: result.lastID });
    } catch (error) {
        console.error("❌ Erro ao adicionar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao adicionar ajuste de estoque" });
    }
};

// 🔹 Atualizar um ajuste de estoque
exports.updateAjusteEstoque = async (req, res) => {
    const { id } = req.params;
    const { ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa } = req.body;

    try {
        const result = await dbRun(
            'UPDATE Ajuste_Estoque SET ID_Usuario = ?, ID_Lote = ?, TipoAjuste = ?, Quantidade = ?, Local = ?, Justificativa = ? WHERE ID_Ajuste = ?',
            [ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa, id]
        );

        result.changes > 0
            ? res.json({ message: "Ajuste atualizado com sucesso!" })
            : res.status(404).json({ error: "Ajuste não encontrado." });

    } catch (error) {
        console.error("❌ Erro ao atualizar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao atualizar ajuste de estoque" });
    }
};

// 🔹 Deletar um ajuste de estoque
exports.deleteAjusteEstoque = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await dbRun('DELETE FROM Ajuste_Estoque WHERE ID_Ajuste = ?', [id]);

        result.changes > 0
            ? res.json({ message: "Ajuste deletado com sucesso!" })
            : res.status(404).json({ error: "Ajuste não encontrado." });

    } catch (error) {
        console.error("❌ Erro ao deletar ajuste de estoque:", error);
        res.status(500).json({ error: "Erro ao deletar ajuste de estoque" });
    }
};

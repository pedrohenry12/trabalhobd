const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/trabalhoBD", { // Conectando ao banco de dados
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado ao banco de dados com sucesso.");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}

// Chame a função de conexão
connectToDatabase();

// Definindo o esquema de login
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garante que o email seja único
    },
    senha: {
        type: String,
        required: true,
    },
});

// Criando o modelo a partir do esquema
const FormCollection = mongoose.model("Form", LoginSchema);

// Exportando o modelo para uso em outros arquivos
module.exports = FormCollection;

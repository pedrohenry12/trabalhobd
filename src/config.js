const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/trabalhoBD", { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado ao banco de dados com sucesso.");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1); 
    }
}

connectToDatabase();


const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    senha: {
        type: String,
        required: true,
    },
    data: { 
        timestamps: true,
    },
});



const FormCollection = mongoose.model("Form", LoginSchema);


module.exports = FormCollection;

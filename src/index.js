const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const FormCollection = require("./config"); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("form");
});

app.post("/form", async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body); 
        const hashedPassword = await bcrypt.hash(req.body.senha, 10);

        const data = {
            name: req.body.nome,
            email: req.body.email,
            senha: hashedPassword
        };

        const userdata = await FormCollection.create(data); 
        console.log("Dados inseridos:", userdata); 

        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro ao cadastrar usuário");
    }
});

// Iniciar o servidor
const port = 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});

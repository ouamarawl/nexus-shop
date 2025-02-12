const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Pour éviter les problèmes CORS avec React

// Configuration de la base de données
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "base_de_donnees",
});

// Connexion à MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Erreur de connexion à la base de données:", err.message);
        process.exit(1); // Stoppe le serveur si la BDD ne fonctionne pas
    } else {
        console.log("✅ Connecté à MySQL !");
    }
});

// Middleware pour vérifier si la connexion est active avant d'exécuter une requête
const checkDBConnection = (req, res, next) => {
    if (!db || db.state === "disconnected") {
        return res.status(500).json({ message: "Erreur : base de données non connectée" });
    }
    next();
};
// gestion des produits 
// Route pour récupérer tous les produits
app.get("/api/produits", checkDBConnection, (req, res) => {
    db.query("SELECT * FROM produits", (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des produits:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json(result);
    });
});

// Route pour récupérer un produit par son ID
app.get("/api/produits/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;
    
    db.query("SELECT * FROM produits WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération du produit:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json(result[0]);
    });
});

// Route pour ajouter un produit
app.post("/api/produits", checkDBConnection, (req, res) => {
    const { titre, description, prix, image } = req.body;
    
    if (!titre || !description || !prix || !image) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "INSERT INTO produits (titre, description, prix, image) VALUES (?, ?, ?, ?)",
        [titre, description, prix, image],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout du produit:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(201).json({ message: "Produit ajouté avec succès !" });
        }
    );
});

// Route pour modifier un produit
app.put("/api/produits/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;
    const { titre, description, prix, image } = req.body;

    if (!titre || !description || !prix || !image) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "UPDATE produits SET titre = ?, description = ?, prix = ?, image = ? WHERE id = ?",
        [titre, description, prix, image, id],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de la modification du produit:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(200).json({ message: "Produit modifié avec succès !" });
        }
    );
});

// Route pour supprimer un produit
app.delete("/api/produits/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;
    
    db.query("DELETE FROM produits WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du produit:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json({ message: "Produit supprimé avec succès !" });
    });
});





// gestion des utilisateurs 

// Route pour récupérer tous les utilisateurs
app.get("/api/users", checkDBConnection, (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des utilisateurs:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json(result);
    });
});

// Route pour récupérer un utilisateur par ID
app.get("/api/users/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'utilisateur:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(result[0]);
    });
});

// Route pour ajouter un utilisateur
app.post("/api/users", checkDBConnection, (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout de l'utilisateur:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(201).json({ message: "Utilisateur ajouté avec succès !" });
        }
    );
});

// Route pour modifier un utilisateur
app.put("/api/users/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, password, id],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de la modification de l'utilisateur:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(200).json({ message: "Utilisateur modifié avec succès !" });
        }
    );
});

// Route pour supprimer un utilisateur
app.delete("/api/users/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'utilisateur:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès !" });
    });
});




// Lancer le serveur
const PORT = 5050;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
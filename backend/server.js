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
    database: "nexus-data",
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

// Route pour récupérer tous les administrateurs
app.get("/api/admin_membre", checkDBConnection, (req, res) => {
    db.query("SELECT * FROM admin_membre", (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des administrateurs:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json(result);
    });
});

// Route pour récupérer un administrateur par ID
app.get("/api/admin_membre/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM admin_membre WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'administrateur:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Administrateur non trouvé" });
        }
        res.status(200).json(result[0]);
    });
});

// Route pour ajouter un administrateur
app.post("/api/admin_membre", checkDBConnection, (req, res) => {
    const { nom, prenom, email, numero, mot_de_passe } = req.body;

    if (!nom || !prenom || !email || !numero || !mot_de_passe) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "INSERT INTO admin_membre (nom, prenom, email, numero, mot_de_passe) VALUES (?, ?, ?, ?, ?)",
        [nom, prenom, email, numero, mot_de_passe],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout de l'administrateur:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(201).json({ message: "Administrateur ajouté avec succès !" });
        }
    );
});

// Route pour modifier un administrateur
app.put("/api/admin_membre/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, numero, mot_de_passe } = req.body;

    if (!nom || !prenom || !email || !numero || !mot_de_passe) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "UPDATE admin_membre SET nom = ?, prenom = ?, email = ?, numero = ?, mot_de_passe = ? WHERE id = ?",
        [nom, prenom, email, numero, mot_de_passe, id],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de la modification de l'administrateur:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(200).json({ message: "Administrateur modifié avec succès !" });
        }
    );
});

// Route pour supprimer un administrateur
app.delete("/api/admin_membre/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM admin_membre WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'administrateur:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json({ message: "Administrateur supprimé avec succès !" });
    });
});


// gestion de la table categories 

// Route pour récupérer toutes les catégories
app.get("/api/categories", checkDBConnection, (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des catégories:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json(result);
    });
});

// Route pour récupérer une catégorie par ID
app.get("/api/categories/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM categories WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de la catégorie:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json(result[0]);
    });
});

// Route pour ajouter une catégorie
app.post("/api/categories", checkDBConnection, (req, res) => {
    const { nom, description } = req.body;

    if (!nom || !description) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "INSERT INTO categories (nom, description) VALUES (?, ?)",
        [nom, description],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout de la catégorie:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(201).json({ message: "Catégorie ajoutée avec succès !" });
        }
    );
});

// Route pour modifier une catégorie
app.put("/api/categories/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;
    const { nom, description } = req.body;

    if (!nom || !description) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "UPDATE categories SET nom = ?, description = ? WHERE id = ?",
        [nom, description, id],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de la modification de la catégorie:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(200).json({ message: "Catégorie modifiée avec succès !" });
        }
    );
});

// Route pour supprimer une catégorie
app.delete("/api/categories/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de la catégorie:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json({ message: "Catégorie supprimée avec succès !" });
    });
});


// gestion du panier 
// Route pour récupérer tous les paniers
app.get("/api/panier", checkDBConnection, (req, res) => {
    db.query("SELECT * FROM panier", (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des paniers:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json(result);
    });
});

// Route pour récupérer un panier par ID
app.get("/api/panier/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM panier WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération du panier:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Panier non trouvé" });
        }
        res.status(200).json(result[0]);
    });
});

// Route pour ajouter un panier
app.post("/api/panier", checkDBConnection, (req, res) => {
    const { admin_membre_id, produit_id, quantite, prix_unitaire, prix_total, date_ajout } = req.body;

    if (!admin_membre_id || !produit_id || !quantite || !prix_unitaire || !prix_total || !date_ajout) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "INSERT INTO panier (admin_membre_id, produit_id, quantite, prix_unitaire, prix_total, date_ajout) VALUES (?, ?, ?, ?, ?, ?)",
        [admin_membre_id, produit_id, quantite, prix_unitaire, prix_total, date_ajout],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout du panier:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(201).json({ message: "Panier ajouté avec succès !" });
        }
    );
});

// Route pour modifier un panier
app.put("/api/panier/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;
    const { admin_membre_id, produit_id, quantite, prix_unitaire, prix_total, date_ajout } = req.body;

    if (!admin_membre_id || !produit_id || !quantite || !prix_unitaire || !prix_total || !date_ajout) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    db.query(
        "UPDATE panier SET admin_membre_id = ?, produit_id = ?, quantite = ?, prix_unitaire = ?, prix_total = ?, date_ajout = ? WHERE id = ?",
        [admin_membre_id, produit_id, quantite, prix_unitaire, prix_total, date_ajout, id],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de la modification du panier:", err);
                return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
            }
            res.status(200).json({ message: "Panier modifié avec succès !" });
        }
    );
});

// Route pour supprimer un panier
app.delete("/api/panier/:id", checkDBConnection, (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM panier WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du panier:", err);
            return res.status(500).json({ message: "Erreur serveur", erreur: err.message });
        }
        res.status(200).json({ message: "Panier supprimé avec succès !" });
    });
});



// Lancer le serveur
const PORT = 5050;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
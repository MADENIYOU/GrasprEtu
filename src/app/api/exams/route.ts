import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Créer une connexion à la base de données MySQL
const db = await mysql.createConnection({
  host: "localhost", // Hôte de la base de données
  user: "root",      // Utilisateur MySQL
  password: "", // Mot de passe MySQL
  database: "projet", // Nom de la base de données
});

export async function GET(req: NextRequest) {
  try {
    // Récupérer l'ID de la matière depuis les paramètres de l'URL
    const { searchParams } = new URL(req.url);
    const matiereId = searchParams.get("matiereId");
    console.log(matiereId);

    if (!matiereId) {
      return NextResponse.json(
        { error: "L'ID de la matière est requis" },
        { status: 400 }
      );
    }

    // Récupérer le nom de la matière en fonction de l'ID
    const matiereNom = await getMatiereNomById(matiereId);
    console.log(matiereNom);

    // Si aucun nom de matière n'est trouvé
    if (!matiereNom) {
      return NextResponse.json(
        { error: "Aucune matière trouvée pour cet ID" },
        { status: 404 }
      );
    }

    // Récupérer les examens associés à cette matière
    const exams = await getExamsByMatiereNom(matiereNom);
    console.log(exams);

    // Si aucun examen n'est trouvé pour cette matière
    if (exams.length === 0) {
      return NextResponse.json(
        { error: "Aucun examen trouvé pour cette matière" },
        { status: 404 }
      );
    }

    return NextResponse.json({ exams });
  } catch (error) {
    console.error("Erreur lors de la récupération des examens :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Fonction pour récupérer le nom de la matière en fonction de son ID
async function getMatiereNomById(matiereId: string) {
  const [rows] = await db.execute(`
    SELECT nom_matiere
    FROM matieres
    WHERE id = ?
  `, [matiereId]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0].nom_matiere;
}

// Fonction pour récupérer les examens associés à une matière par nom
async function getExamsByMatiereNom(matiereNom: string) {
  const [rows] = await db.execute(`
    SELECT e.id_exam, e.date_exam, e.sujet
    FROM exams e
    JOIN matieres m ON e.matiere_id = m.id
    WHERE m.nom_matiere = ?
  `, [matiereNom]);

  if (rows.length === 0) {
    return [];
  }

  return rows.map((row: any) => ({
    id_exam: row.id_exam,
    date_exam: row.date_exam,
    sujet: row.sujet,
  }));
}

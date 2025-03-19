import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";


const db = await mysql.createConnection({
  host: "localhost", 
  user: "root",      
  password: "", 
  database: "projet",
});

export async function GET(req: NextRequest) {
  try {
    
    const { searchParams } = new URL(req.url);
    const matiereId = searchParams.get("matiereId");
    console.log(matiereId);

    if (!matiereId) {
      return NextResponse.json(
        { error: "L'ID de la matière est requis" },
        { status: 400 }
      );
    }
    
    const matiereNom = await getMatiereNomById(matiereId);
    console.log("Nom de la matière : ", matiereNom);

    
    if (!matiereNom) {
      return NextResponse.json(
        { error: "Aucune matière trouvée pour cet ID" },
        { status: 404 }
      );
    }

    
    const exams = await getExamsByMatiereNom(matiereNom);
    console.log("Les exams récupérés : ", exams);

    
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


async function getExamsByMatiereNom(matiereNom: string) {
  const [rows] = await db.execute(`
    SELECT e.id, e.date_limite, e.titre
    FROM examens e
    JOIN matieres m ON e.matiere = m.nom_matiere
    WHERE m.nom_matiere = ?
  `, [matiereNom]);

  if (rows.length === 0) {
    return [];
  }

  return rows.map((row: any) => ({
    id_exam: row.id,
    date_exam: row.date_limite,
    sujet: row.titre,
  }));
}

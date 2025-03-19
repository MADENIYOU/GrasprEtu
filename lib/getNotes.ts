// lib/getNotes.ts
import mysql from "mysql2/promise";

export async function getStudentGrades() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projet", // Remplacer par le nom de ta base de données
  });

  try {
    const [rows] = await db.execute(
      "SELECT e.date_limite, c.note FROM copies dc JOIN corrections c ON dc.id = c.id_copie JOIN examens e ON dc.id_examen = e.id WHERE dc.id_etudiant = ? ORDER BY e.date_limite",
      [1] // L'ID de l'étudiant est ici défini à 1
    );

    return (rows as mysql.RowDataPacket[]).map((row) => ({
      value: row.note,
    }));
  } catch (err) {
    console.error("Erreur lors de la récupération des notes :", err);
    return []; // Retourne un tableau vide en cas d'erreur
  } finally {
    await db.end(); // Ferme la connexion
  }
}

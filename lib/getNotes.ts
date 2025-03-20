// lib/getNotes.ts
import mysql from "mysql2/promise";

export async function getStudentGrades() {
  const db = await mysql.createConnection({
    host: "mysql-n0reyni.alwaysdata.net",
  user: "n0reyni_sall",
  password: "passer123",
  database: "n0reyni_bd",
  });

  try {
    const [rows] = await db.execute(
      "SELECT e.date_limite, c.note FROM copies dc JOIN corrections c ON dc.id = c.id_copie JOIN examens e ON dc.id_examen = e.id WHERE dc.id_etudiant = ? ORDER BY e.date_limite",
      [1]
    );

    return (rows as mysql.RowDataPacket[]).map((row) => ({
      value: row.note,
    }));
  } catch (err) {
    console.error("Erreur lors de la récupération des notes :", err);
    return [];
  } finally {
    await db.end();
  }
}

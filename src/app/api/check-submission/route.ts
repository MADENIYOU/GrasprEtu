import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_exam = searchParams.get("id_exam");
  const id_etudiant = searchParams.get("id_etudiant");
  

  if (!id_exam) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  try {
    const db = await mysql.createConnection({
      host: "mysql-n0reyni.alwaysdata.net",
      user: "n0reyni_sall",
      password: "passer123",
      database: "n0reyni_bd",
    });

    const [rows] = await db.execute(
      "SELECT COUNT(*) AS count FROM copies WHERE id_examen = ? AND id_etudiant = ?",
      [id_exam, id_etudiant]
    );

    db.end();

    return NextResponse.json({ submitted: rows[0].count > 0 });

  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

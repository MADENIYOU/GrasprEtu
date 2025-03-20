import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "mysql-n0reyni.alwaysdata.net",
  user: "n0reyni_sall",
  password: "passer123",
  database: "n0reyni_bd",
});

console.log(db);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id_exam = searchParams.get("id_exam");

    if (!id_exam) {
      return NextResponse.json({ error: "ID d'examen requis" }, { status: 400 });
    }

    const [rows] = await db.execute(
      `SELECT * FROM examens WHERE id = ?`,
      [id_exam]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Examen non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ exam: rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

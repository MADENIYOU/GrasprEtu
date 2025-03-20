import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { writeFile, mkdir } from "fs/promises";
import path from "path";


const dbConfig = {
  host: "mysql-n0reyni.alwaysdata.net",
  user: "n0reyni_sall",
  password: "passer123",
  database: "n0reyni_bd",
};

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ success: false, message: "Type de contenu invalide." }, { status: 400 });
    }

    
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const id_exam = formData.get("id_exam") as string;
    const id_etudiant = 1; 

    
    if (!file) {
      return NextResponse.json({ success: false, message: "Aucun fichier fourni." }, { status: 400 });
    }
    if (!id_exam || isNaN(Number(id_exam))) {
      return NextResponse.json({ success: false, message: "L'ID de l'examen est invalide." }, { status: 400 });
    }

    
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, file.name);
    
    
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);

    
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "INSERT INTO copies (id_etudiant, id_examen, fichier_pdf) VALUES (?, ?, ?)",
      [id_etudiant, Number(id_exam), file.name]
    );
    await connection.end();

    return NextResponse.json({ success: true, message: "Document soumis avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la soumission :", error);
    return NextResponse.json({ success: false, message: "Erreur lors de la soumission." }, { status: 500 });
  }
}

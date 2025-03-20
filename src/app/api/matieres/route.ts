import { NextResponse } from "next/server";
import { getMatieres } from "../../../../lib/getMatieres";

export async function GET(request: Request) {
  try {
    console.log("Requête reçue pour /api/matieres");

    const url = new URL(request.url);
    const studentId = url.searchParams.get("studentId");
    console.log("studentId:", studentId);

    if (!studentId || isNaN(Number(studentId))) {
      console.log("L'ID de l'étudiant est manquant ou invalide");
      return NextResponse.json(
        { error: "L'ID de l'étudiant est requis et doit être un nombre" },
        { status: 400 }
      );
    }

    // Récupérer les matières pour l'étudiant
    const matieres = await getMatieres(parseInt(studentId));
    console.log("Matières récupérées:", matieres);

    return NextResponse.json(matieres);
  } catch (error) {
    console.error("Erreur lors de la récupération des matières :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des matières." },
      { status: 500 }
    );
  }
}

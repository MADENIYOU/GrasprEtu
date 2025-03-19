// app/api/student-grades/route.ts
import { NextResponse } from "next/server";
import { getStudentGrades } from "../../../../lib/getNotes";

export async function GET() {
  try {
    const grades = await getStudentGrades();
    return NextResponse.json(grades);
  } catch (error) {
    console.error("Erreur lors de la récupération des notes de l'étudiant:", error);
    return NextResponse.json({ message: "Erreur lors de la récupération des notes." }, { status: 500 });
  }
}

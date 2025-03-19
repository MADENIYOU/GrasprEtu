// app/Correction/page.tsx
import ClassList from "@/components/ClassList";
import { getMatieres } from "../../../lib/getMatieres";

export default async function CorrectionPage() {
  // Récupérer les classes depuis la base de données
  const matieresFromDb = await getMatieres(3);

// Formater les données pour correspondre à l'interface attendue
const matieresFormatted = matieresFromDb.map((matiere) => ({
  id: matiere.id,
  name: matiere.name,
  description: `Matière : ${matiere.name}`, // Description dynamique
  imageUrl: "https://loremflickr.com/320/240/book", // Image générique pour les matières
  redirectUrl: `/Correction/matiere/${matiere.id}`, // URL corrigée
}));

  
}
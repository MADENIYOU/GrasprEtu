import ClassList from "@/components/ClassList";
import { getMatieres } from "../../../lib/getMatieres";

export default async function CorrectionPage() {
  const matieresFromDb = await getMatieres(3);

const matieresFormatted = matieresFromDb.map((matiere) => ({
  id: matiere.id,
  name: matiere.name,
  description: `Matière : ${matiere.name}`,
  imageUrl: "https://loremflickr.com/320/240/book",
  redirectUrl: `/Correction/matiere/${matiere.id}`,
}));

  
}
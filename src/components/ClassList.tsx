import React from "react";
import MatiereCard from "./ClassCard";
import { getMatieres } from "../../lib/getMatieres";

interface Matiere {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  redirectUrl: string;
}

interface MatiereListProps {
  matieres: Matiere[];
}

const MatiereList: React.FC<MatiereListProps> = ({ matieres }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="space-y-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
        {matieres.map((matiere) => (
          <MatiereCard
            key={matiere.id}
            id={matiere.id}
            name={matiere.name}
            description={matiere.description}
            imageUrl="/images/imageCard.jpg"
            redirectUrl={matiere.redirectUrl}
          />
        ))}
      </div>
    </div>
  );
};

// Récupérer les matieres côté serveur
export const getServerSideProps = async () => {
  const matieresFromDb = await getMatieres(3);
  console.log(matieresFromDb);
  
  const matieres: Matiere[] = matieresFromDb.map((matiere: { id: any; name: any; }) => ({
    id: matiere.id,
    name: matiere.name,
    description: `Matière : ${matiere.name}`, // Description dynamique
    imageUrl: "https://loremflickr.com/g/320/240/book", // Image générique pour les matières
    redirectUrl: `/matiere/${matiere.id}`, // URL de redirection dynamique pour la matière
  }));

  console.log(matieres);

  return {
    props: {
      matieres, // Passer les matieres en tant que props
    },
  };
};

export default MatiereList;

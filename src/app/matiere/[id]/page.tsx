"use client";

import Sidebar from "@/components/SideBarMatiere";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Matiere {
  id: number;
  name: string;
}

interface Exam {
  id: number;
  title: string;
  date: string;
}

const ExamList = () => {
  const { id } = useParams(); // Récupérer l'ID de la matière depuis l'URL
  const [exams, setExams] = useState<Exam[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]); // Pour stocker les matières
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Indicateur d'erreur

  // Effet pour récupérer les matières
  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const response = await fetch("/api/matieres?studentId=3"); // Appeler l'API pour récupérer les matières de l'étudiant 3
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des matières");
        }
        const data = await response.json();
        setMatieres(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des matières");
        setLoading(false);
        console.error(err);
      }
    };
    fetchMatieres();
  }, []); // Ce useEffect se lance une seule fois lors du montage du composant

  // Effet pour récupérer les examens
  useEffect(() => {
    if (id) {
      fetch(`/api/exams?matiereId=${id}`)
        .then((res) => res.json())
        .then((data) => setExams(data))
        .catch((err) => console.error("Erreur de chargement des examens", err));
    }
  }, [id]);

  if (loading) {
    return <div>Chargement des matières...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 w-full flex flex-col bg-gray-900">
      <header>
        {/* <Sidebar matieres={matieres} />  */}
      </header>
      <h1 className="text-2xl font-bold">Examens pour la matière {id}</h1>
      <ul className="mt-4">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <li key={exam.id} className="border p-4 mb-2 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{exam.title}</h2>
              <p className="text-gray-600">Date : {exam.date}</p>
            </li>
          ))
        ) : (
          <p>Aucun examen trouvé pour cette matière.</p>
        )}
      </ul>
    </div>
  );
};

export default ExamList;

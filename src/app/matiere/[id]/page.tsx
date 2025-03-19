"use client";

import Sidebar from "@/components/SideBarMatiere";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Matiere {
  id: number;
  name: string;
}

interface Exam {
  id_exam: number;
  sujet: string;
  date_exam: string;
}

const ExamList = () => {
  const { id } = useParams(); // Récupérer l'ID de la matière depuis l'URL
  const [exams, setExams] = useState<Exam[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Effet pour récupérer les examens
  useEffect(() => {
    if (id) {
      fetch(`/api/exams?matiereId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error); // Afficher l'erreur en cas de problème
          } else {
            setExams(data.exams); // Mettre à jour les examens
          }
          setLoading(false); // Fin du chargement
        })
        .catch((err) => {
          console.error("Erreur de chargement des examens", err);
          setError("Erreur lors du chargement des examens");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Chargement des examens...</div>;
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
            <li key={exam.id_exam} className="border p-4 mb-2 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{exam.sujet}</h2>
              <p className="text-gray-600">Date : {new Date(exam.date_exam).toLocaleDateString()}</p>
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

// @ts-nocheck


"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Exam {
  id_exam: number;
  sujet: string;
  date_exam: string;
}

const ExamList = () => {
  const { id } = useParams();
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/exams?matiereId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setExams(data.exams);
          }
          setLoading(false);
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
      <h1 className="text-2xl font-bold">Examens pour la matière {id}</h1>
      <ul className="mt-4">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <li
              key={exam.id_exam}
              onClick={() => {
                try {
                  console.log("Redirection...");
                  router.push(`/examens/${exam.id_exam}`);
                  console.log("Redirection effectuée");
                } catch (error) {
                  console.error("Erreur lors de la redirection :", error);
                }
              }}
              
              className="border p-4 mb-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-800 transition"
            >
              <h2 className="text-lg font-semibold">{exam.sujet}</h2>
              <p className="text-gray-400">
                Date : {new Date(exam.date_exam).toLocaleDateString()}
              </p>
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

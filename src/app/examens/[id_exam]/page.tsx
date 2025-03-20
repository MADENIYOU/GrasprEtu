"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Exam {
  id_exam: number;
  sujet: string;
  date_exam: string;
  description: string;
}

const ExamDetails = () => {
  const { id_exam } = useParams();
  const [exam, setExam] = useState<Exam | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    if (!id_exam) {
      setError("ID d'examen manquant.");
      setLoading(false);
      return;
    }

    fetch(`/api/examens?id_exam=${id_exam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setExam(data.exam);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des détails de l'examen.");
        setLoading(false);
      });
  }, [id_exam]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setMessage("Veuillez sélectionner un fichier PDF.");
        setFile(null);
      } else if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage("Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 5 Mo.");
        setFile(null);
      } else {
        setMessage(null);
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Veuillez choisir un fichier PDF avant de soumettre.");
      return;
    }

    // 🚀 SweetAlert2 Popup personnalisé
    const result = await Swal.fire({
      title: "Confirmer la soumission",
      text: "⚠️ Cette action est irréversible. Voulez-vous continuer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, soumettre !",
      cancelButtonText: "Annuler",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id_exam", id_exam as string);

    try {
      const res = await fetch("/api/submit-response", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire("Succès", "Fichier soumis avec succès !", "success");
        setFile(null);
        setMessage(null);
        setSubmissionSuccess(true);
      } else {
        Swal.fire("Erreur", "Échec de la soumission du fichier.", "error");
        setIsSubmitting(false);
      }
    } catch (err) {
      Swal.fire("Erreur", "Une erreur est survenue. Veuillez réessayer.", "error");
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Chargement des détails...</div>;
  if (error) return <div>{error}</div>;
  if (!exam) return <div>Aucun examen trouvé.</div>;

  return (
    <div className="container mx-auto p-6 w-full flex flex-col bg-gray-900">
      <h1 className="text-3xl font-bold">{exam.sujet}</h1>
      <p className="text-gray-400">
        Date : {new Date(exam.date_exam).toLocaleDateString()}
      </p>
      <p className="mt-4">{exam.description}</p>

      <h2 className="text-xl font-bold mt-6">Soumettre votre fichier PDF (5MB au maximum)</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="p-2 border rounded-md bg-gray-800 text-white"
          disabled={isSubmitting || submissionSuccess}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-white ${
            submissionSuccess
              ? "bg-green-600 cursor-not-allowed"
              : isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isSubmitting || submissionSuccess}
        >
          {submissionSuccess ? "Réponse envoyée !" : isSubmitting ? "Envoi en cours..." : "Envoyer le fichier"}
        </button>
      </form>

      {message && <p className="mt-2 text-yellow-400">{message}</p>}
    </div>
  );
};

export default ExamDetails;

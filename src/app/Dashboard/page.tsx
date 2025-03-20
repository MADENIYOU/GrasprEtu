"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GradeData {
  value: number;
}

export default function StudentDashboard() {
  const [grades, setGrades] = useState<GradeData[]>([]);

  useEffect(() => {
    async function fetchGrades() {
      const response = await fetch("/api/grades");
      const data = await response.json();
      setGrades(data);
    }

    fetchGrades();
  }, []);

  
  const chartData = {
    labels: grades.map((_, index) => `Examen ${index + 1}`),
    datasets: [
      {
        label: "Notes de l'étudiant",
        data: grades.map((grade) => grade.value), 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Diagramme des notes de l'étudiant",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 20,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-6">

      <div className="mt-6 bg-gray-800">
        <Card className="col-span-4 bg-gray-800">
          <CardHeader>
            <CardTitle>Vue d'ensemble</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {grades.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <p className="text-white">Aucune donnée disponible pour cet étudiant.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-center items-center">
        <Button className="bg-amber-50 text-black">Télécharger le rapport</Button>
      </div>
    </div>
  );
}

import mysql from "mysql2/promise";

// Type pour les matières
interface Matiere {
  id: number;
  name: string;
}

// Créer un pool de connexions (configuration à adapter si besoin)
const pool = mysql.createPool({
  host: "mysql-n0reyni.alwaysdata.net",
  user: "n0reyni_sall",
  password: "passer123",
  database: "n0reyni_bd",
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0,
});


export const getMatieres = async (studentId: number): Promise<Matiere[]> => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT DISTINCT matieres.id, matieres.nom_matiere
      FROM matieres
      JOIN classe_matiere ON matieres.id = classe_matiere.matiere_id
      JOIN utilisateurs ON utilisateurs.classe = classe_matiere.classe
      WHERE utilisateurs.id = ? AND utilisateurs.role = 'etudiant'
      `,
      [studentId]
    );

    
    const matieres = (rows as { id: number; nom_matiere: string }[]).map((row) => ({
      id: row.id,
      name: row.nom_matiere,
    }));

    return matieres;
  } catch (error) {
    console.error("Erreur lors de la récupération des matières :", error);
    throw new Error("Erreur lors de la récupération des matières.");
  }
};

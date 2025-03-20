// @ts-nocheck


"use client";

import React from "react";
import Sidebar from "./Sidebar.client";
import { getMatieres } from "../../lib/getMatieres";


interface Class {
  id: string;
  name: string;
}


// Composant principal
const ResponsiveSidebarHeader = async () => {
  try {
    const matieres = await getMatieres(3);
    return <Sidebar matieres={matieres} />;
  } catch (error) {
    console.error("Erreur lors de la récupération des classes :", error);
    }
};

export default ResponsiveSidebarHeader;
// @ts-nocheck


"use client";

import React from "react";
import Link from "next/link";

interface MatiereCardProps {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  redirectUrl?: string; 
}

const MatiereCard: React.FC<MatiereCardProps> = ({
  id,
  name,
  imageUrl,
  description,
  redirectUrl = `/matiere/${id}`, 
}) => {
  return (
    <Link href={redirectUrl} className="w-full">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200 max-w-xs">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
        <div className="p-6">
          <div className="text-xl font-semibold text-gray-800 mb-2">{name}</div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default MatiereCard;

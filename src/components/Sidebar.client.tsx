// @ts-nocheck


"use client";

import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  FilePlus,
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ClassList from "@/components/ClassList";
import Header from "./Header";

interface Class {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  redirectUrl: string;
}

interface SidebarProps {
  matieres: Class[];
}

const Sidebar = ({ matieres }: SidebarProps) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col w-full bg-gray-900">
      
      <Header />

      <div className="flex">
        <div className={`lg:block absolute lg:static bottom-0 left-0 top-0 right-0 bg-black/70 z-10 lg:bg-transparent transition-all duration-200 ease-in-out ${toggle ? "block" : "hidden"}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setToggle(false)}
            className="block lg:hidden absolute left-[360px] top-3 shadow-none text-white text-3xl lg:hidden z-20 hover:bg-transparent hover:text-gray-300"
          >
            x
          </Button>

          <div className="absolute lg:relative lg:block w-[350px] lg:w-[256px] h-screen bg-gray-900 opacity-100 pt-5 pb-4">
            <div className="mt-6 mb-2 py-2 px-3">
              <nav className="grid gap-1.5">
                <Link href="/" className="flex items-center hover:bg-[#1F2937] hover:text-white px-2.5 py-2 rounded-md font-medium text-lg text-gray-400">
                  <Home className="mr-2.5 h-6 w-6" />
                  Accueil
                </Link>
                <Link href="/Dashboard" className="flex items-center hover:bg-[#1F2937] hover:text-white px-2.5 py-2 rounded-md font-medium text-lg text-gray-400">
                  <LayoutDashboard className="mr-2.5 h-6 w-6" />
                  Dashboard
                </Link>
              </nav>
            </div>

            <Separator className="bg-gray-500" />

            <div className="py-3">
              <h4 className="pl-3 text-lg font-semibold text-gray-300">Matières</h4>
              <div className="my-2 py-2 px-3">
                <nav className="grid gap-1.5">
                  {matieres.map((classItem) => (
                    <Link key={classItem.id} href='/matiere/${id}' className="flex items-center hover:bg-[#1F2937] hover:text-white py-1.5 rounded-md font-medium text-lg text-gray-400">
                      <Avatar className="mr-2.5 h-6 w-6 rounded border border-gray-300">
                        <AvatarFallback className="bg-gray-700 rounded">{classItem.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      {classItem.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8">
          <div>
            <ClassList matieres={matieres} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
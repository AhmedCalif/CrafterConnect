"use client";

import { Icons } from "@/components/client/global/Icons";
import { NavBar } from "@/components/client/global/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useState } from "react";

interface UserProps {
  user: KindeUser;
}

export function Dashboard({ user }: UserProps) {
  const [activeCategory, setActiveCategory] = useState("crafting");

  const categories = [
    { id: "crafting", label: "Crafting" },
    { id: "woodworking", label: "Woodworking" },
    { id: "diy", label: "DIY" },
    { id: "more", label: "More" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            Welcome back, {user.given_name}
          </h1>
          <Button variant="ghost" size="icon">
            <Icons.menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-lg mb-2">Looking for something?</h2>
          <div className="relative">
            <Input placeholder="Search" className="w-full pl-10 bg-white" />
            <Icons.search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg mb-3">Filter by Category</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="rounded-full whitespace-nowrap"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg mb-3">What you are working on lately</h2>
          <Card className="p-4 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Arts and Crafts</h3>
                <p className="text-sm text-gray-500">
                  This is a project for decorating a wreath.
                </p>
              </div>
              <Button variant="default">Check it</Button>
            </div>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <NavBar />
        </div>

        <div className="flex justify-center mb-20">
          <Button className="w-full max-w-xs bg-blue-500 hover:bg-blue-600">
            Projects
          </Button>
        </div>
      </div>
    </div>
  );
}

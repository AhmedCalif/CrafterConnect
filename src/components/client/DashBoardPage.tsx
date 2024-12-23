
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/client/Icons";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

interface UserProps {
  user: KindeUser
}



export function Dashboard({user}: UserProps) {
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back, {user.given_name}</h1>
          <Button variant="ghost" size="icon">
            <Icons.menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <h2 className="text-lg mb-2">Looking for something?</h2>
          <div className="relative">
            <Input placeholder="Search" className="w-full pl-10 bg-white" />
            <Icons.search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
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

        {/* Recent Work Section */}
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

        {/* Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <Button variant="ghost" className="flex flex-col items-center">
              <Icons.home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <Icons.file className="h-6 w-6" />
              <span className="text-xs">Projects</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <Icons.globe className="h-6 w-6" />
              <span className="text-xs">Community</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <Icons.user className="h-6 w-6" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>

        {/* Projects Button */}
        <div className="flex justify-center mb-20">
          <Button className="w-full max-w-xs bg-blue-500 hover:bg-blue-600">
            Projects
          </Button>
        </div>
      </div>
    </div>
  );
}

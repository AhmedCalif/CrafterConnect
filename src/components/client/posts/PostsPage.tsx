"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/client/posts/PostCard";
import { Search, Plus, Loader2 } from "lucide-react";
import { NavBar } from "@/components/client/global/Navbar";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

const posts = [
  {
    id: 1,
    author: {
      name: "Joe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Bathroom Painting DIY",
    timestamp: new Date("2024-01-26T10:00:00"),
    content: "Sharing my recent bathroom renovation project. Started with a fresh coat of paint...",
    likes: 24,
    comments: 8,
    tags: ["DIY", "Home Improvement"]
  },
  {
    id: 2,
    author: {
      name: "Darrell",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Home Improvement Tips",
    timestamp: new Date("2024-01-26T09:30:00"),
    content: "Here's a comprehensive DIY project guide for improving your home...",
    likes: 15,
    comments: 5,
    tags: ["Tips", "Home Improvement"]
  },
  {
    id: 3,
    author: {
      name: "Bradley",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Seasonal DIY Projects",
    timestamp: new Date("2024-01-26T09:00:00"),
    content: "Get ready for seasonal DIY projects! Perfect for spring decorations...",
    likes: 32,
    comments: 12,
    tags: ["Seasonal", "DIY"]
  },
];


export function PostsPageComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showAlert] = useState(false);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTabChange = (value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="container mx-auto max-w-4xl flex flex-col min-h-screen pb-20">
      {showAlert && (
        <Alert className="mb-4">
          <AlertDescription>
            Your post has been created successfully!
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pt-6">
        <div className="relative flex-1 w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search posts, tags..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="/posts/create" className="w-full md:w-auto">
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add post
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all" className="flex-1">
            All Posts ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="invited" className="flex-1">
            Invited
          </TabsTrigger>
          <TabsTrigger value="created" className="flex-1">
            Created
          </TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-6 space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    {...post}  
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-muted-foreground">No posts found matching your search</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="invited" className="mt-6">
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground">No invited posts yet</p>
                <Button variant="outline" className="mt-4">
                  Find posts to join
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="created" className="mt-6">
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground">No created posts yet</p>
                <Button variant="outline" className="mt-4">
                  Create your first post
                </Button>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <NavBar />
        </div>
      </div>
    </div>
  );
}
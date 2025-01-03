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
import { type Post } from '@/types/PostsTypes';

export function PostsPageComponent({ posts }: { posts: Post[]}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showAlert] = useState(false);

  const filteredPosts: Post[] = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleTabChange = (value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    setTimeout(() => setIsLoading(false), 500);
  };

  const renderPostsList = () => {
    if (filteredPosts.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground">No posts found matching your search</p>
        </div>
      );
    }

    return filteredPosts.map((post) => (
      <PostCard 
        key={post.id} 
        {...post}  
      />
    ));
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
            All Posts ({filteredPosts.length})
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
              {renderPostsList()}
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
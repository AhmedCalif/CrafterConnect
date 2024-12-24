/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface generateSignedURLProps {
  generateSignedURL: (params: {
    fileSize: number;
    fileType: string;
    checksum: string;
  }) => Promise<{
    success?: { url: string; mediaId: string };
    failure?: string;
  }>;
}

export function S3({ generateSignedURL }: generateSignedURLProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("Uploading...");
    setError("");

    try {
      if (!file) {
        throw new Error("Please select a file first");
      }

      const fileSize = file.size;
      const fileType = file.type;
      const checksum = await computeSHA256(file);

      const signedUrlResponse = await generateSignedURL({
        fileSize,
        fileType,
        checksum,
      });

      if (signedUrlResponse.failure) {
        throw new Error(signedUrlResponse.failure);
      }

      const { url, mediaId } = signedUrlResponse.success!;

      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": fileType },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      setStatusMessage("File uploaded successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      setStatusMessage("");
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>S3 Upload Test</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="file"
              onChange={handleFileChange}
              disabled={loading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {previewUrl && file?.type.startsWith("image/") && (
              <Image
                src={previewUrl}
                alt={"previewUrl"}
                width={100}
                height={100}
                className="mt-2 max-h-48 rounded-lg"
              />
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {statusMessage && (
            <Alert>
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={!file || loading} className="w-full">
            {loading ? "Uploading..." : "Upload to S3"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

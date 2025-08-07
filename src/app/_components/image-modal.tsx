"use client";

import { useUser } from "@clerk/nextjs"; 
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { DeleteButton } from "./delete-button";

interface ImageModalProps {
  image: {
    id: number;
    filename: string | null;
    imageName: string | null;
    imageUrl: string;
    userId: string;
    createdAt: Date;
  };
  children: React.ReactNode;
}

export function ImageModal({ image, children }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploaderInfo, setUploaderInfo] = useState<{ fullName: string } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
  if (!isOpen || uploaderInfo) return;

  setIsLoading(true);
  fetch(`/api/uploadthing/user/${image.userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) throw new Error(data.error);
      setUploaderInfo({ fullName: data.fullName });
    })
    .catch((error) => {
      console.error("Error fetching uploader info:", error);
      setUploaderInfo({ fullName: "Unknown" });
    })
    .finally(() => {
      setIsLoading(false);
    });
}, [isOpen]);


  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">

            {/* Left - Image / Code Editor Look */}
            <div className="bg-[#1e1e1e] text-white p-4 rounded-md w-full md:w-[65%]">
              <img
                src={image.imageUrl}
                alt={image.imageName || "Image"}
                className="w-full h-auto rounded"
              />
            </div>

            {/* Right - Description Panel */}
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 w-full md:w-[35%]">
              <DialogHeader className="border-b p-4">
                <DialogTitle className="text-center">
                    {image.imageName || image.filename } 
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-1 flex-col space-y-4 p-4">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-100">
                        Uploaded By:
                    </span>
                    <span>{isLoading ? "Loading... " : uploaderInfo?.fullName}</span>   
                </div>   

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-100">
                        Created At:
                    </span>
                    <span>
                        {new Date(image.createdAt).toLocaleDateString()}
                    </span>   
                </div>  

                <div className="">
                    <DeleteButton idAsNumber={image.id} />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

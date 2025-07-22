import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import { UploadDialog } from "./_components/upload-dialog";

async function Images() {
  const mockUrls = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjRy1EqJWCWEgrX793dRmSRhOOC3lbmFO8Mg&s", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUZAO3rz-GxjZ0oGY3uK_3YFK60Fz4bc7h3w&s",
    "https://dxk6aub3z0.ufs.sh/f/u4TIStYoNWJ0WQEtzm8uKjvAE49OfoeClq5PTnRDhyazFk82",
    "https://dxk6aub3z0.ufs.sh/f/u4TIStYoNWJ0YECEGJZVlLFxZNWJSh2IOpt4UAfRDvwYemd3"
  
  ];
    
  const images = mockUrls.map((url, index) => ({
    id: index + 1,
    url,
  }));

  return (
    <div>
      <div className="flex justify-end p4">
        <UploadDialog />
      </div>
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {images.map((image) => (
      <div key={image.id} className="flex w-64 flex-col">
        <div className="relative w-full h-40 bg-zinc-900 overflow-hidden">
          <img 
            src={image.url} 
            alt={`Image ${image.id}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center mt-2">{image.id}</div>
      </div>
  ))}
</div>
</div>
   );
}

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
       <div className="h-full w-full text-center text-2xl">
          Please Sign In Above to Continue!
       </div>
      </SignedOut>
      <SignedIn>
         <div className="h-full w-full text-center text-2xl">
            Welcome Back!
            <Images />
       </div>
      </SignedIn>
    </main>
  );
}

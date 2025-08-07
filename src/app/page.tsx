
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import { UploadDialog } from "./_components/upload-dialog";
import { getMyImages } from "~/server/db/queries";
import { ImageModal } from "./_components/image-modal";

export const dynamic = "force-dynamic";

async function Images() {
  // const mockUrls = [
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjRy1EqJWCWEgrX793dRmSRhOOC3lbmFO8Mg&s", 
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUZAO3rz-GxjZ0oGY3uK_3YFK60Fz4bc7h3w&s",
  //   "https://dxk6aub3z0.ufs.sh/f/u4TIStYoNWJ0WQEtzm8uKjvAE49OfoeClq5PTnRDhyazFk82",
  //   "https://dxk6aub3z0.ufs.sh/f/u4TIStYoNWJ0YECEGJZVlLFxZNWJSh2IOpt4UAfRDvwYemd3"
  // ];
    
  // const images = mockUrls.map((url, index) => ({
  //   id: index + 1,
  //   url,
  // }));

  const images = await getMyImages()

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <UploadDialog />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <ImageModal image={image}>
            <div className="relative w-full h-40 bg-zinc-900">
              <img 
                src={image.imageUrl} 
                alt={`Image ${image.id}`} 
                className="w-full h-full object-cover"
              />
            </div>
            </ImageModal>
            <div className="text-center text-sm font-medium py-2 bg-gray-50">
              {image.imageName || image.filename}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Upload Gallery</h1>
        <SignedIn>
          <Link href="#" className="text-blue-600 hover:underline text-sm"></Link>
        </SignedIn>
      </header>
      <section className="py-10">
        <SignedOut>
          <div className="h-full w-full text-center text-2xl text-gray-700">
            Please Sign In Above to Continue!
          </div>
        </SignedOut>
        <SignedIn>
          <div className="h-full w-full text-center text-2xl text-gray-700 mb-8">
            Welcome Back!
          </div>
          <Images />
        </SignedIn>
      </section>
    </main>
  );
}

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import { UploadDialog } from "./_components/upload-dialog";
import { getMyImages } from "~/server/db/queries";
import { ImageModal } from "./_components/image-modal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Upload button aligned to right */}
      <div className="flex justify-end mb-4">
        <UploadDialog />
      </div>

      {/* Carousel for images */}
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: 'url("")'
  }}
>
  <header>
    <SignedIn>
      <Link href="#" className="text-blue-600 hover:underline text-sm"></Link>
    </SignedIn>
  </header>

  <section className="py-10">

    {/* SIGNED OUT SECTION */}
    <SignedOut>
      <div className="w-full py-2 border border-gray-300 rounded-md mx-auto max-w-xl mt-0.5">
        <div className="text-center text-3xl font-bold text-white-800 tracking-wide">
          SIGN IN FIRST
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-6">
  {[
    {
      url: "https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/385530700_619380286848061_9174381589523629532_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHIYl1GiuDmzMtJTmoGRhjLwULp4eJCrOrBQunh4kKs6ngRbNkkOIB5yvgWYxWiLOCnutXmwXcfr1yY1VKtJAmn&_nc_ohc=SyHyvkDZ7yIQ7kNvwEBF8m-&_nc_oc=Adk_cEpSe_cWkEWIQkPIcV3QDiJLx4XyqsOyxdsSgFcCt5X5HBIigOj9M3ryKzDQs20&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&oh=03_Q7cD3AHWU9TToWtXWasF-RTaDYjoB_nFdw_H0co7LkSAkFWbhQ&oe=68BC939E",
      title: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer"
    },
    {
      url: "https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/529243525_584683944577840_8246590300739844339_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeH5EzWlasRDfFLitMSZWDJjEmPRCpQhPyUSY9EKlCE_Jelaru1sISghImYhjBfw9v77FUCa0VnnaAGIOi7Ai2up&_nc_ohc=86YtUBiNTQEQ7kNvwH1Rw-f&_nc_oc=Adl95Gc63toU0vheoubFd8gtlsTW9CihPFHu92igu9JN_8CfdTSn5dJbkxko8BYTslY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&oh=03_Q7cD3AHmoyuofzOVagAeneo-3UkMaTyoZ9GMLm0rw4zBeB8llw&oe=68BC7A9D",
      title: "Leaning Tower of Pisa (Van Gogh Style)",
      artist: "Bonanno Pisano (Original Architect)"
    },
    {
      url: "https://scontent.fmnl17-8.fna.fbcdn.net/v/t1.15752-9/526873278_3236127366553290_2190131994399160107_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHB-gN9TI-WLkYc3OqZ8iSJwThqT4ArFKbBOGpPgCsUpvmyjfIaTZ0EAMFqhcEI8kYxBNSlPRwIoIiiDQ_hqxb-&_nc_ohc=Fs1nEgG_RNEQ7kNvwGQ6N2m&_nc_oc=AdmrJASEQHKjoflVZu-ijA4AVdfJXaEUrIBNnxuY-reR8dza9G6PdNmzWkbi-_Et5W8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-8.fna&oh=03_Q7cD3AGyUDCV14sJFAoJmA22b_1geZKpIUvgoxjrKTAEclR4NA&oe=68BC9914",
      title: "Mona Lisa",
      artist: "Leonardo da Vinci"
    }
  ].map((art, index) => (
    <div key={index} className="relative w-[500px] h-[600px] rounded-lg overflow-hidden group shadow-lg">
      <img
        src={art.url}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-100 backdrop-blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center text-white px-4 text-center">
        <div>
          <div className="text-2xl font-bold mb-2">{art.title}</div>
          <div className="text-lg">{art.artist}</div>
        </div>
      </div>
    </div>
  ))}
</div>

{/* 👇 Description Below the Images */}
<div className="max-w-4xl mx-auto mt-12 px-6 text-center text-white-700 text-lg leading-relaxed">
  <p>
    <span className="font-semibold text-xl text-white-800">About the Application:</span><br />
  This isn’t your average art gallery. This is a digital stage where raw talent meets fearless expression. Upload your art. Own your space. Be seen. Whether you're a rising creator or a seasoned artist, this is your canvas—no rules, no limits. We don’t wait for gallery invites—we make our own spotlight.
  </p>
</div>

    </SignedOut>

    {/* SIGNED IN SECTION */}
    <SignedIn>
  <div>
  {/* Top Section with Welcome Message */}
  <div className="flex-1 flex items-center justify-center">
    <div className="bg-opacity-60 w-full max-w-2xl rounded-lg shadow-lg px-6 py-10 text-white text-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome Back!</h1>
      <p className="text-lg text-gray-200">
        This application allows you to upload and view your favorite images.
      </p>
    </div>
  </div>

  {/* Full-width Images Section */}
  <div className="w-full">
    <Images />
  </div>
</div>


    </SignedIn>
  </section>
</main>
  );
}

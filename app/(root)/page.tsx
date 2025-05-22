import Header from "@/Components/Header";
import { dummyCards } from "@/Components/subVideoCard";
import VideoCard from "@/Components/VideoCard";

export default function Home() {
  return (
    <main className="bg-homePage ">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-[89.4vh] pt-12.5 pb-20 gap-9">

        <Header title="All Videos" subHeader="Public Library" />
        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {
          dummyCards.map((element)=>(
            <VideoCard key={element.id}
             {...element}
              
            />
            
          )) 
        }
        </div>
      </section>
    </main>
  );
}
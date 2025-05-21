import Header from "@/Components/Header";

export default function Home() {
  return (
    <main className="bg-homePage">
      <section  className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-[89.4vh] pt-12.5 pb-20 gap-9">

      <Header title="All Videos" subHeader="Public Library" />
      </section>
    </main>
  );
}
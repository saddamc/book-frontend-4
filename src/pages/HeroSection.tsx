import { AddBookModal } from "@/components/module/books/AddBookModal";

const HeroSection = () => {
  return (
    <div>
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${"https://as1.ftcdn.net/v2/jpg/05/67/30/66/1000_F_567306695_XK8Cds0NflV2Eq9Ta1IUq5kzdFxmnHVu.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to Our Library</h1>
            <p className="text-xl mb-8">
              Discover thousands of books and expand your knowledge
            </p>
            <AddBookModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

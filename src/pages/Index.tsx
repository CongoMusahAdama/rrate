
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import SearchSection from '@/components/SearchSection';
import PopularProperties from '@/components/PopularProperties';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SearchSection />
      <PopularProperties />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;

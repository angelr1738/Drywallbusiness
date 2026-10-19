import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import TextureShowcase from '@/components/TextureShowcase';
import BeforeAfter from '@/components/BeforeAfter';
import Pricing from '@/components/Pricing';
import History from '@/components/History';
import ProcessTimeline from '@/components/ProcessTimeline';
import BookingCalendar from '@/components/BookingCalendar';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';

function AppContent() {
  return (
    <div className="font-sans antialiased">
      <Header onTrackProject={() => {
        setTimeout(() => {
          document.getElementById('progress')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }} />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <TextureShowcase />
        <BeforeAfter />
        <Pricing />
        <BookingCalendar />
        <ProcessTimeline />
        <ServiceAreaMap />
        <Reviews />
        <History />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

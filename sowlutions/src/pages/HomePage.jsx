import RecentPickups from '../components/CreatorPickups';
import PlaylistsSection from '../components/PlaylistsSection';

// Home Page
const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <RecentPickups />
      <PlaylistsSection />
    </main>
  );
};

export default HomePage;
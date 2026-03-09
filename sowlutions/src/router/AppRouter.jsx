import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ManageProjectsPage from '../pages/ManageProjectsPage';
import NotFoundPage from '../pages/NotFoundPage';
import PlaylistDetailPage from '../pages/PlaylistDetailPage';

// Main Router for the app
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<NotFoundPage />} />
      <Route path="/discover" element={<NotFoundPage />} />
      <Route path="/songs" element={<NotFoundPage />} />
      <Route path="/playlists" element={<NotFoundPage />} />
      <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
      <Route path="/licenses" element={<NotFoundPage />} />
      <Route path="/trackfluencer" element={<NotFoundPage />} />
      <Route path="/points" element={<NotFoundPage />} />
      <Route path="/help" element={<NotFoundPage />} />
      <Route path="/upgrade" element={<NotFoundPage />} />
      <Route path="/profile" element={<NotFoundPage />} />
      <Route path="/add-channel" element={<ManageProjectsPage />} />
      <Route path="/switch-account" element={<ManageProjectsPage />} />
      <Route path="/settings" element={<NotFoundPage />} />
      <Route path="/logout" element={<NotFoundPage />} />
      <Route path="/search" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
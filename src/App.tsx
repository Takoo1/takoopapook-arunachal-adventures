import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Packages from "./pages/Packages";
import MyTour from "./pages/MyTour";
import Services from "./pages/Services";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

import AddReview from "./pages/AddReview";
import ReviewsManagement from "./pages/ReviewsManagement";
import BookingsManagement from "./components/admin/BookingsManagement";
import PackageManagement from "./components/admin/PackageManagement";
import DestinationManagement from "./components/admin/DestinationManagement";
import AdminDashboard from "./pages/AdminDashboard";
import FounderProfile from "./pages/FounderProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/my-tour" element={<MyTour />} />
            <Route path="/my-tour/package/:id" element={<MyTour />} />
            <Route path="/my-tour/destination/:id" element={<MyTour />} />
            <Route path="/booking/:packageId" element={<Booking />} />
            <Route path="/services" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            
            <Route path="/add-review" element={<AddReview />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/packages" element={<PackageManagement />} />
            <Route path="/admin/destinations" element={<DestinationManagement />} />
            <Route path="/admin/reviews" element={<ReviewsManagement />} />
            <Route path="/admin/bookings" element={<BookingsManagement />} />
            <Route path="/founder-profile" element={<FounderProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

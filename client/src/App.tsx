import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import PregnancyWeeks from "@/pages/PregnancyWeeks";
import WeekDetail from "@/pages/WeekDetail";
import SymptomsPage from "@/pages/SymptomsPage";
import SymptomDetail from "@/pages/SymptomDetail";
import BlogPage from "@/pages/BlogPage";
import BlogDetail from "@/pages/BlogDetail";
import BlogCategoryPage from "@/pages/BlogCategoryPage";
import BlogTagPage from "@/pages/BlogTagPage";
import DueDateCalculator from "@/pages/DueDateCalculator";
import PregnancyCalculator from "@/pages/PregnancyCalculator";
import FAQPage from "@/pages/FAQPage";
import DownloadPage from "@/pages/DownloadPage";
import AboutPage from "@/pages/AboutPage";
import MedicalReview from "@/pages/MedicalReview";
import FeaturesPage from "@/pages/FeaturesPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import { useEffect } from "react";
import { useLocation } from "wouter";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function RedirectToLogin() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/admin/login");
  }, [setLocation]);
  return null;
}

function AdminGuard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="admin-loading">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <RedirectToLogin />;
  }

  return <AdminLayout />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pregnancy" component={PregnancyWeeks} />
      <Route path="/pregnancy/:slug" component={WeekDetail} />
      <Route path="/symptoms" component={SymptomsPage} />
      <Route path="/symptoms/:slug" component={SymptomDetail} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/category/:categorySlug" component={BlogCategoryPage} />
      <Route path="/blog/tag/:tagSlug" component={BlogTagPage} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/tools/pregnancy-calculator" component={PregnancyCalculator} />
      <Route path="/tools/due-date-calculator" component={DueDateCalculator} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/download" component={DownloadPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/medical-review" component={MedicalReview} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Switch>
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/:rest*" component={AdminGuard} />
            <Route path="/admin" component={AdminGuard} />
            <Route>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <ScrollToTop />
                  <Router />
                </main>
                <Footer />
              </div>
            </Route>
          </Switch>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

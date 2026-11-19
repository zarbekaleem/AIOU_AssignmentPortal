import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import BlogSection from '@/components/landing/BlogSection'
import FAQSection from '@/components/landing/FAQSection'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* 2. Hero Section (includes 3. Inline Authentication Card & Product Preview) */}
        <HeroSection />

        {/* 4. Four-Pillar Feature Section */}
        <FeaturesSection />

        {/* 5. Study Blogs Section */}
        <BlogSection />

        {/* 6. Frequently Asked Questions Section */}
        <FAQSection />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}

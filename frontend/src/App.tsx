import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import PricingPage from '@/pages/PricingPage'
import PlaceholderPage from '@/pages/PlaceholderPage'
import { siteConfig } from '@/config/site'

export default function App() {
  return (
    <Routes>
      <Route path={siteConfig.routes.home} element={<LandingPage />} />
      <Route
        path={siteConfig.routes.studentApp}
        element={
          <PlaceholderPage
            title="Student Application Workspace"
            subtitle="The student dashboard, assignment creation flow, and document workspace will be connected in Section 02. Authentication and account creation are ready for backend wiring."
          />
        }
      />
      <Route path="/pricing" element={<PricingPage />} />
      <Route
        path="/blogs"
        element={
          <PlaceholderPage
            title="Study Blogs & Knowledge Base"
            subtitle="Full editorial guides and resources are currently in preparation."
          />
        }
      />
      <Route
        path="/blogs/:slug"
        element={
          <PlaceholderPage
            title="Article Preview"
            subtitle="In-depth article reading view will be available once the blog backend is deployed."
          />
        }
      />
      <Route
        path={siteConfig.legal.privacyPolicy}
        element={
          <PlaceholderPage
            title="Privacy Policy"
            subtitle="Our full privacy policy detailing student data protection and confidential handling will be published here."
          />
        }
      />
      <Route
        path={siteConfig.legal.termsAndConditions}
        element={
          <PlaceholderPage
            title="Terms & Conditions"
            subtitle="Standard user agreement and academic integrity terms will be published here."
          />
        }
      />
      {/* Catch-all */}
      <Route path="*" element={<PlaceholderPage title="Page Not Found" subtitle="The requested page does not exist." />} />
    </Routes>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import PricingPage from '@/pages/PricingPage'
import PlaceholderPage from '@/pages/PlaceholderPage'
import { siteConfig } from '@/config/site'
import StudentLayout from '@/app/layouts/StudentLayout'
import { StudentModulePlaceholder } from '@/app/routes/StudentModulePlaceholder'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import AssignmentsPage from '@/features/dashboard/pages/AssignmentsPage'
import CreateAssignmentPage from '@/features/assignments/pages/CreateAssignmentPage'

export default function App() {
  return (
    <Routes>
      <Route path={siteConfig.routes.home} element={<LandingPage />} />
      <Route path={siteConfig.routes.studentApp} element={<StudentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="assignments/new" element={<CreateAssignmentPage />} />
        <Route path="assignments/:assignmentId" element={<StudentModulePlaceholder title="Assignment details" description="Assignment details will be loaded from your student account when the assignment API is connected." />} />
        <Route path="assignments/:assignmentId/questions" element={<StudentModulePlaceholder title="Question review" description="Extracted questions and review actions will be available after document-processing services are connected." />} />
        <Route path="assignments/:assignmentId/editor" element={<StudentModulePlaceholder title="Assignment editor" description="Answer editing and regeneration will be added when assignment-generation services are available." />} />
        <Route path="assignments/:assignmentId/preview" element={<StudentModulePlaceholder title="Assignment preview" description="Document preview and export actions will be available after document generation is implemented." />} />
        <Route path="quizzes" element={<StudentModulePlaceholder title="Practice quizzes" description="Aaghi LMS quiz practice is not connected yet. No quiz session or question content is being simulated." />} />
        <Route path="templates" element={<StudentModulePlaceholder title="Cover templates" description="The data-driven AIOU-style cover template gallery will be connected in a future module." />} />
        <Route path="wallet" element={<StudentModulePlaceholder title="Credits & wallet" description="Your credit balance and wallet are unavailable until trusted account and payment services are connected." />} />
        <Route path="payments" element={<StudentModulePlaceholder title="Payment history" description="Payment history will appear here after payment confirmation services are integrated." />} />
        <Route path="profile" element={<StudentModulePlaceholder title="Profile & settings" description="Profile details and account settings require an authenticated student account." />} />
        <Route path="settings" element={<StudentModulePlaceholder title="Settings" description="Account settings will be available when student account services are connected." />} />
      </Route>
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

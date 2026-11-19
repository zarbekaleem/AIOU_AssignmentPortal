import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AuthCard from '../src/components/auth/AuthCard'
import FAQSection from '../src/components/landing/FAQSection'
import Navbar from '../src/components/layout/Navbar'
import { TypewriterHeadline } from '../src/components/landing/TypewriterHeadline'

describe('TypewriterHeadline', () => {
  it('renders headline with correct accessibility label', () => {
    render(<TypewriterHeadline />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveAttribute('aria-label', 'AIOU Assignment & Aaghi LMS Practice Studio')
  })
})

describe('AuthCard', () => {
  it('renders with Log In tab active by default', () => {
    render(
      <MemoryRouter>
        <AuthCard />
      </MemoryRouter>
    )

    expect(screen.getByRole('tab', { name: /Log In/i })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('button', { name: /^Sign In$/i })).toBeInTheDocument()
  })

  it('switches to Sign Up tab when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AuthCard />
      </MemoryRouter>
    )

    const signupTab = screen.getByRole('tab', { name: /Sign Up/i })
    await user.click(signupTab)

    expect(signupTab).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('button', { name: /^Create Account$/i })).toBeInTheDocument()
    expect(screen.getByText(/Create your account and get 2 free credits/i)).toBeInTheDocument()
  })

  it('switches to Forgot Password tab when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AuthCard />
      </MemoryRouter>
    )

    const forgotTab = screen.getByRole('tab', { name: /Forgot Password/i })
    await user.click(forgotTab)

    expect(forgotTab).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('button', { name: /Send Reset Instructions/i })).toBeInTheDocument()
  })
})

describe('Navbar', () => {
  it('renders logo and primary navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText('AIOU Assignment')).toBeInTheDocument()
    expect(screen.getByText('Pricing Packages')).toBeInTheDocument()
  })

  it('toggles mobile menu on mobile menu button click', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const menuButton = screen.getByLabelText(/Open navigation menu/i)
    fireEvent.click(menuButton)

    expect(screen.getByRole('dialog', { name: /Mobile Navigation Menu/i })).toBeInTheDocument()

    const closeButton = screen.getByLabelText(/Close navigation menu/i)
    fireEvent.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('FAQSection', () => {
  it('renders all 10 FAQ items', () => {
    render(
      <MemoryRouter>
        <FAQSection />
      </MemoryRouter>
    )

    expect(screen.getByText('What is AIOU Assignment Studio?')).toBeInTheDocument()
    expect(screen.getByText('How many free credits do new users receive?')).toBeInTheDocument()
    expect(screen.getByText('How can I contact support?')).toBeInTheDocument()
  })
})

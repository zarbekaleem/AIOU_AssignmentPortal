import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import PricingPage from '../src/pages/PricingPage'
import { calculateCreditEstimate, normalizeQuantity } from '../src/utils/pricing'
import { pricingConfig } from '../src/config/pricing'

describe('pricing calculator', () => {
  it('combines assignments and quiz sessions', () => {
    expect(calculateCreditEstimate(3, 2)).toEqual({
      assignments: 3,
      quizSessions: 2,
      totalCredits: 5,
      totalCost: 125,
    })
  })

  it('normalizes invalid and negative quantities', () => {
    expect(normalizeQuantity(-2)).toBe(0)
    expect(normalizeQuantity(Number.NaN)).toBe(0)
    expect(normalizeQuantity(2.8)).toBe(2)
  })

  it('calculates zero values', () => {
    expect(calculateCreditEstimate(0, 0)).toEqual({ assignments: 0, quizSessions: 0, totalCredits: 0, totalCost: 0 })
  })
})

describe('PricingPage', () => {
  it('shows authoritative plan and payment details', () => {
    render(<MemoryRouter><PricingPage /></MemoryRouter>)

    expect(screen.getByText('Rs. 25')).toBeInTheDocument()
    expect(screen.getByText('Rs. 40,000')).toBeInTheDocument()
    expect(screen.getByText('2,000 assignment and quiz credits')).toBeInTheDocument()
    expect(screen.getByText('Full access for 365 days')).toBeInTheDocument()
    expect(screen.getByText(pricingConfig.paymentMethods.easypaisa.paymentNumber)).toBeInTheDocument()
    expect(screen.getByText(pricingConfig.paymentMethods.jazzcash.paymentNumber)).toBeInTheDocument()
    expect(screen.getByText('Muhammad Kaleem')).toBeInTheDocument()
  })

  it('opens and closes the credits purchase dialog', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><PricingPage /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Buy Credits' }))
    expect(screen.getByRole('dialog', { name: 'Purchase assignment credits' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens and closes the VIP purchase dialog', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><PricingPage /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Get Academy VIP' }))
    expect(screen.getByRole('dialog', { name: 'Get Academy & Tutor VIP' })).toBeInTheDocument()
  })

  it('updates the credit estimate immediately', () => {
    render(<MemoryRouter><PricingPage /></MemoryRouter>)

    const assignments = screen.getByLabelText('Assignments')
    const quizzes = screen.getByLabelText('Quiz sessions')
    fireEvent.change(assignments, { target: { value: '3' } })
    fireEvent.change(quizzes, { target: { value: '2' } })

    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Rs. 125')).toBeInTheDocument()
  })

  it('copies the correct EasyPaisa number and reports success', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    render(<MemoryRouter><PricingPage /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Copy EasyPaisa payment number' }))
    expect(writeText).toHaveBeenCalledWith(pricingConfig.paymentMethods.easypaisa.paymentNumber)
    expect(screen.getByRole('status')).toHaveTextContent('Payment number copied to clipboard.')
  })

  it('handles clipboard failure without false success', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockRejectedValue(new Error('Denied'))
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    render(<MemoryRouter><PricingPage /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Copy JazzCash payment number' }))
    expect(writeText).toHaveBeenCalledWith(pricingConfig.paymentMethods.jazzcash.paymentNumber)
    expect(screen.getByRole('status')).toHaveTextContent('Could not copy automatically')
  })

  it('expands a pricing FAQ', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><PricingPage /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'What is one credit?' }))
    expect(screen.getByText('One credit gives you one full solved assignment or one full LMS quiz session.')).toBeVisible()
  })
})

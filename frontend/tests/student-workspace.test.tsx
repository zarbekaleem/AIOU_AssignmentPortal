import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

async function completeDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Assignment title/), 'Education Assignment One')
  await user.type(screen.getByLabelText(/Course name/), 'Foundations of Education')
  await user.type(screen.getByLabelText(/Course code/), '8601')
  await user.type(screen.getByLabelText(/Semester/), 'Autumn 2026')
  await user.type(screen.getByLabelText(/Assignment number/), '1')
  await user.type(screen.getByLabelText(/Student name/), 'Student Name')
  await user.type(screen.getByLabelText(/Roll \/ registration number/), '123456')
  await user.click(screen.getByRole('button', { name: /Continue/ }))
  await screen.findByRole('heading', { name: 'Add assignment questions or references' })
}

async function reachInstructions(user: ReturnType<typeof userEvent.setup>) {
  await completeDetails(user)
  await user.click(screen.getByRole('button', { name: /Continue/ }))
  await screen.findByRole('heading', { name: 'How should your assignment be prepared?' })
}

describe('student workspace routes', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('redirects /app to the dashboard and shows unavailable account data honestly', async () => {
    renderAt('/app')

    expect(await screen.findByRole('heading', { name: 'Welcome to your workspace' })).toBeInTheDocument()
    expect(await screen.findByText(/Student account services are not connected yet/)).toBeInTheDocument()
    expect(screen.getAllByText('Unavailable').length).toBeGreaterThan(0)
  })

  it('offers the create assignment action and assignment list empty state', async () => {
    renderAt('/app/assignments')

    expect(await screen.findByRole('heading', { name: 'Your assignment list will appear here' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Create an assignment/ })).toHaveAttribute('href', '/app/assignments/new')
  })
})

describe('assignment setup workflow', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('validates required assignment details before moving to the next step', async () => {
    const user = userEvent.setup()
    renderAt('/app/assignments/new')

    await user.click(screen.getByRole('button', { name: /Continue/ }))
    expect(await screen.findByText('Enter an assignment title')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tell us about your assignment' })).toBeInTheDocument()
  })

  it('preserves entered instructions when navigating back and forward', async () => {
    const user = userEvent.setup()
    renderAt('/app/assignments/new')
    await reachInstructions(user)

    const instructionText = 'Please use clear academic language and answer every part.'
    await user.type(screen.getByRole('textbox', { name: /Assignment instructions/ }), instructionText)
    await user.click(screen.getByRole('button', { name: /Continue/ }))
    expect(await screen.findByRole('heading', { name: 'Set your answer preferences' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Back/ }))

    expect(await screen.findByRole('textbox', { name: /Assignment instructions/ })).toHaveValue(instructionText)
  })

  it('appends instruction presets without replacing existing text', async () => {
    const user = userEvent.setup()
    renderAt('/app/assignments/new')
    await reachInstructions(user)

    const textarea = screen.getByRole('textbox', { name: /Assignment instructions/ })
    await user.type(textarea, 'Keep my opening instruction.')
    await user.click(screen.getByRole('button', { name: 'Detailed academic answers' }))

    expect(textarea).toHaveValue('Keep my opening instruction.\n\nProvide detailed academic answers with clear explanations.')
  })

  it('rejects unsupported files and permits a valid selected file to be removed', async () => {
    const user = userEvent.setup()
    renderAt('/app/assignments/new')
    await completeDetails(user)

    const input = screen.getByLabelText('Select assignment source file') as HTMLInputElement
    const dropTarget = screen.getByText('Drop files here or browse').parentElement
    expect(dropTarget).not.toBeNull()
    fireEvent.drop(dropTarget as HTMLElement, { dataTransfer: { files: [new File(['bad'], 'instructions.exe', { type: 'application/octet-stream' })] } })
    expect(await screen.findByRole('alert')).toHaveTextContent('Choose a PDF, DOCX, JPG, JPEG, or PNG file.')

    await user.upload(input, new File(['pdf-content'], 'questions.pdf', { type: 'application/pdf' }))
    expect(await screen.findByText('questions.pdf')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove questions.pdf' }))
    await waitFor(() => expect(screen.queryByText('questions.pdf')).not.toBeInTheDocument())
  })

  it('allows questions to be manually added and edited without claiming extraction', async () => {
    const user = userEvent.setup()
    renderAt('/app/assignments/new')
    await reachInstructions(user)
    await user.type(screen.getByRole('textbox', { name: /Assignment instructions/ }), 'Answer the questions in clear language.')
    await user.click(screen.getByRole('button', { name: /Continue/ }))
    await user.click(screen.getByRole('button', { name: /Continue/ }))
    expect(await screen.findByRole('heading', { name: 'Check the questions for your assignment' })).toBeInTheDocument()
    expect(screen.getByText(/Automatic question extraction is not connected yet/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Add a question' }))
    await user.type(screen.getByLabelText('Question 1'), 'Define distance education.')
    expect(screen.getByLabelText('Question 1')).toHaveValue('Define distance education.')
  })

  it('does not simulate generation or credit deduction when integration is unavailable', async () => {
    const user = userEvent.setup()
    renderAt('/app/assignments/new')
    await reachInstructions(user)
    await user.type(screen.getByRole('textbox', { name: /Assignment instructions/ }), 'Answer the questions with examples.')
    await user.click(screen.getByRole('button', { name: /Continue/ }))
    await user.click(screen.getByRole('button', { name: /Continue/ }))
    await user.click(screen.getByRole('button', { name: 'Add a question' }))
    await user.type(screen.getByLabelText('Question 1'), 'Explain learning.')
    await user.click(screen.getByRole('button', { name: /Continue/ }))

    expect(await screen.findByRole('heading', { name: 'Review your assignment setup' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Request generation' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/generation is not connected yet/)
    expect(screen.getByText(/no credits have been deducted/i)).toBeInTheDocument()
  })
})

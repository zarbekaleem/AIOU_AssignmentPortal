import { useState, useEffect } from 'react'

const FULL_TEXT = 'AIOU Assignment & Aaghi LMS Practice Studio'
const PART1 = 'AIOU Assignment & '
const PART2 = 'Aaghi LMS '
const PART1_LEN = PART1.length // 18
const PART2_LEN = PART1_LEN + PART2.length // 28

export function TypewriterHeadline() {
  const [displayedLength, setDisplayedLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayedLength < FULL_TEXT.length) {
      // Typing next character
      timeout = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1)
      }, 70)
    } else if (!isDeleting && displayedLength === FULL_TEXT.length) {
      // Pause at full text before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2500)
    } else if (isDeleting && displayedLength > 0) {
      // Deleting character
      timeout = setTimeout(() => {
        setDisplayedLength((prev) => prev - 1)
      }, 35)
    } else if (isDeleting && displayedLength === 0) {
      // Pause at empty before retyping
      timeout = setTimeout(() => {
        setIsDeleting(false)
      }, 600)
    }

    return () => clearTimeout(timeout)
  }, [displayedLength, isDeleting])

  const renderContent = () => {
    if (displayedLength <= PART1_LEN) {
      return (
        <span className="text-slate-900 dark:text-white">
          {FULL_TEXT.slice(0, displayedLength)}
        </span>
      )
    }

    if (displayedLength <= PART2_LEN) {
      return (
        <>
          <span className="text-slate-900 dark:text-white">{PART1}</span>
          <span className="text-indigo-600 dark:text-indigo-400 bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
            {FULL_TEXT.slice(PART1_LEN, displayedLength)}
          </span>
        </>
      )
    }

    return (
      <>
        <span className="text-slate-900 dark:text-white">{PART1}</span>
        <span className="text-indigo-600 dark:text-indigo-400 bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
          {PART2}
        </span>
        <span className="text-slate-900 dark:text-white">
          {FULL_TEXT.slice(PART2_LEN, displayedLength)}
        </span>
      </>
    )
  }

  return (
    <h1
      id="hero-heading"
      className="text-base sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-extrabold tracking-[-0.02em] whitespace-nowrap flex items-center justify-center text-center mx-auto min-h-[2.25rem] sm:min-h-[2.75rem] lg:min-h-[3.25rem] px-2"
      aria-label={FULL_TEXT}
    >
      <span className="inline-block whitespace-nowrap">{renderContent()}</span>
      <span
        className="inline-block w-[2.5px] sm:w-[3px] h-[0.9em] bg-indigo-600 dark:bg-indigo-400 ml-1.5 align-middle animate-pulse rounded-full flex-shrink-0"
        aria-hidden="true"
      />
    </h1>
  )
}

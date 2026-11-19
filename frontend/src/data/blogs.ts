export interface BlogPost {
  id: string
  title: string
  description: string
  category: string
  date: string
  slug: string
  imageAlt: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Prepare AIOU Assignments',
    description: 'A step-by-step guide to preparing well-structured assignments for Allama Iqbal Open University that meet submission requirements.',
    category: 'Assignment Tips',
    date: 'Sample Content',
    slug: 'how-to-prepare-aiou-assignments',
    imageAlt: 'Student preparing an assignment',
  },
  {
    id: '2',
    title: 'AIOU Assignment Submission Guidelines',
    description: 'Understand the AIOU assignment submission process, deadlines, and formatting requirements to avoid common mistakes.',
    category: 'Guidelines',
    date: 'Sample Content',
    slug: 'aiou-assignment-submission-guidelines',
    imageAlt: 'Assignment submission checklist',
  },
  {
    id: '3',
    title: 'How to Use Aaghi LMS Effectively',
    description: 'Make the most of the Aaghi Learning Management System for accessing study materials, quizzes, and academic resources.',
    category: 'LMS Guide',
    date: 'Sample Content',
    slug: 'how-to-use-aaghi-lms',
    imageAlt: 'Using Aaghi LMS platform',
  },
  {
    id: '4',
    title: 'Tips for Preparing AIOU Exams',
    description: 'Effective study strategies and revision techniques tailored for AIOU distance learners preparing for examinations.',
    category: 'Study Tips',
    date: 'Sample Content',
    slug: 'tips-for-aiou-exam-preparation',
    imageAlt: 'Student studying for exams',
  },
  {
    id: '5',
    title: 'How to Format an Assignment in Microsoft Word',
    description: 'Professional formatting techniques for academic assignments including margins, fonts, headings, and cover page design.',
    category: 'Formatting',
    date: 'Sample Content',
    slug: 'format-assignment-microsoft-word',
    imageAlt: 'Microsoft Word document formatting',
  },
  {
    id: '6',
    title: 'Effective Study Strategies for Distance Learners',
    description: 'Practical time management and study methods for students enrolled in distance education programs.',
    category: 'Study Skills',
    date: 'Sample Content',
    slug: 'study-strategies-distance-learners',
    imageAlt: 'Distance learner studying at home',
  },
]

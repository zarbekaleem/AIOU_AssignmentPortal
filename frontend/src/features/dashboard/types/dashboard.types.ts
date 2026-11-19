export interface DashboardAssignment {
  id: string
  title: string
  courseCode: string
  updatedAt: string
  status: 'draft' | 'uploaded' | 'processing' | 'questions_ready' | 'generating' | 'review_required' | 'completed' | 'failed'
}

export interface DashboardOverview {
  studentName: string
  availableCredits: number
  totalAssignments: number
  completedAssignments: number
  inProgressAssignments: number
  recentAssignments: DashboardAssignment[]
}

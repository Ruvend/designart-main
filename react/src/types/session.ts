export interface Session {
  startTime: string
  endTime: string
  user_journey: string[]
  score: number
  video: string
  analysis_timestamp: string
  analysis: {
    analysis_results: {
      recommendations: string[]
    }[]
  }
}

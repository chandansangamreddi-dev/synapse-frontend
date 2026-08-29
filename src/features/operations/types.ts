/** Operational status values defined for SYNAPSE train monitoring. */
export type TrainStatus =
  | 'on_time'
  | 'delayed'
  | 'held'
  | 'approaching'
  | 'conflict'
  | 'unknown'

/** A train visible to an operations controller. All date-time values are ISO 8601 strings. */
export type Train = {
  id: string
  trainNumber: string
  trainName: string
  origin: string
  destination: string
  scheduledArrival: string
  scheduledDeparture: string
  estimatedArrival: string | null
  estimatedDeparture: string | null
  platform: string | null
  status: TrainStatus
  delayMinutes: number
}

/** Headline measures for the operations dashboard. */
export type DashboardKpiMetrics = {
  activeTrains: number
  onTimeTrains: number
  delayedTrains: number
  activeConflicts: number
  pendingRecommendations: number
}

export type ConflictSeverity = 'low' | 'medium' | 'high' | 'critical'
export type ConflictStatus = 'active' | 'acknowledged' | 'resolved'

/** A concise representation of an operational conflict. */
export type ConflictSummary = {
  id: string
  title: string
  severity: ConflictSeverity
  status: ConflictStatus
  affectedTrainIds: string[]
  detectedAt: string
}

export type RecommendationStatus = 'pending' | 'accepted' | 'dismissed'

/** A concise recommendation presented for operator review. */
export type RecommendationSummary = {
  id: string
  title: string
  description: string
  status: RecommendationStatus
  affectedTrainIds: string[]
  createdAt: string
}

export type SystemHealthStatus = 'live' | 'stale' | 'reconnecting' | 'offline' | 'degraded'

/** The current availability and freshness of the operations data source. */
export type SystemHealth = {
  status: SystemHealthStatus
  lastUpdatedAt: string
  message: string
}

/** Static dashboard data shape; a backend-backed view will populate this later. */
export type OperationsOverview = {
  kpiMetrics: DashboardKpiMetrics
  trains: Train[]
  conflicts: ConflictSummary[]
  recommendations: RecommendationSummary[]
  systemHealth: SystemHealth
}

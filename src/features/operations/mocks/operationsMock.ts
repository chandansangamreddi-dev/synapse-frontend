import type {
  ConflictSummary,
  DashboardKpiMetrics,
  OperationsOverview,
  RecommendationSummary,
  SystemHealth,
  Train,
} from '../types'

// TEMPORARY MOCK DATA: replace these exports with backend-provided data when the
// operations API integration is available. This module intentionally has no fetch logic.
export const operationsTrainsMock: Train[] = [
  {
    id: 'train-12001',
    trainNumber: '12001',
    trainName: 'SYNAPSE Express',
    origin: 'Central Junction',
    destination: 'North Terminal',
    scheduledArrival: '2026-08-29T09:15:00+05:30',
    scheduledDeparture: '2026-08-29T09:20:00+05:30',
    estimatedArrival: '2026-08-29T09:15:00+05:30',
    estimatedDeparture: '2026-08-29T09:20:00+05:30',
    platform: '2',
    status: 'on_time',
    delayMinutes: 0,
  },
  {
    id: 'train-14518',
    trainNumber: '14518',
    trainName: 'Intercity Service',
    origin: 'East Point',
    destination: 'Central Junction',
    scheduledArrival: '2026-08-29T09:25:00+05:30',
    scheduledDeparture: '2026-08-29T09:30:00+05:30',
    estimatedArrival: '2026-08-29T09:37:00+05:30',
    estimatedDeparture: '2026-08-29T09:42:00+05:30',
    platform: '4',
    status: 'delayed',
    delayMinutes: 12,
  },
  {
    id: 'train-16703',
    trainNumber: '16703',
    trainName: 'Coastal Link',
    origin: 'Harbor City',
    destination: 'West End',
    scheduledArrival: '2026-08-29T09:40:00+05:30',
    scheduledDeparture: '2026-08-29T09:45:00+05:30',
    estimatedArrival: '2026-08-29T09:43:00+05:30',
    estimatedDeparture: null,
    platform: null,
    status: 'approaching',
    delayMinutes: 3,
  },
]

export const operationsKpiMetricsMock: DashboardKpiMetrics = {
  activeTrains: 3,
  onTimeTrains: 1,
  delayedTrains: 1,
  activeConflicts: 1,
  pendingRecommendations: 1,
}

export const operationsConflictsMock: ConflictSummary[] = [
  {
    id: 'conflict-platform-04',
    title: 'Platform 4 occupancy overlap',
    severity: 'high',
    status: 'active',
    affectedTrainIds: ['train-14518', 'train-16703'],
    detectedAt: '2026-08-29T09:10:00+05:30',
  },
]

export const operationsRecommendationsMock: RecommendationSummary[] = [
  {
    id: 'recommendation-platform-04',
    title: 'Review platform allocation for Intercity Service',
    description: 'Platform 4 is expected to remain occupied beyond the scheduled arrival window.',
    status: 'pending',
    affectedTrainIds: ['train-14518', 'train-16703'],
    createdAt: '2026-08-29T09:11:00+05:30',
  },
]

export const operationsSystemHealthMock: SystemHealth = {
  status: 'live',
  lastUpdatedAt: '2026-08-29T09:12:00+05:30',
  message: 'Operations data is current.',
}

/** TEMPORARY MOCK DATA: replace with the backend-backed operations overview. */
export const operationsOverviewMock: OperationsOverview = {
  kpiMetrics: operationsKpiMetricsMock,
  trains: operationsTrainsMock,
  conflicts: operationsConflictsMock,
  recommendations: operationsRecommendationsMock,
  systemHealth: operationsSystemHealthMock,
}

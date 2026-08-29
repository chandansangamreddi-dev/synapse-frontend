import type { ReactNode } from 'react'

import { FreshnessIndicator, type FreshnessState } from '../../../components/status/FreshnessIndicator'
import { EmptyState } from '../../../components/ui/EmptyState'
import type { RecommendationSummary } from '../types'

export type AIRecommendation = RecommendationSummary & {
  optimizationRunId?: string
  currentPlanSummary?: string
  recommendedPlanSummary?: string
  expectedImpact?: string
  constraints?: readonly string[]
  reasoning?: string
  freshnessState?: FreshnessState
  freshnessUpdatedAt?: string
}

type AIRecommendationPanelProps = {
  recommendation?: AIRecommendation
  onReview?: (recommendation: AIRecommendation) => void
}

type RecommendationDetailProps = {
  label: string
  children: ReactNode
}

function RecommendationDetail({ label, children }: RecommendationDetailProps) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">{label}</dt>
      <dd className="mt-1 text-sm leading-5 text-slate-800">{children}</dd>
    </div>
  )
}

/** Presents supplied recommendation details as reviewable operator decision support. */
export function AIRecommendationPanel({ recommendation, onReview }: AIRecommendationPanelProps) {
  if (recommendation === undefined) {
    return (
      <section aria-labelledby="ai-recommendation-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
        <h2 id="ai-recommendation-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
          AI recommendation
        </h2>
        <EmptyState
          title="No recommendation available"
          description="No reviewable recommendation has been supplied for the current operations view."
        />
      </section>
    )
  }

  return (
    <section aria-labelledby="ai-recommendation-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="ai-recommendation-heading" className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            AI recommendation
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            Reviewable decision support only. This advice does not execute railway-control actions.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-md border border-sky-300 bg-sky-50 px-2 py-1 text-xs font-semibold capitalize text-sky-900">
          Status: {recommendation.status}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-slate-950">{recommendation.title}</p>
          <p className="mt-1 text-sm leading-5 text-slate-700">{recommendation.description}</p>
        </div>
        {recommendation.freshnessState !== undefined ? (
          <FreshnessIndicator
            state={recommendation.freshnessState}
            lastUpdatedAt={recommendation.freshnessUpdatedAt}
          />
        ) : null}
      </div>

      <dl className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
        <RecommendationDetail label="Generated">
          <time dateTime={recommendation.createdAt}>{recommendation.createdAt}</time>
        </RecommendationDetail>
        {recommendation.optimizationRunId !== undefined ? (
          <RecommendationDetail label="Optimization run ID">
            {recommendation.optimizationRunId}
          </RecommendationDetail>
        ) : null}
        {recommendation.currentPlanSummary !== undefined ? (
          <RecommendationDetail label="Current plan summary">
            {recommendation.currentPlanSummary}
          </RecommendationDetail>
        ) : null}
        {recommendation.recommendedPlanSummary !== undefined ? (
          <RecommendationDetail label="Recommended plan summary">
            {recommendation.recommendedPlanSummary}
          </RecommendationDetail>
        ) : null}
        {recommendation.expectedImpact !== undefined ? (
          <RecommendationDetail label="Expected impact">
            {recommendation.expectedImpact}
          </RecommendationDetail>
        ) : null}
        {recommendation.constraints !== undefined ? (
          <RecommendationDetail label="Constraints">
            <ul className="list-disc space-y-1 pl-4">
              {recommendation.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </RecommendationDetail>
        ) : null}
        {recommendation.reasoning !== undefined ? (
          <RecommendationDetail label="Plain-language reasoning">
            {recommendation.reasoning}
          </RecommendationDetail>
        ) : null}
      </dl>

      {onReview !== undefined ? (
        <button
          type="button"
          onClick={() => onReview(recommendation)}
          className="mt-4 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Review recommendation
        </button>
      ) : null}
    </section>
  )
}

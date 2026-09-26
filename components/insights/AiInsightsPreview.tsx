/**
 * Marketing illustration of the shipping AI Insights drawer.
 * Insight types match the deterministic engine — not a generic AI graphic.
 */
const INSIGHTS = [
  {
    tone: "risk",
    label: "Project risk",
    title: "Website Redesign needs attention",
    why: "Health 64/100 · overdue work and blocked dependencies",
  },
  {
    tone: "schedule",
    label: "Schedule risk",
    title: "Deadline at risk",
    why: "3 overdue tasks · reduced 7-day completion velocity",
  },
  {
    tone: "workload",
    label: "Workload",
    title: "Uneven assignment across the team",
    why: "One member holds a high share of open high-priority work",
  },
] as const;

export function AiInsightsPreview() {
  return (
    <div className="ai-insights-preview" aria-hidden="true">
      <div className="ai-insights-preview-chrome">
        <span className="ai-insights-preview-dot" />
        <span className="ai-insights-preview-dot" />
        <span className="ai-insights-preview-dot" />
        <span className="ai-insights-preview-brand">AI Insights</span>
      </div>
      <div className="ai-insights-preview-body">
        <div className="ai-insights-preview-score">
          <div className="ai-insights-preview-score-ring">
            <span>64</span>
          </div>
          <div>
            <p className="ai-insights-preview-kicker">Project health</p>
            <p className="ai-insights-preview-score-label">Needs attention</p>
            <p className="ai-insights-preview-score-meta">
              Schedule · tasks · overdue · dependencies
            </p>
          </div>
        </div>
        <ul className="ai-insights-preview-list">
          {INSIGHTS.map((item) => (
            <li key={item.title} className={`ai-insights-preview-item is-${item.tone}`}>
              <span className="ai-insights-preview-item-label">{item.label}</span>
              <p className="ai-insights-preview-item-title">{item.title}</p>
              <p className="ai-insights-preview-item-why">{item.why}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

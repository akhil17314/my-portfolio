export const architecture = [
  { title: 'Orchestration pattern', text: 'A single entrypoint agent dispatches on execution purpose, then a priority-ordered router selects one of eight scenario paths per turn, keeping control flow explicit and testable.' },
  { title: 'Shared session state', text: 'Every agent reads/writes a common ADK session object — classifier results, guardrail flags, knowledge cache, and conversation history flow through one contract instead of ad-hoc message passing.' },
  { title: 'Guardrail sandwich', text: 'Input guardrails and prompt-injection checks run before any generation; output guardrails and BigQuery audit logging run after — isolating safety logic from the agents producing content.' },
  { title: 'Deterministic rules engine', text: 'The Targeted Support journey uses explicit tools for fact recording, contradiction handling, and policy checks — regulatory logic lives in code, not in the prompt.' },
  { title: 'Resilient external integration', text: 'External systems are called asynchronously in parallel via a fan-out helper with per-task failure isolation, retry policies (Tenacity), and mTLS certificate handling via Secret Manager.' },
  { title: 'Observability by design', text: 'OpenTelemetry instruments FastAPI, Starlette, gRPC, and HTTPX; traces and metrics export to GCP Trace/Monitoring, while BigQuery captures structured guardrail and classifier audit records.' },
  { title: 'Deployment topology', text: 'The core service runs on Vertex AI Agent Engine behind FastAPI; auxiliary load-testing and batch jobs run as containerized Kubernetes CronJobs with Helm-managed configuration per environment.' },
  { title: 'Model abstraction', text: 'LiteLLM decouples agents from a specific model provider, enabling guardrail-wrapped chat completions and simplifying future model swaps without touching agent logic.' },
];

export const achievements = [
  { title: 'Complex technical challenges', text: 'Coordinated 15+ specialized agents around one shared session-state contract without creating tangled coupling; built a deterministic rules engine for a safeguarding-sensitive customer journey where LLM non-determinism was unacceptable.' },
  { title: 'Scalability', text: 'Async fan-out across multiple external systems with per-task isolation prevents one slow/failing dependency from blocking an entire conversation turn; deployment on Vertex AI Agent Engine supports elastic scaling of the core service.' },
  { title: 'Performance optimizations', text: 'Dedicated performance test suite (pytest-benchmark) profiles callback and orchestration hot paths; a Cloud Run–based load-test matrix exercises the deployed Agent Engine under realistic concurrency before release.' },
  { title: 'Security implementations', text: 'End-to-end certificate lifecycle management (PFX → PEM conversion, Secret Manager storage, mTLS) for integrations with sensitive backend systems; layered input/output guardrails and PII redaction protect both customers and the business.' },
  { title: 'Reusable component design', text: 'Shared "custom components" (session manager, guardrails, BigQuery service, parallel runner, external API clients) are reused across every agent, avoiding duplicated integration logic across the codebase.' },
  { title: 'Automation & CI/CD', text: 'Harness-based CI/CD pipelines, pre-commit hooks (ruff, ty), and an enforced pytest coverage gate keep quality consistent; a Pegasus-based evaluation suite automatically scores RAG quality, summarization, and escalation handling pre-release.' },
];

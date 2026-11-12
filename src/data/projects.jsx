export const investAi = {
  id: 'project',
  title: 'Invest AI — Multi-Agent Conversational Guidance Platform',
  intro:
    'A production conversational AI platform that orchestrates specialized agents to deliver compliant, personalized investment and financial-wellbeing guidance to customers of a regulated financial services organization.',
  stack: [
    'Google ADK', 'google-genai', 'LiteLLM', 'FastAPI', 'Uvicorn', 'Pydantic v2',
    'Vertex AI Agent Engine', 'BigQuery', 'Secret Manager', 'OpenTelemetry', 'Docker',
    'Kubernetes', 'Helm', 'Harness CI/CD', 'pytest', 'Pegasus Evals',
  ],
  rows: [
    {
      heading: 'Overview',
      content:
        'Invest AI is a FastAPI-hosted, Google ADK-based multi-agent system deployed on Vertex AI Agent Engine. Instead of a single chatbot prompt, the system routes every customer message through a pipeline of specialized agents — classification, guardrails, knowledge retrieval, rules-based decisioning, rewriting, and next-best-action selection — each with a clear contract over a shared session state.',
    },
    {
      heading: 'Problem',
      content:
        'Financial guidance conversations must be accurate, compliant, explainable, and safe — a single LLM call cannot guarantee any of that. The business needed a system that could: classify customer intent and risk signals, pull verified data from multiple backend systems, apply deterministic policy rules for sensitive journeys (e.g. targeted support for vulnerable customers), guardrail every LLM output, and produce a full audit trail — all while remaining responsive in a live chat experience.',
    },
    {
      heading: 'Solution',
      content: (
        <>
          I designed an orchestrator agent that parses each request's <code>execution_purpose</code>{' '}
          (chat, initialize_session, update_feedback, end_session) and dispatches to a routing layer that
          evaluates scenarios in strict priority order: hard handoff → soft handoff → stock response → app
          guidance → targeted support → product guidance → general knowledge → fallback. Input guardrails and
          prompt-injection detection run before classification; output guardrails and BigQuery logging run after
          generation. A dedicated <strong>Targeted Support</strong> flow walks customers through a rules-driven
          fact-collection → confirmation → inference → delivery pipeline with deterministic policy checks,
          contradiction handling, and full exit/handoff controls — critical for vulnerable-customer safeguarding.
        </>
      ),
    },
    {
      heading: 'Architecture',
      content: (
        <>
          The system follows a layered agent-orchestration architecture: an entrypoint{' '}
          <code>OrchestratorAgent</code> wraps business logic in an <code>AdkApp</code> with BigQuery logging and
          tracing plugins; a routing layer dispatches to intent-specific sub-agents (guidance, general knowledge,
          app navigation, targeted support); shared "custom components" provide session management, guardrails,
          external API fan-out (with retry/mTLS), and BigQuery persistence. State flows through a single ADK
          session object, letting every agent read and extend a shared context without tight coupling.
        </>
      ),
    },
    {
      heading: 'Key Contributions',
      list: [
        'Designed the agent routing/priority system and session-state contract shared across 15+ agents.',
        'Built the guardrails integration layer for input/output safety checks and BigQuery audit logging.',
        'Implemented the Targeted Support rules engine: fact collection, contradiction handling, policy checks, and confirmation/inference/delivery hand-off.',
        'Built async external-API fan-out (AOV, OCIS, SARS-style checks) with mTLS, retries, and certificate lifecycle management via Secret Manager.',
        'Set up OpenTelemetry tracing across FastAPI, gRPC, HTTPX, and the GenAI SDK, exported to GCP Trace/Monitoring.',
        'Established a 6-tier automated test strategy (unit, integration, e2e, performance, mutation, deployment) with an enforced coverage gate in CI.',
        'Built persona-based conversation simulation and confidence-tracking harnesses to validate agent behavior before release.',
      ],
    },
    {
      heading: 'Business Impact',
      list: [
        'Enabled compliant, scalable automated guidance for a regulated financial product, reducing reliance on manual advisor time for routine queries.',
        'Reduced risk exposure through deterministic policy gates and full audit trails for vulnerable-customer journeys.',
        'Improved release confidence via layered testing, persona simulation, and an evaluation framework covering RAG quality, summarization, and escalation behavior.',
        'Enabled safe iteration on LLM prompts/models by decoupling business rules from the language model through guardrails and deterministic tools.',
      ],
    },
    {
      heading: 'Lessons Learned',
      content:
        'Reliability in agentic AI systems comes from architecture, not prompting alone. Pushing business-critical logic (policy checks, eligibility rules, contradiction handling) into deterministic tools — rather than trusting the model to "remember" them — was the single biggest driver of consistency. Equally, treating observability (tracing, structured logging, BigQuery audit records) as a first-class requirement from day one made debugging multi-agent conversations tractable instead of a black box.',
    },
  ],
};

export const skillsRefactor = {
  id: 'project-skills',
  title: 'Targeted Support Refactor — Multi-Agent to Single-Agent + Skills',
  intro:
    "Re-architected Invest AI's Targeted Support journey, replacing a 4-agent handoff pipeline with a single ADK agent driven by state-based skill dispatch — cutting agent count, token usage, cost, and latency while preserving behavior.",
  stack: [
    'Google ADK', 'Agent callbacks (before_agent / before_model)', 'State-driven prompt dispatch',
    'Custom Skills (SKILL.md + loader)', 'Python async', 'pytest',
  ],
  rows: [
    {
      heading: 'Overview',
      content: (
        <>
          The Targeted Support journey — a safeguarding-sensitive fact-collection → confirmation → inference →
          delivery flow — originally ran as four separate ADK <code>Agent</code> objects (
          <code>ClarifierAgent</code>, <code>ConfirmationAgent</code>, <code>InferenceAgent</code>,{' '}
          <code>DeliveryAgent</code>) wired together with model-invoked <code>transfer_to_agent</code> handoffs. I
          redesigned this into a single <code>TargetedSupportAgent</code> whose instruction and available tools are
          selected dynamically per turn based on session state, with the two purely-deterministic stages (inference
          and delivery) pulled out of the agent graph entirely into a plain async Python function.
        </>
      ),
    },
    {
      heading: 'Problem',
      content: (
        <>
          Four agents meant four LLM round-trips worth of instruction/tool overhead, fragile model-dependent{' '}
          <code>transfer_to_agent</code> handoffs that could fail or loop, and two of those agents (
          <code>InferenceAgent</code>, <code>DeliveryAgent</code>) existed only to satisfy ADK's Agent machinery
          despite making no real LLM decision — pure wasted tokens, cost, and latency on a safeguarding-critical
          path.
        </>
      ),
    },
    {
      heading: 'Solution',
      content: (
        <>
          I collapsed the four agents into one, using <code>before_agent</code>/<code>build_instruction</code>{' '}
          callbacks that read session state (<code>is_collection_phase</code>, <code>is_confirmation_phase</code>)
          to select the right prompt content — structured as lightweight "skills" (<code>SKILL.md</code> files
          loaded via a custom <code>skills/loader.py</code>, not ADK's formal Skills API, which I evaluated and
          intentionally did not adopt). To keep the same tight tool scoping the old per-agent design had, a{' '}
          <code>before_model</code> callback (<code>_filter_tools_for_phase</code>) dynamically trims the tools and
          function declarations advertised to the model down to just the 3 relevant to the active phase on every
          call. Inference and delivery — previously two fake "agents" — became a single plain async function (
          <code>run_inference_and_delivery</code>) with zero LLM round-trips.
        </>
      ),
    },
    {
      heading: 'Key Contributions',
      list: [
        <>Replaced 4 ADK agents with 1, removing all <code>transfer_to_agent</code> handoff call sites and the model-dependent routing failures they could cause.</>,
        <>Built per-phase instruction dispatch and a dynamic tool-filtering callback so the model only ever sees the 3 tools relevant to its current phase, despite a single static <code>tools=[...]</code> registration.</>,
        'Extracted the non-LLM inference/delivery steps into a plain Python function, eliminating two unnecessary agent round-trips entirely.',
        "Evaluated ADK's formal Skills/Toolset API and deliberately chose a lighter prompt-template convention instead, avoiding added token/schema overhead with no functional benefit.",
        'Rewrote the scenario test suite and simulation/runner code against the new single-agent design; validated with a full regression run (807 passed).',
      ],
    },
    {
      heading: 'Business Impact',
      list: [
        'Reduced the number of agents in the journey from 4 to 1, cutting per-turn token usage, model cost, and latency on a high-stakes customer flow.',
        'Removed a whole class of fragile, model-dependent handoff failures by replacing them with deterministic state checks.',
        'Simplified the maintenance surface to one instruction/tool definition instead of four, while preserving the original per-phase tool scoping guarantees.',
      ],
    },
    {
      heading: 'Lessons Learned',
      content: (
        <>
          Not every step in an agentic pipeline needs to be an <code>Agent</code> — steps with no real LLM decision
          are cheaper, faster, and more honest as plain functions. And when collapsing multiple agents into one,
          dynamic per-turn tool filtering can recover the same scoping benefits multi-agent designs provide, without
          paying for the extra agents.
        </>
      ),
    },
  ],
};

export const qaAssistant = {
  id: 'project-qa-assistant',
  title: 'Document Q&A Multi-Agent Assistant',
  intro:
    'A local-first, multi-agent RAG app for asking questions about uploaded PDFs. LangGraph orchestrates an input guard, scope router, page-aware Chroma retrieval, a Gemini answerer with schema-validated citations, and a claim-level grounding check with bounded retry and abstention. Includes a Streamlit UI, output redaction, and an evaluation suite (RAGAS, safety, latency).',
  stack: [
    'LangGraph', 'Gemini', 'ChromaDB', 'Sentence-Transformers', 'Pydantic', 'Streamlit',
    'RAGAS', 'pytest', 'Hugging Face Spaces',
  ],
  rows: [],
};

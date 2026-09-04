# Example: doc-diagram

## Scenario

Add architecture and flow Mermaid diagrams to a SpecForge PRD that describes Skill / Loop / Graph layers but has no visuals.

## Input

```text
@doc-diagram
docPath: docs/prd-to-code-v1.0.md
mode: write
diagramTypes: architecture, flowchart
alignCode: true
```

## Expected

1. **Phase A** — Detect missing architecture/flow visuals under system architecture section.
2. **Phase B** — Extract Skill / Loop / Graph layers and PRD→code main path.
3. **Phase C** — Mermaid layered architecture + flowchart (read PRD → decompose → module loop → route).
4. **Phase D** — Insert under `## 架构与流程图` (or existing architecture heading).
5. **Phase E** — Risks (doc drift vs code) + manual Mermaid preview check.

## Preview only

```text
@doc-diagram
docPath: README.md
mode: preview
```

Prints Mermaid in chat; does not modify files.

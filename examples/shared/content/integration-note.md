---
title: Integration Checklist
summary: The same checklist is rendered by every framework example.
heroImage: ../assets/commonloom-icon-light-transparent.png
tags:
  - integration
  - checklist
---

## Integration Checklist

Every example should prove the same contract:

1. Import Commonloom through the public package entrypoint.
2. Compile this shared Markdown without framework-specific parser behavior.
3. Apply the shared SCSS visual treatment.
4. Display the shared Commonloom asset.
5. Keep framework code in the example, not in Commonloom core.

The backing technology changes; the content and intent do not.

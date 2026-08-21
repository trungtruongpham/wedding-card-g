---
title: "Venue Family Addresses"
description: "Show the groom and bride family addresses in VenueSection."
status: completed
priority: P2
branch: ""
tags: []
blockedBy: []
blocks: []
created: "2026-08-21T15:25:18.438Z"
createdBy: "ck:plan"
source: skill
---

# Venue Family Addresses

## Overview

Add a data-driven invitation block above the reception venue map. It presents the
two existing `families` entries as groom-side and bride-side addresses while
preserving the invitation's burgundy, ivory, and formal-serif visual language.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Venue Family Addresses](./phase-01-venue-family-addresses.md) | Completed |

## Dependencies

- Existing `weddingData.families` content.
- Existing `SectionHeading` and Tailwind theme tokens.

## Acceptance Criteria

- Both family addresses are visible and labeled by household.
- Address content remains editable in `src/data/wedding-data.js`.
- The layout stacks on narrow phones and becomes two columns when space permits.
- Existing reception map and dress-code content remain unchanged.
- Production build passes.

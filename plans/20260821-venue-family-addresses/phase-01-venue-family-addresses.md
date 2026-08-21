---
phase: 1
title: "Venue Family Addresses"
status: completed
effort: "small"
---

# Phase 1: Venue Family Addresses

## Overview

Add a responsive family-address invitation block to `VenueSection` before the
existing reception venue map.

## Context Links

- [`README.md`](../../README.md)
- [`VenueSection.jsx`](../../src/components/VenueSection.jsx)
- [`wedding-data.js`](../../src/data/wedding-data.js)

## Key Insights

- Both addresses already live in `weddingData.families`; no duplicate content is needed.
- Long Vietnamese addresses need wrapping and a stacked small-phone layout.
- The reference uses mirrored household columns, burgundy title pills, and address bands.

## Requirements

- Label the first family as nhà trai and the second as nhà gái.
- Use semantic headings and `<address>` elements.
- Preserve the venue map and dress-code sections.
- Avoid horizontal overflow at 320px.

## Related Files

- Modify `src/components/VenueSection.jsx`.
- Do not change address values in `src/data/wedding-data.js`.

## Implementation Steps

1. Add a small data-to-label mapping for the two households.
2. Render a reusable family address article for each existing family entry.
3. Stack the articles by default and switch to two columns when space permits.
4. Run the production build and inspect the generated component classes.

## Todo

- [x] Add family address markup.
- [x] Keep content data-driven.
- [x] Verify the production build.

## Success Criteria

- [x] Both household addresses render with clear labels.
- [x] Existing venue and dress-code behavior is preserved.
- [x] The layout is responsive and semantic.
- [x] `npm run build` completes successfully.

## Risks and Rollback

- Very long addresses may make the two desktop columns different heights; flex-filled
  address bands keep them visually balanced.
- Roll back by removing `FamilyAddress`, `familyVenueLabels`, and the new first section.

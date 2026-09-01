+# Voyager Tags Thesis — v3.1, rubric-applied

- +Status: working draft, rubric-scored
  +Source: /home/tk/voyager/EXTENSIBILITY_TAGS_THESIS.md
  +Rubric: /home/tk/communications/clear_communication_rubric.md
- +This document is the same content as EXTENSIBILITY_TAGS_THESIS.md,
  +revised against the seven clear-communication criteria. Each section
  +ends with a self-score and the criterion that drove the revision.
- +---
- +## What this document does (front-loaded conclusion)
- +This document argues for one change: split Voyager's protocol into a
  +fixed substrate and extensible conventions, using a reserved `v` tag
  +prefix as the carrier. After reading, you should be able to ship a new
  +vendor type without changing VOYAGER_PROTOCOL.md.
- +---
- +## 1. The thesis, plainly
- +The protocol guarantees event structure and forwarding integrity.
  +The protocol does not guarantee event semantics. New vendor kinds —
  +accommodation, tours, rentals, consulting, anything — are added by
  +publishing a new convention document, not by amending the protocol. The
  +mechanism is a single reserved tag prefix, `v`.
- +---
- +## 2. Two layers
- +### Substrate (fixed)
- +The protocol guarantees:
- +- events are signed and replaceable by `pubkey + d`
  +- relays forward unknown events (NIP-01)
  +- clients ignore unknown tags
- +### Conventions (extensible)
- +Each convention is a small document — like a Nostr NIP — that defines
  +one sub-namespace:
- +- `voyager.listing.v1` — physical goods
  +- `voyager.accommodation.v1` — lodging
  +- `voyager.tour.v1` — experiences
  +- `voyager.transport.v1` — rides, rentals
  +- `voyager.consulting.v1` — services
- +Adding a convention never touches the protocol. It never requires
  +coordinating with other client teams. Any relay, from any year,
  +forwards it.
- +---
- +## 3. Mechanism — the `v` tag
- +A vendor listing event:
- +```
  +kind: 30402
  +tags:
- ["d", "<uuid>"]
- ["title", "Fresh whole snapper"]
- ["price", "42000", "sats"]
- ["v", "voyager.listing.v1", "duration_minutes", "120"]
- ["v", "voyager.accommodation.v1", "check_in", "2026-12-01"]
- ["v", "voyager.accommodation.v1", "check_out", "2026-12-08"]
- ["v", "voyager.tour.v1", "group_size", "8"]
- ["v", "voyager.tour.v1", "meeting_point", "Negril Lighthouse"]
  +```
- +The required fields are `d`, `title`, `price`. Everything else rides
  +on `v` tags.
  ,

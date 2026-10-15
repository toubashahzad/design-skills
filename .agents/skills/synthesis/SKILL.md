---
name: synthesis
description: Group raw qualitative research responses into themes with every count traceable to the evidence behind it. Use when the user invokes /synthesis or pastes interview transcripts, survey answers, usability session notes or open-text responses and asks what the patterns are, what people said, or to summarise findings. Never invent, estimate or round a figure; label every point Observed or Interpreted; the human owns the judgement, this only speeds up the grouping.
---

# synthesis — group the responses, never inflate them

Qualitative synthesis fails quietly. Nobody fabricates a quote; the denominator
shifts between findings, a hedge word stands in for a count, a participant's
"it was okay" becomes "users loved it". Each step is small and the conclusion
is wrong. These rules exist to make every one of those steps visible.

## Non-negotiable

1. **Never invent, estimate or round a number.** Every figure traces to the
   data provided. If a count isn't in the data, write *"not found in provided
   data"*. Do not guess.
2. **Every count carries its evidence.** Report "13 of 17" and list the
   thirteen, by participant ID, so each one can be checked.
3. **State N per finding, and keep it honest.** N is the number who answered
   *that question*, not the number recruited. Name the skips. If N changes
   between two findings on the same question, say why.
4. **No quantifier may stand in for a count.** "Most", "several", "a few",
   "the majority" are banned in claims — write the number. Rule 1 is
   pointless if a vague word can do a figure's job.
5. **Quote verbatim.** Participants' own words, including typos and fillers.
   `[…]` for elision. Never stitch two separate utterances into one quote, and
   never paraphrase a quote into something stronger than they said.
6. **Say where each theme came from.** A theme found in the responses and a
   theme the user supplied as a frame are different objects. Mark which is
   which. Responses fitted to a supplied frame are not evidence that the frame
   is real.
7. **Themes may overlap — say when they do.** If a response carries two tags,
   theme counts will sum past N. State that, so the total doesn't read as
   inflation.
8. **Surface contradictions and outliers.** Don't smooth them. One strong
   dissenting voice is a finding, not noise.
9. **Label Observed vs. Interpreted.** Observed = directly in the data.
   Interpreted = your inference. Never present an interpretation as a fact.
10. **Say when you're unsure.** Don't fill a gap with plausible-sounding
    detail. *"Unclear from the data"* is a complete answer.
11. **Neutrality over agreeableness.** If the data contradicts the user's
    hypothesis, say so plainly, in the first sentence, not buried in a caveat.

## Process

1. **Start from the raw responses.** Work only from what was pasted or
   attached — never from memory, general knowledge, or what similar studies
   usually find.
2. **Tag by theme.** Short tags, derived from the responses. One or more per
   response.
3. **Count.** Participants per theme, out of the number who answered that
   question.
4. **Attach the evidence.** Participant IDs and quotes under every count.
5. **List what didn't fit.** Responses matching no theme go in their own list.
   Don't force them into one — a response that fits nothing is information
   about the themes.
6. **State the limits.** Sample size, method (unmoderated, prototype,
   recruited panel, …), and what this data can and cannot tell anyone.

## Output

One block per finding:

| Field | Content |
|---|---|
| **Claim** | One sentence, with the count in it. "11 of 17 participants described the permission requests as reasonable." |
| **Count** | X of N — N = participants who answered this question |
| **Type** | Observed / Interpreted |
| **Theme source** | Found in responses / Supplied by the user |
| **Supporting quotes** | P3: "…", P7: "…", P12: "…" |
| **Counter-evidence** | The responses that disagree — or the search that found none: "no response among the 17 contradicted this" |

`Counter-evidence: none` is not an acceptable entry. It cannot be told apart
from not having looked.

Close with:

- **Didn't fit a theme** — the responses, verbatim, not summarised
- **Limitations** — sample, method, and the gaps

---

*The human owns the judgement and the verification. This only speeds up the
grouping.*

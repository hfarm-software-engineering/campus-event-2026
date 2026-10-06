# Campus Event

Campus Event is a small JavaScript web application created as synthetic teaching
material. The product, project events, review conversations, incidents, and
contributor identities in this repository are fictional.

The repository is designed to make software-engineering decisions inspectable:
students can follow small changes in code, documentation, review, testing, and
maintenance without needing to learn a large framework first.

## This term's state

| | |
| --- | --- |
| Repository state | Start of term: the first working version of the app |
| Next update | After the 9 November class: the project's history up to the Week 7 review |

The repository grows during the course. After some classes, the next part of the
project's history is added to `main`. Each update is announced in class, and this
table changes with it.

## Home project: one real change

This is optional practice at home. It is not graded. It lets you try the course's
reasoning on real code, one small step at a time.

### The request

The Student Union sends the team this message:

> Students keep telling us they miss events they would have gone to. Can you add
> categories to the event list?

Two other people also have a view:

- **An event organiser:** "I already enter a title, a date and a capacity for
  every event. Please don't give me another field to fill in unless it really
  helps."
- **A first-year student:** "When I open the site I just want to see what's on
  soon. The list is in a random order."

A request for a feature is not yet a requirement. Your job is to find the need
behind it, decide on one small change, and make it well.

### Steps

Write your answers in [`HOMEWORK.md`](./HOMEWORK.md) in your fork. A few lines per
step is enough. Each step matches the class where you learn the skill, so do it
after that class.

| After class | Step |
| --- | --- |
| Now (Weeks 3–4) | **1. The need.** Who has the problem, and what is it? Which one question would you ask, and who could actually answer it? |
| Now (Week 4) | **2. The requirement.** Write one requirement and one acceptance criterion that someone else could check. |
| Week 6, 2 November | **3. Where it belongs.** Which route, view or file should change? What else could your change affect? |
| Week 7, 9 November | **4. The change.** Make it on your own branch, in small commits with clear messages. Review your own diff before you call it done. |
| Week 8, 16 November | **5. A bug log.** Pick one thing that went wrong while you worked. Write what you saw, what you guessed, what you checked, and what the cause was. |
| Week 9, 23 November | **6. One test.** Write one test for the risk you care about most, and say what it does not prove. |

Keep the change small. A good small change, well explained, is worth more than a
big feature you can't justify.

## Getting started

1. Fork this repository on GitHub, then clone your fork.
2. Create your own branch: `git switch -c my-work`.
3. Install and run the app (see below).

Your fork is public. Use made-up names, student IDs and emails when you try the
app.

When a new update lands, click **Sync fork** on your fork's GitHub page, then
bring it into your branch:

```sh
git switch main
git pull
git switch my-work
git merge main
```

If Git reports a conflict, that is real software engineering. Resolve it, and
note in `HOMEWORK.md` what clashed and how you decided.

## Run locally

Requires Node.js 24. The repository includes a `mise.toml` pin for `mise` users.

```sh
npm install
npm start
```

Then open <http://127.0.0.1:3000>. The app creates its database in `instance/` on
first run, with two sample events.

## Teaching-use notice

The Git author dates express a fictional project chronology. They are not a
claim that real work or institutional events occurred on those dates. Any
GitHub publication, issue, or pull-request timestamp records when this teaching
artefact was published, not when the fictional event occurred.

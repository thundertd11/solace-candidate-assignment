# Hello Code Reviewer!

## Introduction

Hi there! My name is Taylor Dennison, and I appreciate you for taking the time to review my code submission!

Full transparency, I have very little professional experience with the Next.js Framework outside of a time boxed spike to
research the difference between Next.js and Remix, and whether or not we would benefit from migrating to one of the two. I have
historically spent most of my career on the Vite client side (RIP CRA) of the house, and maybe some smaller Node.js RESTful API's.

I had an absolute blast with this code assessment, and it was a fantastic learning opportunity to take a deep dive into both Next
and Tailwind, which I have used for small prototypes or projects, but also never professionally. I have also never worked
with Drizzle before, but that was also enjoyable, and I love their documentation! Definitely a solid ORM.

## Key Objectives

Given the assignment, I wanted to focus on a few key objectives:

- Fixing bugs and optimizing the provided features
- Enhance the page and features to adhere to a fully responsive, mobile friendly design.
- Implement a basic pagination feature to handle a "large dataset" of Advocates.

## Main Changes

I will let the pull request speak for itself as far as changes go. I will leave comments throughout the pull request.

## What I would do with more time/communication

I think it's pretty apparent that I may have put in some more time than 2 hours, but I wanted to submit something that I was
proud of, and assure you that I did not spend more time than I wanted to! That being said, I think there are a couple things I
would improve with more time.

First being pagination. I went with the first recommendation Drizzle gave in their documentation, using a limit/offset approach,
but I definitely think a cursor based approach would be more advantageous, for many reason, but the main being I needed an
extra DB query to get a full count of records to avoid some pagination edge cases.

Second, I tried to emphasize certain Backend best practices, like sanitization, validation, and proper error/error response handling,
but they may not reflect current best practices or standards. The one endpoint does feel bloated, and could probably use some
love from a Separation of Concerns standpoint.

Third, I will be the first to say that my "design" skills are par at best, but given the time constraint, I went with some gut decisions.
I think the AdvocateCards could probably be spruced up, especially the specialty pills. I do have very strong attention to detail
skills and love collaborating closely with product and design teams to ensure consistency and best UX across all devices and platforms.

I also wish I would have had the opportunity to speak with an engineer closer to the stack(s) used by Solace to ensure that my
submission reflects some of the teams best practices/conventions and technologies. For example, some of the file structure/organization (obviously
with the exception of Next conventions) may not be the preferred way to organize the project. Maybe the team prefers types co-located
with features, or global types go here, etc. I obviously have opinions, but they are loosely held with respect to team preference.

Thanks again for the review, and I sincerely hope I have the opportunity to answer any other questions and discuss!

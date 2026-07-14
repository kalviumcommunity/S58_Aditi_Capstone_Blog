# Familiar

A Medium-style blogging platform where people can write, read, and respond to stories. Built with the MERN stack, with a focus on a clean editorial reading experience.

**Live:** [familiar-blog.vercel.app](https://familiar-blog.vercel.app)

---

## About

Familiar is a full-stack blogging app modeled on the reading and writing experience of Medium. Writers publish articles with a rich-text editor, readers follow authors and respond to stories, and everyone gets an editorial, distraction-free interface. It was built to be a complete, production-deployed application rather than a demo, covering authentication, email flows, a full engagement system, and a responsive front end.

## Features

**Writing and reading**

- Rich-text article editor (Quill) with title, description, and body
- Home feed with infinite scroll
- Full article pages with author byline, read-time estimate, and clean typography
- Edit and delete your own articles

**Engagement**

- Likes with optimistic UI updates
- Bookmarks and a dedicated Saved page
- Threaded comments with one level of replies
- Comment and reply deletion (by the comment author or the article owner)
- In-app notifications when someone likes, comments on, or replies to your work, with an unread badge that polls for updates

**Social**

- User profiles with avatar, bio, and follower/following/story counts
- Follow and unfollow other writers
- Editable profiles

**Accounts and auth**

- Email and password signup with hashed passwords (bcrypt)
- Google OAuth login (Passport)
- JWT-based sessions
- Email verification on signup, with login blocked until the address is confirmed

**Experience**

- Responsive layout across desktop and mobile
- Custom avatar system: colored circle with the user's initial, color derived from their name (no image uploads by design)

## Tech Stack

**Frontend**

- React with Vite
- React Router
- Plain CSS (no utility framework)
- Deployed on Vercel

**Backend**

- Node.js with Express
- MongoDB with Mongoose
- JWT and Passport (Google OAuth) for authentication
- Resend for transactional email (verification)
- Deployed on Render

## Design

Familiar uses an editorial visual language:

- **Accent color:** oxblood (`#5c1a2b`)
- **Display font:** Fraunces (serif)
- **UI font:** Inter
- **Avatars:** initial-based colored circles, hashed from the user's name

The aesthetic is intentionally minimal and text-forward, prioritizing readability over chrome.

## Architecture Notes

- **Passwords** are hashed with bcrypt (never stored or transmitted in plaintext).
- **Authentication** uses signed JWTs; the token carries only a user ID.
- **Notifications** are created server-side when an engagement action occurs, skip self-actions, and are fetched on a lightweight client poll so the unread badge stays current without a full page refresh.
- **Email verification** gates login: unverified accounts cannot sign in.

## Status

Familiar is live and actively maintained. It began as a coursework project and has since been extended well beyond its original scope into a fuller product, with notifications, refined responsive design, and ongoing improvements to the account and engagement systems.

## License

This project is available for viewing and reference. Please reach out before reusing substantial portions.

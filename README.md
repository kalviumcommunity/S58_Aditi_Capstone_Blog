<div align="center">

# Familiar

**A Medium-style blogging platform for writing, reading, and responding to stories.**

Built with the MERN stack and a focus on a clean, editorial reading experience.

[**View Live →**](https://familiar-blog.vercel.app)

<br />

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## ✦ About

Familiar is a full-stack blogging app modeled on the reading and writing experience of Medium. Writers publish articles with a rich-text editor, readers follow authors and respond to stories, and everyone gets an editorial, distraction-free interface. It was built to be a complete, production-deployed application rather than a demo, covering authentication, email flows, a full engagement system, and a responsive front end.

## ✦ Features

### Writing & Reading

- Rich-text article editor (Quill) with title, description, and body
- Home feed with infinite scroll
- Full article pages with author byline, read-time estimate, and clean typography
- Edit and delete your own articles

### Engagement

- Likes with optimistic UI updates
- Bookmarks and a dedicated Saved page
- Threaded comments with one level of replies
- Comment and reply deletion (by the comment author or the article owner)
- In-app notifications when someone likes, comments on, or replies to your work, with an unread badge that polls for updates

### Social

- User profiles with avatar, bio, and follower / following / story counts
- Follow and unfollow other writers
- Editable profiles

### Accounts & Auth

- Email and password signup with hashed passwords (bcrypt)
- Google OAuth login (Passport)
- JWT-based sessions
- Email verification on signup, with login blocked until the address is confirmed

### Experience

- Responsive layout across desktop and mobile
- Custom avatar system: colored circle with the user's initial, color derived from their name (no image uploads by design)

## ✦ Tech Stack

| Layer        | Technologies                         |
| ------------ | ------------------------------------ |
| **Frontend** | React, Vite, React Router, plain CSS |
| **Backend**  | Node.js, Express, Mongoose           |
| **Database** | MongoDB                              |
| **Auth**     | JWT, Passport (Google OAuth), bcrypt |
| **Email**    | Resend                               |
| **Hosting**  | Vercel (frontend), Render (backend)  |

## ✦ Design

Familiar uses an editorial visual language, intentionally minimal and text-forward.

| Token            | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| **Accent**       | Oxblood `#5c1a2b`                                          |
| **Display font** | Fraunces (serif)                                           |
| **UI font**      | Inter                                                      |
| **Avatars**      | Initial-based colored circles, hashed from the user's name |

## ✦ Architecture Notes

- **Passwords** are hashed with bcrypt, never stored or transmitted in plaintext.
- **Authentication** uses signed JWTs; the token carries only a user ID.
- **Notifications** are created server-side when an engagement action occurs, skip self-actions, and are fetched on a lightweight client poll so the unread badge stays current without a full page refresh.
- **Email verification** gates login: unverified accounts cannot sign in.

## ✦ Status

Familiar is live and actively maintained. It has grown well beyond its original scope into a fuller product, with notifications, refined responsive design, and ongoing improvements to the account and engagement systems.

---

<div align="center">
<sub>Built by Aditi · <a href="https://familiar-blog.vercel.app">familiar-blog.vercel.app</a></sub>
</div>

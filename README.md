# Cosmic Message App

[[View Live Demo](https://cosmic-message-app.vercel.app/)]

A message app that shows you how to add text and upload media to the Cosmic CMS using the Next.js, [Cosmic JavaScript SDK](https://www.npmjs.com/package/@cosmicjs/sdk), [File Upload Block](https://blocks.cosmicjs.com/blocks/file-upload), and React Server Actions.

## Features

- React Server Actions
- Server Actions (No exposed API keys)
- Tailwind CSS

## Getting Started

First, clone this repo.

```bash
git clone https://github.com/cosmicjs/cosmic-message-app
cd cosmic-message-app
```

Then install packages.

```bash
npm i
# or
yarn
# or
pnpm
# or
bun i
```

## Create Project in Cosmic

Log in to the [Cosmic dashboard](https://app.cosmicjs.com/) and create a new empty Project.
![Create Project](https://imgix.cosmicjs.com/43a54cf0-3333-11ef-a504-63e081e4680f-message-app-model-settings.png?w=2000&auto=forat,compression)

Create an Object type `Messages` (multiple) with slug `messages`:
![Create Object Type](https://imgix.cosmicjs.com/01289440-3333-11ef-a504-63e081e4680f-message-app-model.png?w=2000&auto=forat,compression)

Add the following Image and Markdown Metafields with keys `image` and `message`.
![Add completed Metafield](https://imgix.cosmicjs.com/01289440-3333-11ef-a504-63e081e4680f-message-app-model.png?w=2000&auto=forat,compression)

Then copy the `.env.copy` to a new `.env.local` file. And add your API keys found in the Cosmic dashboard at _Project / API keys_.

```
# .env.local
COSMIC_BUCKET_SLUG=your_bucket_slug
COSMIC_READ_KEY=your_bucket_read_key
COSMIC_WRITE_KEY=your_bucket_write_key
```

## Run the app

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see your message app. Add / delete your messages. See your messages in the Cosmic dashboard as well.

## Contributing

Contributions welcome!

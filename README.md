# Giang Wedding Card

React + Tailwind CSS version of the saved “Minimalism Đỏ Đô” wedding invitation.

## Run locally

This project uses Vite 8 and requires Node.js 22.12 or newer.

```bash
nvm use
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Update the invitation

Most content is centralized in [`src/data/wedding-data.js`](src/data/wedding-data.js):

- couple and family names
- ceremony and reception dates/times
- venue and dress-code colors
- gallery images
- schedule, sample wishes, gift accounts, and music

Replace image files in [`public/assets`](public/assets) while keeping the same filenames, or update the paths in `wedding-data.js`.

The page is split into focused components under [`src/components`](src/components). Complex interactions—gallery/lightbox, RSVP, guestbook, gift QR codes, and music—are isolated there.

## Data behavior

- RSVP and newly submitted guestbook messages are stored only in the visitor's browser (`localStorage`). Connect the submit handlers to an API if responses must be shared across devices.
- The venue map and background music use external URLs and need an internet connection.
- The saved source contains demo gift-account names and one guestbook message that do not match Hoàng Long/Bảo Ngọc. They are preserved in `wedding-data.js` for content fidelity and can be edited there.
- The original downloaded HTML and `_files` directory remain as migration references. The React app does not load their analytics, ad pixels, consent scripts, or production Next.js bundles.

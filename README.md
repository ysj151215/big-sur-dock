# Big Sur dock

Build a macOS Big Sur style dock with Next.js, react-use, Tailwind CSS and Framer Motion.

https://user-images.githubusercontent.com/13495916/204179498-d4b2b886-315f-4aab-b0d5-c1f805d253da.mp4

## Features

- Keyboard friendly.
- Accessibility friendly.

## Tech Stack

- [Next.js](https://nextjs.org/) - Framework.
- [react-use](https://github.com/streamich/react-use) - Hooks.
- [Tailwind CSS](https://tailwindcss.com/) - Styling.
- [Framer Motion](https://www.framer.com/motion/) - Animation.

## Run Locally

```bash
$ git clone https://github.com/ysj151215/big-sur-dock.git
$ cd big-sur-dock
$ pnpm install
$ pnpm dev
```

## Warning

The animation was broken since Framer Motion removed 'popmotion' from v7.6.18. So I temporarily lock the 'framer-motion''s version. And it's **NOT RECOMMENDED** to upgrade 'framer-motion' package before I fix it.

### Reference links

- [Changelog](https://github.com/framer/motion/blob/main/CHANGELOG.md#7618-2022-12-02).
- [Pull request](https://github.com/framer/motion/pull/1802).

## Acknowledgements

- Inspired by [Rauno Freiberg](https://twitter.com/raunofreiberg)'s website.
- Using [Austin Malerba](https://twitter.com/austin_malerba/status/1556678271374397440)'s codebase. [Core algorithm](https://twitter.com/austin_malerba/status/1556792067698970625).

## License

[MIT](https://choosealicense.com/licenses/mit/)

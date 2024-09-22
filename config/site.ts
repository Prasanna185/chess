export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Chess",
  description:
    "Chess is a two player strategy board game where the aim is to move different types of playing piece, each with a prescribed set of possible moves, around a chequered square board trying to capture the opponents 'king' piece.",
  navItems: [
    {
      label: "Dashboard",
      href: "/",
    },
  ],
};

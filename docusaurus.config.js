// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Hi, I am Yunguan.",
  tagline: "Let's keep learning and practicing ;)",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://mathpluscode.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "mathpluscode", // Usually your GitHub org/user name.
  projectName: "mathpluscode.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages", // The branch of your docs repo that you are publishing to GitHub pages
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Hi, I am Yunguan.",
        logo: {
          alt: "Logo",
          src: "img/logo.svg",
        },
        items: [],
        hideOnScroll: true,
      },
      footer: {
        style: "light",
        links: [
          {
            label: "ORCID",
            href: "https://orcid.org/0000-0002-1184-7421",
          },
          {
            label: "Google Scholar",
            href: "https://scholar.google.co.uk/citations?user=8X-IK9sAAAAJ&hl=en",
          },
          {
            label: "Semantic Scholar",
            href: "https://www.semanticscholar.org/author/Yunguan-Fu/51123416",
          },
          {
            label: "GitHub",
            href: "https://github.com/mathpluscode/",
          },
          {
            label: "X/Twitter",
            href: "https://twitter.com/mathpluscode",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/yunguanfu",
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

export default config;

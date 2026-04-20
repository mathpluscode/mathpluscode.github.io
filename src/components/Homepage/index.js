import Heading from "@theme/Heading";
import LaptopHelix from "./LaptopHelix";
import styles from "./styles.module.css";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yunguanfu",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/mathpluscode/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.83.58A12 12 0 0 0 12 .3" />
      </svg>
    ),
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.co.uk/citations?user=8X-IK9sAAAAJ&hl=en",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
    ),
  },
];

export default function Homepage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroArt}>
          <LaptopHelix />
        </div>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.name}>
            Yunguan Fu
          </Heading>
          <p className={styles.bio}>
            Member of Technical Staff at{" "}
            <a href="https://boltz.bio/" target="_blank" rel="noreferrer">
              Boltz
            </a>
            .
          </p>
          <p className={styles.bio}>
            Previously staff research engineer at{" "}
            <a href="https://www.instadeep.com" target="_blank" rel="noreferrer">
              InstaDeep
            </a>{" "}
            (acquired by{" "}
            <a href="https://www.biontech.com/" target="_blank" rel="noreferrer">
              BioNTech
            </a>
            ). Worked on protein design, including de novo nanoparticle designs (
            <a
              href="https://investors.biontech.de/system/files-encrypted/nasdaq_kms/assets/2025/10/01/10-29-46/AI%20Day%20-%202025.pdf"
              target="_blank"
              rel="noreferrer"
            >
              BioNTech AI Day 2025
            </a>
            ).
          </p>
          <p className={styles.bio}>
            PhD on machine learning for medical imaging at UCL, with recent work on a{" "}
            <a href="https://github.com/mathpluscode/CineMA" target="_blank" rel="noreferrer">
              foundation model for cine cardiac MR images
            </a>
            .
          </p>
          <p className={styles.bio}>
            On the side, developing agent skills (
            <a href="https://bib.tools/" target="_blank" rel="noreferrer">
              bib.tools
            </a>
            ) for LaTeX bibliography verification.
          </p>

          <nav className={styles.links} aria-label="Profiles">
            {links.map(({ label, href, icon }) => (
              <a key={href} className={styles.link} href={href} target="_blank" rel="noreferrer">
                <span className={styles.linkIcon}>{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}

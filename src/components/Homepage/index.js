import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import GridBlock from "./GridBlock.js";

const SectionList = [
  {
    title: "InstaDeep / BioNTech",
    background: "light",
    svg: "img/protein.svg",
    description: (
      <>
        I am a staff research engineer from BioAI department at{" "}
        <a href="https://www.instadeep.com" target="_blank">
          InstaDeep
        </a>{" "}
        (now part of BioNTech), currently managing multiple R&D teams for bioinformatics projects.
      </>
    ),
    gridblock: [
      {
        title: "",
        content: <span></span>,
      },
      {
        title: "",
        content: <span></span>,
      },
    ],
  },
  {
    title: "University College London",
    background: "light",
    svg: "img/mri.svg",
    description: (
      <>
        I am a PhD student and{" "}
        <a href="https://profiles.ucl.ac.uk/76116-yunguan-fu" target="_blank">
          honorary research assistant
        </a>{" "}
        from medical physics and biomedical engineering department at UCL, under the supervision of{" "}
        <a href="https://profiles.ucl.ac.uk/5178-yipeng-hu" target="_blank">
          Yipeng Hu
        </a>
        .
      </>
    ),
    gridblock: [
      {
        title: "",
        content: <span></span>,
      },
      {
        title: "",
        content: <span></span>,
      },
    ],
  },
];

function Section({ svg, title, background, description, gridblock }) {
  return (
    <div className={clsx(styles.section)}>
      <div className="card__header">
        <div className="avatar">
          <img className={styles.sectionSvg} src={svg} />
          <div>
            <div className={styles.tweet}>
              <Heading as="h1">{title}</Heading>
            </div>
            <div>
              <p>{description}</p>
              <GridBlock layout="twoColumn" contents={gridblock} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="homePage mainContainer">
      {SectionList.map((props, idx) => (
        <Section key={idx} {...props} />
      ))}
    </div>
  );
}

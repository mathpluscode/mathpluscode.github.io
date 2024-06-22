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
        title: "What's new?",
        content: (
          <span>
            <p>
              I was invited to give a flash talk at the{" "}
              <a href="https://sites.google.com/view/hinxton-immunogenomics-2024" target="_blank">
                Hinxton Immunogenomics Day
              </a>
              {' on "FrameDiPT: SE(3) Diffusion Model for Protein Structure Inpainting" ('}
              <a href="https://www.biorxiv.org/content/10.1101/2023.11.21.568057v2" target="_blank">
                paper
              </a>
              {", "}
              <a href="https://github.com/instadeepai/FrameDiPT" target="_blank">
                code
              </a>
              {")"}.
            </p>
          </span>
        ),
      },
      {
        title: "Hiring",
        content: (
          <span>
            <p>
              I am hiring{" "}
              <a href="https://www.instadeep.com/job-offer/989646ef-7450-465f-88bb-d41ac739f8ad/" target="_blank">
                senior research engineer
              </a>{" "}
              with bioinformatics background to design proteins through wetlab experiments 🧪.
            </p>
          </span>
        ),
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
        title: "What's new?",
        content: (
          <span>
            <p>
              I was invited to give a talk at the{" "}
              <a href="https://www.melba-journal.org/symposium.html" target="_blank">
                machine learning for biomedical imaging journal (MELBA) symposium
              </a>
              {' on "A Recycling Training Strategy for Medical Image Segmentation with Diffusion Denoising Models" ('}
              <a href="https://github.com/mathpluscode/ImgX-DiffSeg/blob/main/MELBA_Symposium_2024.pdf" target="_blank">
                slides
              </a>
              {", "}
              <a href="https://www.melba-journal.org/papers/2023:016.html" target="_blank">
                paper
              </a>
              {", "}
              <a href="https://github.com/mathpluscode/ImgX-DiffSeg" target="_blank">
                code
              </a>
              {")"}.
            </p>
          </span>
        ),
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

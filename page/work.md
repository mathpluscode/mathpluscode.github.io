---
layout: default
title: Work Experience / Publications
---

# Experience

## Researcher Engineer @ InstaDeep

> Full-time, Jan. 2021 - present.

- Working on a project linked to [DeepChain™](https://www.deepchain.bio/).

> Full-time, Sep. 2019 - Dec. 2020.

- Led the R&D of reinforcement learning solution and simulator for
  [DeepPCB™](https://deeppcb.ai/).

> Part-time, Oct. 2018 - Sep. 2019.

- Participated in the R&D of DeepPCB on mainstream RL algorithms comparison.
- Designed and implemented a novel model-free RL algorithm, which outperformed the plain
  Monte-Carlo tree search (MCTS).
- Extended the bin packing results to solve the
  [glass cutting optimization problem](http://www.roadef.org/challenge/2018/en/index.php)
  using RL and we ranked 16 out of 60 teams.
- Led the research and prototype development of NLP (question answering, text
  summarization).

> Internship, Feb. 2018 - Sep. 2018.

- Implemented RL algorithms to solve the bin packing problem.
- Developed ranked reward and outperformed the commercial solver (Gurobi), heuristic
  algorithms in both 2D and 3D bin packing problems.
- Studied deep RL in auto machine learning (neural network architecture search).
- Studied evolutionary algorithms in combinatorial optimization problems (TSP).
- Received the research internship award from École Polytechnique.

## Honorary Research Assistant @ Medical Physics & Biomedical Engineering, University College London

> Part-time, Nov. 2019 - present.

- Leading the R&D of DeepReg, an open-source project for image registration base on
  TensorFlow v2.
- Studied neural network calibration on COVID-19 X-Ray images.

## Operations Research Analyst @ SNCF Réseau

> Internship, Jun. 2017 - Sep. 2017.

- Modelled railway scheduling as a multi-objective optimization problem.
- Solved the scheduling problem with discrete programming (local search, tabu search,
  and simulated annealing).
- Outperformed human experts and approached the performance of LocalSolver.

# Publication

## Morphological Change Forecasting for Prostate Glands using Feature-based Registration and Kernel Density Extrapolation

> Qianye Yang, Tom Vercauteren, **Yunguan Fu**, Francesco Giganti, Nooshin Ghavami,
> Vasilis Stavrinides, Caroline Moore, Matt Clarkson, Dean Barratt, Yipeng Hu
>
> Accepted as a conference paper to ISBI 2021,
> [arXiv](https://arxiv.org/abs/2101.06425).

- Applied kernel density estimation to forecast morphological changes for prostate
  glands.

## DeepReg: a deep learning toolkit for medical image registration

> **Yunguan Fu**, Nina Montaña Brown, Shaheer U. Saeed, Adrià Casamitjana, Zachary M. C.
> Baum, Rémi Delaunay, Qianye Yang, Alexander Grimwood, Zhe Min, Stefano B. Blumberg,
> Juan Eugenio Iglesias, Dean C. Barratt, Ester Bonmati, Daniel C. Alexander, Matthew J
> Clarkson, Tom Vercauteren, and Yipeng Hu
>
> Accepted as a journal paper at the Journal of Open Source Software,
> [GitHub](https://github.com/DeepRegNet/DeepReg).

- Implemented major unsupervised and weakly-supervised registration algorithms in a
  unified framework using TensorFlow 2.
- Provided multiple demos using open-accessible data on real-world clinical
  applications.

## Longitudinal Image Registration with Temporal-Order and Subject-Specificity Discrimination

> Qianye Yang, **Yunguan Fu**, Francesco Giganti, Nooshin Ghavami, Qingchao Chen, J
> Alison Noble, Tom Vercauteren, Dean Barratt, and Yipeng Hu
>
> Accepted as a conference paper to MICCAI 2020,
> [arXiv](https://arxiv.org/abs/2008.13002).

- Applied deep registration for clinical longitudinal data using staged sampling.
- Demonstrated that an MMD loss to penalize the divergence of data representations from
  different sampling strategies can improve the registration performance.

## More unlabelled data or label more data? A study on semi-supervised laparoscopic image segmentation

> **Yunguan Fu**, Maria R. Robu, Bongjin Koo, Crispin Schneider, Stijn van Laarhoven,
> Danail Stoyanov, Brian Davidson, Matthew J. Clarkson, and Yipeng Hu
>
> Accepted to MICCAI 2019 Medical Image Learning with Less Labels and Imperfect Data
> Workshop (acceptance rate is 35%), [arXiv](https://arxiv.org/abs/1908.08035)

- Implemented image segmentation using U-Net and semi-supervised Mean Teacher model for
  laparoscopic images.
- Demonstrated that the specific training method of Mean Teacher is responsible for the
  performance improvement besides the additional unlabeled data.
- Demonstrated that adding more unlabeled data potentially could provide similar
  performance improvement compared to using more labeled data.

## Ranked Reward: Enabling Self-Play Reinforcement Learning for Combinatorial Optimization

> Alexandre Laterre, **Yunguan Fu**, Mohamed Khalil Jabri, Alain-Sam Cohen, David Kas,
> Karl Hajjar, Hui Chen, Torbjorn S. Dahl, Amine Kerkeni, and Karim Beguir.
>
> Accepted to NeurIPS 2018 Deep RL Workshop and AAAI 2019 RL in Games Workshop,
> [arXiv](https://arxiv.org/abs/1807.01672).

- Implemented AlphaZero, R2, and heuristic algorithm to solve bin packing problems.
- Designed neural network architectures to solve both 2D and 3D problems.
- Designed a supervised dataset to evaluate the neural network architectures.
- Designed and implemented linear programming models for bin packing problems using
  Gurobi solver.
- Conducted experiments to compare with MCTS, heuristic, supervised agent and Gurobi
  solver.

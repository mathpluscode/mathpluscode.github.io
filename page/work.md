---
layout: default
title: Work Experience / Publications
---

# Experience

## Researcher Engineear @ InstaDeep

> Full-time, Sep. 2019 - present.

I am working on the development of our reinforcement-learning-based decision-making product.

> Part-time, Oct. 2018 - Sep. 2019.

I participated in the development of our reinforcement-learning-based decision-making product. I worked on the neural network design and experimental comparisons with mainstream reinforcement learning algorithms (PPO, AlphaZero, etc.). Previously, I developed a novel model-free algorithm which outperformed plain Monte-Carlo tree search (MCTS).

During 2018, my principal project was to extend the research results of [Ranked Reward](https://arxiv.org/abs/1807.01672) to [glass cutting optimization problem](http://www.roadef.org/challenge/2018/en/index.php), an industrial combinatorial optimization problem. Among all participants, our solution was the only one which did not depend on traditional optimization techniques and we ranked 16 out of 60 teams.

> Internship, Feb. 2018 - Sep. 2018.

My main project was to use reinforcement learning to solve the bin packing problem, which is an NP-hard combinatorial problem. The objective of bin packing is to place boxes in containers efficiently, i.e. minimizing the waste of space, while respecting multiple physical constraints.

Based on AlphaZero, a reinforcement learning algorithm designed for two-player games, we proposed Ranked Reward to enable self-playing training in single-player games. Ranked Reward reshapes the rewards based on the agent's previous performances to create a relative metric. Without specific human knowledge, the proposed method achieves super-human performance and surpasses MCTS, supervised agent, heuristic algorithm, and commercial integer programming solver (Gurobi) on both 2D and 3D bin packing problems.

This work has been published ([arXiv](https://arxiv.org/abs/1807.01672)) as workshop paper in both [NeurIPS](https://sites.google.com/view/deep-rl-workshop-nips-2018/home) and [AAAI](http://aaai-rlg.mlanctot.info/papers/AAAI19-RLG-Paper13.pdf). I also received the research internship award from École Polytechnique, France.

Besides the bin packing project, I participated in some other research projects as well, including evolutionary algorithms and auto machine learning. Specially, we presented our latest results on neural network architecture search at [Deep Learning Indaba 2018](http://www.deeplearningindaba.com/2018.html).

## Operations Research Analyst @ SNCF Réseau

> Internship, Jun. 2017 - Sep. 2017.

- Modelled railway scheduling as a multi-objective optimization problem.
- Solved the scheduling problem with discrete programming (local search, tabu search, and simulated annealing).
- Outperformed human experts and approached the performance of LocalSolver.

# Publication

## More unlabelled data or label more data? A study on semi-supervised laparoscopic image segmentation

> **Yunguan Fu**, Maria R. Robu, Bongjin Koo, Crispin Schneider, Stijn van Laarhoven, Danail Stoyanov, Brian Davidson, Matthew J. Clarkson, Yipeng Hu
>
> Accepted to MICCAI 2019 Medical Image Learning with Less Labels and Imperfect Data Workshop, [arXiv](https://arxiv.org/abs/1908.08035)

- Implemented image segmentation using U-Net and semi-supervised Mean Teacher model for laparoscopic images.
- Demonstrated that the specific training method of Mean Teacher is responsible for the performance improvement besides the additional unlabeled data.
- Demonstrated that adding more unlabeled data potentially could provide similar performance improvement compared to using more labeled data.

## Ranked Reward: Enabling Self-Play Reinforcement Learning for Combinatorial Optimization

> Alexandre Laterre, **Yunguan Fu**, Mohamed Khalil Jabri, Alain-Sam Cohen, David Kas, Karl Hajjar, Hui Chen, Torbjorn S. Dahl, Amine Kerkeni, and Karim Beguir.
> 
> Accepted to NeurIPS 2018 Deep RL Workshop and AAAI 2019 RL in Games Workshop, [arXiv](https://arxiv.org/abs/1807.01672).


- Implemented AlphaZero, R2, and heuristic algorithm to solve bin packing problems.
- Designed neural network architectures to solve both 2D and 3D problems.
- Designed a supervised dataset to evaluate the neural network architectures.
- Designed and implemented linear programming models for bin packing problems using Gurobi solver.
- Conducted experiments to compare with MCTS, heuristic, supervised agent and Gurobi solver.
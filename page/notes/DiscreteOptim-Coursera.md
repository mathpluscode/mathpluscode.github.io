---
layout: default
math: true
title: Discrete Optimization
---

# Discrete Optimization

> [https://www.coursera.org/learn/discrete-optimization](https://www.coursera.org/learn/discrete-optimization)

<br>

---

## Knapsack

-   Relaxed problem
-   Branch and bound
-   Depth/Breast/Best First Search
-   Limited Discrepancy Search
    >   following the heuristic means branching left
    >
    >   explore the search space in increasing order of mistakes

-   Algorithm
    -   Discard items that don't fit
    -   Multiply each value by something so that values are small. Max scaled value = N = 100 * n (n is number of items)
        >   The value is at least 1-1/c OPT for N = c*n

    -   Round values down to integers (floor)
    -   Dynamic program for the scaled and rounded problem

<br>

---

## Constraint Programming

-   Global Constraint
    -   alldifferent(x1,...,xn)
    -   table constraint
        >   only several combination of values are admissibles

-   Break variable symmetries
    >   Impose an ordering on the variables

-   Redundant constraints
    >   Do not exclude any solution by reduce the search space and boost the propagation of other constraints

-   Other ideas
    -   Choose value then choose variable
    -   Domain splitting
    -   Randomization and restarts

<br>

---

## Local Search

Strategies
-   Minimize violations
    >   choose a decision variable that appear in the most violations and assign it to a value that minimizes its violations

- SWAP
    >   Instead of reassigning values, swap the values of variables
    >
    >   The traveling tournament problem (TTP) / Warehouse location / Car Sequencing

    The traveling tournament problem (TTP)
    - swap homes
    - swap rounds
    - swap teams
    - partial swap rounds
    - partial swap teams

-   K-OPT
    >   The traveling salesman problem (TSP)

-   Escape local minima
    -   Different start point
    -   Metropolis algorithm
        >   accept a move if it improves the objective value or, in case it does not, with some probability which depends on how “bad” the move is
        >
        >   exp(-delta/t) where t is the temperature

    -   Simulated Annealing
        >   Use Metropolis algorithm but adjust the temperature dynamically
        >   
        >   start with a high temperature and decrease the temperature progressively
        >
        >   t *= alpha

        - Generate initial solution
        - Initialize t
        - loop
            - Local Search
            - Update(Maybe reheat)

    -   Tabu
        >   maintain the sequence of nodes already visited
        >
        >   select the best configurations that is not tabu

        -   Short-term memory
            >   only keep a small suffix of visited nodes
            
            may increase or decrease the size of the list dynamically
            -   decrease when the selected node degrades the objective
            -   increase when the selected node improves the objective

        -   swap
            >   when tabu[i,j] > iteration, it's a tabu
            >
            >   when apply a move tabu[i,j] += L

            we can use (i, j, f1, f2) to denote that i and j have been swapped from an objective value f1 to f2
        -   if the solution is good enough, it's not a tabu
    -   Restart
    -   Reheat
    -   Others
        -   Intensification
            >   store high-quality solutions and return to them periodically

        -   Diversification
            >   when the search is not producing improvement, diversify the current state, e.g., randomly change the values of some variables

        -   Strategic oscillation
            >   change the percentage of time spent in the feasible and infeasible regions

        - Variable neighborhood search
        - Guided local search
        - Ant-colony optimization
        - Hybrid evolutionary algorithms
        - Scatter search
    
-   Select neighbor
    -   Select the first/best neighbor/improvement
    -   Select the first legal
    -   Multi-stage selection
        - select the variable with the most violations and select the value with the fewest violation
        - select the variable with some violations and select the value with the fewest violation

    -   Select at random

<br>

---

## Linear Programming

$$\begin{align*}
\min~c_1x_1+\cdots&+c_nx_n\\
a_{11}x_1+\cdots&+a_{1n}x_n= b_1\\
\cdots&\\
a_{m1}x_1+\cdots&+a_{mn}x_n= b_m\\
x_i\geq& 0
\end{align*}$$

where $b_m\geq 0$

The solution space is convex set and the optimal solution is at a vertex.

### Simplex Algorithm

1. A basic feasible solution (BFS) is like:

    $$\begin{align*}
    x_1 &= b_1 + \sum\limits_{i=m_1}^na_{1i}x_i\\
    &\cdots\\
    x_m &= b_m + \sum\limits_{i=m_1}^na_{mi}x_i
    \end{align*}$$

    If we take $x_i=0$ for $i=m+1,\cdots,n$, then $x_i=b_i$ for $i=1,\cdots,m$.

    Here $x_i$ for $i=1:m$ are **basic variables** and $x_i$ for $i=m+1:n$ are non basic variables.

1. To move from a BFS to a better one,

    - Select an entering variable $x_e$ at right-hand side with $c_e<0$
    - Select a leaving variable $x_l$ at left-hand side:

        $$l=\arg\min\limits_{i:a_{ie}<0}\frac{b_i}{-a_{ie}}$$
    - Perform Gaussian elimination to eliminate basic variables

    If $c_e<0$ and all $a_{ie}\geq 0$, then we can increase $x_e$ arbitrarily to decrease the objective arbitrarily.

    If $b_i=0$, make $x_i$ leave do not change the objective.

    To assure the termination, we can select always the first possible entering variable.

1. To detect whether a BFS is optimal

    If after having eliminated all the basic variables, the objective function is of the form

    $$c_0+c_1x_1+\cdots+c_nx_n$$

    with $\forall i, ~c_i\geq 0$

1. To find the first BFS, we can introduce artificial variables:

    $$\begin{align*}
    \min~c_1x_1+\cdots&+c_nx_n\\
    a_{11}x_1+\cdots&+a_{1n}x_n+y_1 b_1\\
    \cdots&\\
    a_{m1}x_1+\cdots&+a_{mn}x_n+y_m b_m\\
    x_i\geq& 0\\
    y_j\geq& 0\\
    \end{align*}$$

    It's a BFS with $y_j$ at left-hand side.

    In order to remove $y_j$, we consider the following problem

    $$\begin{align*}
    \min~y_1+\cdots&+y_m\\
    a_{11}x_1+\cdots&+a_{1n}x_n+y_1 b_1\\
    \cdots&\\
    a_{m1}x_1+\cdots&+a_{mn}x_n+y_m b_m\\
    x_i\geq& 0
    \end{align*}$$


#### Matrix Representation

| $c_1$ | ... | $c_n$ | $-z$ |
| $a_{11}$ | ... | $a_{1n}$ | $b_1$ |
| ... | ... | ... | ... |
| $a_{i1}$ | ... | $a_{in}$ | $b_i$ |
| ... | ... | ... | ... |
| $a_{m1}$ | ... | $a_{mn}$ | $b_m$ |

#### Duality

- Primal

    $$\begin{align*}
    \min~c^Tx\\
    Ax\geq b\\
    x\geq 0
    \end{align*}$$

- Dual

    $$\begin{align*}
    \max~y^Tb\\
    y^TA\geq c^T\\
    y\geq 0
    \end{align*}$$

For this problem, if the primal has an optimal solution, the dual has an optimal solution with the same cost.

##### Exemple

<img src="../../fig/Duality.png" alt="Duality" height="250">

It can be interpreted as:

The dual problem use the combination of constraints to find a lower bound of the primal problem.

Why we use the dual problem ?

If we have an optimal solution for the primal problem and we want to add a new constraint which makes the solution infeasible, but the dual is still feasible (we only need to add a dual varaible). Then we can solve the dual until the optimality and the solution becomes feasible for primal.

Moreover, the primal/dual problem use the same matrix table to solve the problem.

<br>

---

## Duality
> Boyd, Stephen, and Lieven Vandenberghe. Convex optimization. Cambridge university press, 2004.

### Primal problem

We consider the following **primal problem**:

$$\begin{align*}
\text{minimize}~f_0(x)\\
\text{s.t.}\quad f_i(x) &\leq 0,\quad i=1:m\\
h_i(x) &\leq 0,\quad i=1:p
\end{align*}$$

### Dual problem

We can rewrite the primal problem as an unconstrainted problem

$$\begin{align*}
\text{minimize}~f_0(x)+\sum\limits_{i=1}^mI_-(f_i(x))+\sum\limits_{i=1}^pI_0(h_i(x))
\end{align*}$$

where

$$
I_-(u)=\begin{cases}
0 & u\leq 0\\
\infty & u>0
\end{cases}
,\quad
I_0(u)=\begin{cases}
0 & u = 0\\
\infty & u\neq 0
\end{cases}
$$

These functions $I_-,I_0$ are used to express our displeasure associated with the constraint function value $f_i(x)$.

And we can replace $I_-(u)$ with $\lambda_i u$ where $\lambda_i\geq 0$ and $I_0(u)$ with $v_i u$ where $v_i\in\mathbb{R}$.

Since $\lambda_i u\leq I_-(u)$ and $v_i u \leq I_0(u)$, we have

$$\begin{align*}
L(x,\lambda,v) & :=
f_0(x)+\sum\limits_{i=1}^m\lambda_i f_i(x)+\sum\limits_{i=1}^p v_i h_i(x)\\
& \leq
f_0(x)+\sum\limits_{i=1}^mI_-(f_i(x))+\sum\limits_{i=1}^pI_0(h_i(x))\\
& \leq f_0(x)
\end{align*}$$

We define the **Lagrange dual function** $g(\lambda,v)$ as

$$g(\lambda,v)=\inf\limits_x L(x,\lambda,v)$$

and the **dual problem**:

$$\begin{align*}
\text{maximize}&\quad g(\lambda,v)\\
\text{s.t.}&\quad \lambda_i \geq 0,\quad i=1:m
\end{align*}$$

This dual problem is a convex optimization because the objectif is the pointwise infimum of a family of affine functions and so it's concave. This is the case whether or not the primal problem is convex.

### Weak/Strong duality

Moreover, we can note that

$$\begin{align*}
\sup\limits_{\lambda\geq 0,v}L(x,\lambda,v) 
&= \sup\limits_{\lambda\geq 0,v}(f_0(x)+\sum\limits_{i=1}^m\lambda_i f_i(x)+\sum\limits_{i=1}^p v_i h_i(x))\\
&=\begin{cases}
f_0(x) & f_i(x)\leq 0,~h_i(x)=0\\
\infty & \text{else}
\end{cases}
\end{align*}$$

So we can express the optimal value of the primal problem as

$$p^*=\inf\limits_x \sup\limits_{\lambda\geq 0,v} L(x,\lambda,v)$$

and by the definition of the dual problem, we can also express the optimal value of the dual problem as

$$d^*=\sup\limits_{\lambda\geq 0,v}\inf\limits_x L(x,\lambda,v)$$

So we have the **weak duality**:

$$d^*\leq p^*$$

because

$$
\forall \lambda\geq 0,v\quad \inf\limits_x L(x,\lambda,v) \leq L(x,\lambda,v)
$$

so

$$
d^*=\sup\limits_{\lambda\geq 0,v}\inf\limits_x L(x,\lambda,v) \leq \sup\limits_{\lambda\geq 0,v}L(x,\lambda,v) \leq \inf\limits_x\sup\limits_{\lambda\geq 0,v}L(x,\lambda,v)=p^*
$$

If

$$d^*=p^*$$

then we say that **strong duality** holds.

### Interpretation

Lagrange duality has an interesting economic interpretation.

Suppose the variable $x$ denotes how an enterprise operates and $f_0(x) $ denotes the cost. Each constraint $f_i(x)\leq 0$ represents a limit on resources (e.g., warehouse space, labor). The operating condition that minimizes cost while respecting the limits can be found by solving the problem:

$$\begin{align*}
\text{minimize}~f_0(x)\\
\text{s.t.}\quad f_i(x) &\leq 0,\quad i=1:m
\end{align*}$$

The resulting optimal cost is $p^*$.

If now the limits can be violated by paying an additional cost which is linear in the amount of violation: $\lambda_if_i$. The coeffcient $\lambda_i$ has the interpretation of the price for violating $f_i(x)\leq 0$. We assume $\lambda_i \geq 0$, i.e. the firm must pay for violations and it receives income if a constraint is not tight.

So the total cost to the firm, for operating condition $x$, and constraint prices $\lambda_i$, is:

$$L(x,\lambda)=f_0(x)+\sum\limits_{i=1}^m \lambda_if_i(x)$$

The firm will obviously operate so as to minimize its total cost $L(x,\lambda)$, which yields a cost $g(\lambda):=\inf\limits_x L(x,\lambda)$. The optimal dual value, $d^*=\sup\limits_{\lambda\geq 0}g(\lambda)$, is the optimal cost to the enterprise under the least favorable set of prices.

$d^\*\leq p^\*$ since in the second scenario some income can be derived from the constraints that are not tight. And if strong duality holds, the $\lambda^\*$ is a set of prices for which there is no advantage to the firm in being allowed to pay for constraint violations or receive payments for nontight constraints. $\lambda^\*$ is sometimes called a set of shadow prices for the primal problem.

### Slater's condition

For the following problem:

$$\begin{align*}
\text{minimize}~f_0(x)\\
\text{s.t.}\quad f_i(x) &\leq 0,\quad i=1:m\\
Ax&=b
\end{align*}$$

If there exists an $x\in\text{relint}D$ with

$$
\begin{align*}
f_i(x)\leq & 0,\quad i=1:k\\
f_i(x)< & 0,\quad i=k+1:m\\
Ax=&b
\end{align*}
$$

where $D=\bigcap\limits_{i=1}^m\text{dom}~f_i$ and $f_i(x),i=1:k$ are affine,

then the strong duality holds.

#### Notations

$$\text{relint}~C=\{x\in C| B(x,r) \cap \text{aff}~C\subset C~\text{for some}~r>0\}$$

$$\text{aff}~C=\{\theta_1x_1+\cdots+\theta_kx_k|x_1,\cdots,x_k\in C,\theta_1+\cdots+\theta_k=1\}$$

$$\text{aff}\{x\in\mathbb{R}^2|x_1^2+x_2^2=1\}=\mathbb{R}^2$$

<br>

---

## Mixed Integer Programming
> Some variables have to be integers

$$\begin{align*}
\min~c_1x_1+\cdots&+c_nx_n\\
a_{11}x_1+\cdots&+a_{1n}x_n= b_1\\
\cdots&\\
a_{m1}x_1+\cdots&+a_{mn}x_n= b_m\\
x_i\geq& 0\\
x_i\in& \mathbb{N}~(i\in I)
\end{align*}$$

Integer variables are typically 0/1 varaibles.

### Branch and bound

Solve the linear relaxation

- If the linear relaxation is worse than the best solution found so far

    Prune this node

- Else if the linear relaxation is integral

    We find a feasible solution and update the best feasible solution if appropriate

- Otherwise, the solution is infeasible

    - Find an integer variable $x$ that has a fractional value $f$
    
    - Crearte two subproblems $x\leq \lfloor f\rfloor$ and $x\geq \lceil f\rceil$

    - Repeat the algorithm on the subproblems

### Big M Transformation

A constraint that two integers $x,y$ are different is $x\neq y$ which is equivalent to

$$x\leq y-1 \text{or} x\geq y+1$$

Since the disjunction is not allowed in a MIP model, we can introduce a 0/1 variable $b$ and a large number $M$

$$
\begin{align*}
x\leq&~ y -1+bM\\
x\geq&~ y+1-(1-b)M
\end{align*}
$$

But the linear relaxation will choose $b=0.5$

### Gomory Cut

The idea is to add a linear constraint that:

- is valid: it doesn't remove any feasible solution
- helps: it cuts the optimal solution of the linear relaxation

For example, we have the following constraint and $b_1$ is fractional:

$$x_1+\sum\limits_{j=m+1}a_{1j}x_j=b_1$$

Since $\sum\limits_{j=m+1}\lfloor a_{1j}\rfloor x_j \leq \sum\limits_{j=m+1}a_{1j}x_j$

$$x_1+\sum\limits_{j=m+1}\lfloor a_{1j}\rfloor x_j\leq b_1$$

Since the left hand-side is an integer

$$x_1+\sum\limits_{j=m+1}\lfloor a_{1j}\rfloor x_j\leq \lfloor b_1 \rfloor$$

So

$$\sum\limits_{j=m+1}(a_{ij}-\lfloor a_{1j}\rfloor) x_j\geq b_1 - \lfloor b_1 \rfloor$$

The cut is actually to add a variable $s$ which should be positive

$$s=\sum\limits_{j=m+1}(a_{ij}-\lfloor a_{1j}\rfloor) x_j - (b_1 - \lfloor b_1 \rfloor)$$

#### Algorithm:

- Solve the linear relaxation
- Choose a row i whose constant is fractional and add the Gomory cut
- Apply the dual simplex to obtain feasibility
- Iterate until the solution is integral or there is no feasible solution

### Polyhedral Cuts
> Cuts that represent the facets of the convex hull of the integer solution
>
> If we have all the cuts, we could use linear programming to solve the problem.

<img src="../../fig/ConvexHull.png" alt="ConvexHull" height="250">

### Cover Cuts

Consider the following constraint:

$$\sum\limits_{j=1}^n a_jx_j\leq b$$

A set $C\subset\\{1:n\\}$ is a cover if

$$\sum\limits_{j\in C}a_j > b$$

and a cover is minimal if any subset is not a cover.

If $C$ is a cover, then the solution need to satisfie

$$\sum\limits_{j\in C}x_j \leq |C|-1$$

which is equivalent to

$$\sum\limits_{j\in C}(1-x_j) \geq 1$$

Given a solution, we would like to know whether there exists a cover cut that cut the solution. Which means is there a cover set $C$ that the solution violate the constraint:

$$\sum\limits_{j\in C}a_j > b,\quad\sum\limits_{j\in C}(1-x_j) < 1$$

To answer this question, we only need to solve the following problem:

$$
\begin{align*}
\min\quad &\sum\limits_{j\in\{1:n\}}(1-x_j^*)z_j\\
\text{s.t.}\quad & \sum\limits_{j\in\{1:n\}}a_jz_j > b\\
&z_j\in\{0,1\}
\end{align*}
$$

If the minimum value is lower than 1 then we have a cut, otherwise the cut doesn't exist.

By replacing $z_j$ by $1-y_j$, it's a Knapsack problem.

### Column Generation

[Column Generation for Cutting Stock](../../doc/DiscreteOptim-MIP-ColumnGeneration.pdf)
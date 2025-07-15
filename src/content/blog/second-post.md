---
title: Advanced Math with KaTeX
description: This post demonstrates more advanced mathematical notation using KaTeX
tags: math, katex, equations
date: 2023-08-20
---

# Advanced Mathematical Notation with KaTeX

This post demonstrates more complex mathematical notation using KaTeX in your Svelte blog.

## Matrix Equations

You can render beautiful matrices:

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

## Calculus Examples

Here's the definition of a derivative:

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

And a more complex integral:

$$
\int_0^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## Physics Equations

Maxwell's equations in differential form:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

## Inline Math

You can also use inline math like this: $E=mc^2$ or $F = G\frac{m_1 m_2}{r^2}$.

## Chemical Equations

Even chemical equations can be represented:

$$
\ce{CO2 + C -> 2 CO}
$$

This demonstrates how versatile KaTeX is for rendering mathematical and scientific notation in your blog! 
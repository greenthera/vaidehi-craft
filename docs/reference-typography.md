# Reference typography implementation

Compared the locally captured reference HTML/CSS for home, all four collections, the 85 original product pages, and the product quote form on 2026-11-03. No Chrome or browser testing was performed, as requested.

Shared Tailwind `type-*` utilities in `src/app/globals.css` replace the earlier approximate clamp limits. They preserve reference font families, weights, line heights and viewport-based sizes with tablet (1000px) and mobile (750px) overrides. Fonts are served locally from `public/fonts/`, including the catalog Century Gothic face and Madefor form faces.

Examples (desktop / mobile):

| Role | Font size |
| --- | --- |
| Home hero | 4.67142vw / 4.67142vw |
| Spaces heading | 4.21474vw / 6.31168vw |
| Collection heading | 38px / 6.26211vw |
| Regular card name | 1.48437vw / 3.33333vw |
| Featured card name | 1.71875vw / 4.35897vw |
| Regular card button | 0.78125vw / 2.5vw (tablet: 0.85938vw) |
| Featured card button | 1.09375vw / 3.04687vw |
| Product heading | 2.57812vw / 5.12821vw |
| Product details | 0.9375vw / 2.05128vw |
| Oldan details | 0.85938vw / 2.05128vw |
| Product quote button | 18px / 10px |
| Quote image caption | 1.95313vw / 8.97436vw |
| Form heading | 24px / 35px |
| Form labels / values | 14px / 16px |
| Footer labels | 1.17188vw / 2.05128vw |

Collection sections retain their distinct typefaces; the later sofa grid uses 1.40625vw names on desktop. The home story, store and cane statements retain their individual scales rather than sharing one generic paragraph size. Some reference mobile sizes are very small; this implementation follows those values for the requested fidelity.

The richer sidebar, larger social icon backgrounds, and new breadcrumb/variant/helper interfaces are intentional existing project customizations. Their controls retain readable UI typography. Newly added contact/general quote content uses the reference form type scale because there is no corresponding source text block.

Build/type checks confirm generation and local font paths. Visual equality, wrapping, and device rendering still need user review; they are not established by these checks.

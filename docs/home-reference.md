# Home-page source layout

Reference: https://www.vaidehicraft.com/

Grounding: public HTML, embedded responsive CSS, original icon markup, and downloaded reference image samples. No browser was opened. This is source inspection, not screenshot comparison.

## Correct visual order

The source DOM order differs from its CSS grid order. The first implementation followed the DOM and was incorrect.

| Source CSS row | Section | Source component |
| --- | --- | --- |
| 3 | Hero | `comp-m4p8db5x` |
| 4 | Warm spacer | `comp-m4nz656p` |
| 5 | Chair / sofa / swing gallery | `comp-m2prwceo` |
| 6 | Warm spacer | `comp-m4nz6ado` |
| 7 | Beyond Furniture | `comp-m4nszxm9` |
| 8 | Outlined Explore button | `comp-m2pw777s` |
| 9 | Store copy on left, video on right | `comp-m4ntmm79` |
| 11 | White spacer (desktop/tablet) | `comp-m4cen0lv` |
| 12 | Cane Is Not Bamboo | `comp-m2pw2ge7` |
| 13 | Founder biography and photo | `comp-m4fcizek` |
| 14 | Four-column collection footer | `comp-m4nsr8g9` |

On mobile the white spacer is hidden and the cane/founder row numbers shift. The visible content order is unchanged. `comp-m4pd1fuj` is a hidden empty section and does not need a visible replacement.

## Asset placement verified against source images

| Section | Source asset identifier | Supplied local image |
| --- | --- | --- |
| Hero (curtains / hanging chair) | `93a538_a880402e4b9046ada0287a2541831d35` | `vaidehicraft-5.avif` |
| Chair | `93a538_5ec595266cb34a73843bc5de00f5f322` | `vaidehicraft.avif` |
| Sofa | `93a538_53c7b3dd484a4d32badeb4ebc69bdcb0` | `vaidehicraft-2.avif` |
| Swing | `93a538_72de11d95bef449985f43c3707167a20` | `vaidehicraft-3.avif` |
| Beyond Furniture | `93a538_76537c61f07e48bb9c63b609e26b84e5` | `vaidehicraft-4.avif` |
| Cane statement (woven joinery) | `93a538_6faf2b9101d440908e2c6754c314eba9` | `vaidehicraft-1.avif` |
| Founder | `93a538_27514c67c642401d98765d7a3c5a9d49` | `author.avif` |

## Desktop layout values from CSS

Measurements are relative to viewport width unless stated otherwise. Retaining these values avoids the minimum font sizes and generic padding introduced by the first implementation.

| Element | Reference values |
| --- | --- |
| Header | Fixed, transparent, height `6.09863vw`; overlays hero |
| Logo | Left `7.66388%`, width `12.92421%` |
| Header actions | Right `11.1996vw`; search icon 26px; menu 96.2986 × 30.1087px |
| Menu | Right panel width `35.546875%`; white at 64% opacity; black backdrop at 26%; centered 16px links with 56px item height and 10px gaps |
| Hero | Minimum height `54.6868vw`; title top `46.6527vw`, width `79.06856%`, font `4.67142vw` |
| Gallery background | `#ede7df`; warm spacers `4.22414vw` and `5.09506vw` |
| Gallery | Source strip keeps image aspect ratios, 20px gaps, 16px corners; separate brown titles near top of images; Explore appears over images |
| Beyond Furniture | Height `45.52557vw`; heading left `11.25036vw`, top `29.12433vw`; narrow copy at top right |
| Store | Height `55.66723vw`, equal columns; white background; copy color `#b4581a` |
| Cane | Height `52.58654vw`; heading top `30.85504%`; copy width `15.1165%`, right `6.61458vw` |
| Founder | Minimum height `32.23787vw`, two columns; biography `#a64444`, font `0.66593vw`; photo width `52.88035%` of its column |
| Footer | Four equal columns, height `3.60413vw`, gray text and borders; no added footer navigation |

## Responsive behavior

Reference breakpoints are 750px and 1000px, not Tailwind's default `sm` breakpoint. The implementation uses those exact breakpoints for the header, menu, sections, typography, and column proportions.

Mobile keeps the store and founder sections in two columns. The collection images stack with their natural image ratios; the large gallery section and title offsets follow the source. Mobile hero height is `148.68641vw`, Beyond Furniture `147.60667vw`, store `119.03713vw`, cane `113.30796vw`, founder `89.00051vw`.

## Remaining verification limits

The dynamic gallery's final geometry, menu full-height behavior, source animation timing, video crop, and exact rendered wrapping require a visual comparison. Search currently covers collection navigation only. Collection/contact destinations remain on the live reference until those local pages are implemented. Do not describe this as a visually verified exact match.

## Subsequent user-requested adjustments

The user requested a smoother menu transition, stronger sidebar background, centered full-width hero title with bottom spacing, and collection Explore buttons below the image boxes. These explicit adjustments take precedence over the baseline source measurements above.

## Latest screenshot-guided override

The subsequent request moves collection buttons back inside the image boxes: visible by default and hidden on pointer hover. It also replaces the matching translucent sidebar with a richer dark green/brass sidebar and fixes the oversized header menu/title behavior visible in the supplied screenshots. Earlier requests for below-image buttons and a warm sidebar are superseded. Navigation now uses the independent route structure documented in `urls-and-migration.md`.

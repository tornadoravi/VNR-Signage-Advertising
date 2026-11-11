# VNR Signage & Advertising

A responsive, dependency-free business website built with HTML, CSS and JavaScript. All assets are served locally; there are no external fonts, trackers, network-submitted forms or third-party scripts.

## Design and interaction

The owner's reference, https://www.adinn.com/, informed the dark editorial opening, oversized sans/serif typography, full-screen navigation, visual category browsing, project presentation, prominent contact callout and FAQ accordions. The implementation, copy and VNR presentation are original; no Adinn source code, photographs, client logos, experience figures or unrelated service claims are included. VNR's original black/white/green identity is retained instead of importing Adinn's red branding.

The opening showcase is a three-concept carousel made with original CSS architectural illustrations and the unchanged supplied logo, not installation photography or a simulated video. Every slide identifies itself as a concept. It advances every six seconds only while in view, pauses on hover or when the page is hidden or covered by the navigation/photo dialog, and stops on keyboard focus or manual navigation until the visitor chooses Play. A visible Play/Pause control is provided. Automatic rotation is disabled for reduced-motion preferences.

The full-screen menu supports keyboard focus containment and Escape dismissal. Hero entrances, staggered scroll reveals, category filtering, FAQ answers and the photo dialog animate; desktop service cards respond to pointer position with a subtle tilt and highlight. A reading-progress line and contextual back-to-top control support long-page browsing. Reduced-motion mode disables these effects and immediately reveals any pending content. Without JavaScript, content, navigation, contact links and every client gallery remain available, with extra photographs in native expandable details.

OUR Solutions uses a spacious two-column catalogue (one column on smaller screens), with architectural mockups above separate white information panels. All eight mockups are original vector artwork, not photographs or completed-project claims: an illuminated storefront, a UV backlit restaurant panel, a corporate reception identity, a non-illuminated printed flex storefront, an embossed home name plaque, a dot-matrix LED display, a corporate launch arch at dusk, and a slim illuminated menu frame. Each card is explicitly labelled "ILLUSTRATIVE MOCKUP"; sample identities in the artwork are placeholders, not named VNR clients.

The shared, self-contained artwork lives in `assets/solutions/mockups.svg`. Eight SVG view fragments (`#led`, `#uv`, `#reception`, `#flex`, `#name`, `#display`, `#event`, `#frame`) provide separate scenes through ordinary accessible, lazy-loaded image elements. All gradients, patterns, geometry and light/shadow effects are local; there are no external artwork dependencies. Keep fragment IDs, card links and category filters in sync. Full-card links select the corresponding category in the real-work showcase; restrained pointer tilt and highlights respect reduced-motion preferences.

The eight architectural solution cards cover the original featured categories. The expanded project filters also cover ACP elevation/embedded signs, reflective signage and business/industrial wayfinding, supported by older owner updates. Separate capability accordions list further services from the expanded business description. This distinguishes listed offerings from photographed work.

OUR Clients uses the owner's concentric-circle reference approach: a white canvas, three delicate dashed rings, a central title and clean typographic client names, not invented or copied logos. All 32 verified business, brand and institution identities can be browsed with Previous/Next: twelve names per desktop page (eight on the last page), four on mobile. Paging fades respect reduced-motion preferences; no names rotate automatically. A native "Explore all 32 client names" disclosure also provides the full alphabetical directory. Every orbit/directory name opens its exact project gallery, even when a category filter has hidden that project card, and closing restores the triggering name's focus. Without JavaScript the orbit enhancement is hidden and the complete native directory links to stable project IDs. Residential work, unnamed factory work and general safety signage remain in the full showcase without invented company names.

## Local preview

From this directory, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. This is a local preview, not a public deployment.

## Business content

The original user-supplied logo is preserved in `assets/vnr-logo.png`.

Business name, phone, address and the featured signage categories were verified against the Google business knowledge panel on 11 November 2026:

- Shared listing: https://share.google/dO1WEL9Iu0l6j1cyI
- Direct search: https://www.google.com/search?kgmid=/g/11n83vhjbv&q=VNR+Signage+%26+Advertising
- Phone: +91 90805 07526
- Address: 48 A, N S, Subramania Konar Street, Jaihindpuram, Madurai, Tamil Nadu 625011.
- The expanded owner-written description lists shop name boards, LED sign/letter boards, ACP, acrylic letters, glow boards, 3D letters, SS letters, neon, flex and flex light boards, vinyl/UV printing, reception logos, indoor/outdoor branding, office/hospital/restaurant/school/college signage, commercial signage, digital LED displays, CNC/laser cutting, wall graphics and glass stickers. It also names custom design, manufacturing, installation and maintenance, serving Madurai, Theni, Dindigul, Sivagangai, Virudhunagar, Ramanathapuram and nearby districts.
- Three visible product listings are Acrylic LED Board, Home name board and Uv backlight layer glow sign board.
- The initial ten owner-update captions were expanded. A subsequent audit scrolled the Google Updates feed to its accessible end and retrieved 25 older updates, including all twelve projects in the owner's supplied screenshots. The resulting 35-update snapshot covers the newer work and older reception, storefront, healthcare, reflective, industrial, safety and kiosk projects. Some older captions retain Google's truncation; their specific project titles and original photographs, not generic hashtags or promotional service lists, establish classification.
- The reception/backdrop caption explicitly lists corporate reception logo boards, metallic 3D embossed signage and LED glow backdrop logos. Royal is the pictured interior wall logo; the page does not claim the photograph depicts a reception desk.

The design/manufacture/installation positioning comes from the supplied logo. Customer-facing highlights emphasise finding the right category, seeing real work, reading genuine feedback and contacting VNR directly. Service copy is descriptive, not a guarantee of specifications or outcomes. Hours are deliberately linked to the live listing rather than hard-coded. No experience figures or unsupported guarantees are included.

## Real project photographs

At the owner's explicit request, **real work photography appears only in OUR Projects and its gallery dialog**. Work is grouped by company or named location, not by individual photograph: **119 real photographs and owner-made photo montages across 35 project galleries**. The audit retrieved 123 still-image attachments from 35 accessible Google updates, including lazy-loaded images and older feed pages. Four standalone artwork files are not photographs and are excluded, along with videos and their posters. No screenshot crops were necessary. This is the accessible profile snapshot, not a promise that Google exposes every historical upload. The hero and all eight service cards remain original illustrations.

The original 31 photographs remain unchanged in their ten galleries: SM Bros / HP Petroleum, Rajambigai Chaats, Royal, Annet Fire Bee Tech / Phonic Elite, Tata / Sierra product launches, Sphruti Nivas, Thangaraj & Richard / Law Chambers, MK Clinic, Sri Jeyaprabha Jewellers and Anbu Clinic. Sri Jeyaprabha is separate from Royal. Both Tata update sets share a gallery without implying a single launch or a direct commission from the automotive manufacturer.

The expansion adds 25 galleries and 88 real-work images, including Right Events, Pro Express Logistics, Jazz Photography, Yaazhisai Elite Health Care & Acu Boutique, Rajambigai Sweets & Snacks, Apex Bridge, Maansa Hair & Makeup Studio, Chef Brothers, St. Antony's Hospital, Mugilan's Dental Clinic in Jaihindpuram, Praba Reddy's Beauty Academy and the Breathe New kiosk. It also includes the other older accessible work, not just the twelve screenshot references. Complete ordered gallery membership is recorded in `assets/projects/sources.json`.

Rajambigai Sweets & Snacks is separate from Rajambigai Chaats. The Jaihindpuram Mugilan's Dental and Avaniyapuram Mughilan's Dental updates have separate location-specific galleries; a shared legal entity is not assumed. Apex Bridge is the neutral display name because the caption says Finance while the sign says Capital Limited. Maansa and Atmen follow the owner-caption spellings, with photographed-lettering differences recorded in source notes. Breathe New is a pictured kiosk brand identity, not an asserted legal company name; its work is fabrication/delivery to Maharashtra, not an invented Madurai installation. AR Homeopathy Clinic, Subbiah Subramanian & Associates and Mona's Beauty & Bridal were identified by reading the original photographed signs.

Images were retrieved from the business's own Google updates at the owner's request and are stored locally in `assets/projects/`; the site does not hotlink Google-hosted photos or upload user assets anywhere. Original JPEG/PNG bytes and aspect ratios are preserved. `assets/projects/sources.json` records gallery IDs, originating updates, caption evidence, classifications, exclusions and download URLs. `assets/projects/owner-updates.json` preserves the 25 older source records, including original carousel order and any truncated captions. Google does not expose original owner-uploaded filenames. Local filenames were assigned for this website and must not be used as independent evidence of material or category.

The owner corrected the Phonic Elite / Annet Fire Bee Tech project on 11 November 2026: it is **printed flex signage**, not an ACP board or LED letter board. Its photo caption, filter, alt text and FAQ preserve that classification. The full Tata Sierra captions explicitly identify an LED corporate welcome arch. The full Law Chambers caption identifies both a UV backlit board and a 3D embossed LED glow logo, so that photo correctly appears in both UV and reception/logo filters. Do not infer ACP or a metal type from its appearance.

Rajambigai's UV board, menu frame and additional views share one company gallery, included in both UV and frame filters. The exterior photograph's material is unspecified and is not classified independently. The slim LED menu-frame caption explicitly identifies its pre-installation context. Tata workshop views, the Phonic Elite pre-fitting graphic and SM Bros fabrication/lighting views are also distinguished from installed photographs. Photographs retain their full original aspect ratio in the gallery and dialog rather than cropping away the work.

Project names were checked against the corresponding owner-update title and the visible signage. Category filters select matching project galleries, not individual photographs; counts report both galleries and their total photos. Projects may have multiple caption-supported categories: the ACP elevations with explicit LED letters appear in both filters, for example. Unspecified healthcare/elevation materials are not guessed to be UV. Reflective signs have their own filter. UV flex glow work is classified as both UV and flex, without changing Phonic Elite's non-LED classification.

Each project has one card, a stable ID and a "View project" link. Clicking the card or its corresponding client name opens an accessible native dialog containing the same photo set, with Previous/Next, thumbnail buttons, a live photo count, Left/Right arrow navigation, Escape dismissal and focus restoration. Single-photo galleries disable Previous/Next and hide thumbnails. The original-photo link follows the displayed image. Extra photos are ordinary HTML image links within native details, available without JavaScript; enhancement hides those details in favour of the dialog. Filters remain hidden without JavaScript.

The original Anbu Clinic download is a video thumbnail with a baked-in play symbol and is not displayed. The actual still image from that update was retrieved separately as `anbu-clinic-uv-backlit.jpg`; it shows the installed projecting clinic sign in daylight.

## Google reviews

The Google Maps profile confirmed **5.0 / 5 from 22 reviews** on **11 November 2026**. The website explicitly labels this as a manually checked snapshot, not an automatically refreshing feed. Review cards reproduce short, verbatim excerpts and the public reviewer names; highlighted phrases preserve the original wording. Each card links to its original Google review:

- Karthickganesh01, 5 stars: https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s103929829238947903632!2s0x3b00c5f9f03ee193:0xf29d26e29ac70c7d
- annet a, 5 stars: https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s102390778203476859913!2s0x3b00c5f9f03ee193:0xf29d26e29ac70c7d
- Abinesh 98, 5 stars: https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s117767902478900799426!2s0x3b00c5f9f03ee193:0xf29d26e29ac70c7d

All three full reviews and their five-star ratings were opened and verified in Google Maps. No customer portraits, review dates, or testimonial text are invented. The read/review actions link to the real Google Maps business profile; visible instructions tell customers to choose "Write a review" there. The site does not add self-serving review structured data. When refreshing the rating, update the rating card, accessible label, visible checked date and this documentation together.

Directions use the verified business name and full address; calling uses a standard `tel:` link. No unverified WhatsApp number or nonfunctional enquiry-submission form is included.

The optional project-brief form only formats the visitor's information into a text brief for copying. It explicitly states that nothing is sent to VNR. There is no backend, network submission, analytics, browser storage or automatic email/WhatsApp delivery. Clipboard denial produces a visible manual-copy instruction. The brief builder is hidden without JavaScript; contact and directions remain usable.

## Maintenance and hosting

Edit copy and business details in `index.html`, styling in `styles.css`, and navigation, carousel, filters, photo-dialog and brief-builder behavior in `script.js`. Keep category cards, navigation shortcuts, filters and brief choices in sync when offerings change. Keep contact links and structured data in sync when business details change. The copyright year updates automatically.

The directory can be hosted on any static website host. Before public launch, confirm the contact information and photograph permissions with the owner, refresh the review snapshot, and add the final absolute website/logo URLs to the structured data. No public deployment has been configured.

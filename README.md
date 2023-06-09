# Native Base

> NOTE: This whole repo is a work in progress, as and when I find the time.

How would I build a website if I could rely on 2023's web-native technology features?

Like this. Native Base is opinionated model of HTML, CSS, and Javascript patterns for the front-end of web projects if you care only about 2023's "evergreen" browsers. It is not "a design" or a "design system".

- No frameworks.
- No build tooling.
- Progressive Enhancement.

It's _example code_ with heavy comments. It's not strictly something you'd use to build a site - it's reference material.

It uses only core native technologies of the web, with no higher level abstractions. No React, no Sass, no Tailwind, no npm, no Vite, no build-steps. Feel free to add those if you find this base otherwise to your liking. This is more for myself than anything, but you're welcome to do whatever.

Where specific techniques are used, they are the ones that strike a balance _I prefer_ between certain pros and cons; or where I have placed a higher priority for one goal of good practice over another.

The aim is to provide a code reference showing how to create accessible, flexible, minimal, and efficient web pages; using HTML/CSS/JS features that are available in all the "evergreen" browsers as of 2023. With _my_ prefered approach and biases.

## What this project consists of

This project is just HTML, CSS, and the barest touch of plain Javascript. It uses some modern features recently established in those core technologies, such as;

- Modern CSS features, properties, and patterns - such as Cascade Layers, Nesting, Logical Properties, and more.
- Modern Javascript for experience enhancements.

Examples are shown of basic but robust markup patterns with a focus on semantics and accessibility. It contains scaffolding to assist in implementing designs, and has some basic minimally designed elements where appropriate. For example, forms have an established mark-up pattern and associated visual presentation of their elements and states which align with good design practice; but they are expected to be adjusted to suit, and this project has no actual design per-se.

## A note on the strategy used to implement design

Here there are minimal uses of "utility" classes to control design. It's my opinion that the vast majority of "design code" belongs in CSS files, and not as classes impersonating style-attributes (`colour1,font-large`), or class attributes stuffed with more hooks than a fishermans tackle box (`sm:weight-400 md:weight-300 lg:weight-100 promo promo__type1 promo__type1-alt`).

The more you are required to adjust HTML or add to classes in order to implement a design, the more of a pain-in-the-arse you are creating for your future self or anyone else that has to work on things that touch the HTML.

HTML is for annotating the content of a webpage to explicitly describe its structure and meaning. HTML is not intended to be used to embed style. Avoiding the close coupling of style with content is _precisely_ why CSS was created in the first place.

My ethos is that classes should be used meagerly, and in a manner to _label a design context_ which is then styled by matching CSS rules in a CSS file.

Roles for HTML:

- This is a heading
- This is a link
- This is a label for that field

Roles for classes:

- This is a featured item
- This is a banner
- This is a gallery of thumbnails

Some grudging accommodation is made for often-repeated styling that is reasonably atomic, in leu of any ability (yet) for CSS to re-use declarations via reference (i.e., a native form of basic SCSS mixin).

Regarding Tailwind...

> Tailwind and it's ilk are tools for large groups to wrangle large projects; but as a price they inflict their abstractions as markup litter, and create a requirement for build-tooling that has its own dependencies. This works against the grain of the core web technologies and introduces fragility. I would strongly urge you to avoid such tools until they are _needed to solve a real problem you have_.

I will be happy when Tailwind and React are once again no longer an assumed given when people talk about web projects. They are the last decade's "Macromedia Flash" and I await their demise with surety.

## A note about coding style

### Tabs vs Spaces

- Tabs for indentation
- Spaces for alignment

This is a hard rule, and not a "personal preference". Tabs should be used for indentation, because:

- Tab width is configurable by the person looking at the code. If they prefer a tab to be 2, or 4, or 8 spaces wide they can set that in their editor. Just as they can set line heights. So can you. Further, screen reader technology handles tabbed indentation better than spaces used for indentation.
- Using tabs is being respectful of other people. It does not stop your own editor from displaying exactly how you want it, and it allows others to have it how they want it.

Virtually any other coding style I'm flexible on.

### Comments

Code should be written to make sense when you read it. But even sensible code with well named parameters often isn't enough, because it does not give context. I believe in commenting code liberally, to describe the _why_ of it, even if the code describes the how of it on its own.

When a server sends HTML it should ideally be configured to minify and compress the mark-up, which removes HTML comments too. Because of that, including comments has no impact on the end product, and it will help others - and yourself - understand what you were thinking, referencing, and doing at the time.</p>

If you're working in a templating language, it may make sense to use the template languages comments rather than HTML's more verbose comment syntax.

### About those HTML elements...

Although I've included comments on what some of the "newer" HTML elements are used for, I'm not linking directly to reference material on each tag. If you want to learn more about what each tag or property was actually designed for and how it should be used, check out the [HTML Specifications](https://html.spec.whatwg.org/multipage/). For example - I may say something like:

```html
<article><!-- articles are discrete "islands" of content that make sense out of context. -->
```

But to check further, you should go read [The Specification for "Article"](https://html.spec.whatwg.org/multipage/sections.html#the-article-element), which can tell you much more:

> The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.

## The project components

All of them are annotated with comments internally, in an attempt to explain any uses, or point to references for further reading.

### index.html

A minimal example scaffolding of a "blank page". Features that are optional are marked as such with comments.

### kitchen-sink.html

Every bit of "core markup" I can think of all in one place. Headings, basic navigation, simlpe forms, etc.

### screen-core.css

CSS that is highly likely to be used on all URLs when loaded on a device with a screen. As such, this file is always requested for all URLs on devices that have a screen. It:

- Establishes a reset so all browsers treat all elements in the same manner, visually.
- Establishes how all design primitives should look by default. e.g., headings, paragraphs, links.

### print.css

Styling for print media

## Why?

So, this is a base starter and reference for myself. But why is it _this_?

I care a great deal about the end user. The end user might be someone like me, or nothing like me. They may be using a 27" high DPI display, or on a tiny phone with big visible pixels. Maybe they're using a game console and old TV, or maybe they're using a high-end VR headset. They might be on hard-wired gigabit networks, or on patchy mobile networks with intermittent connectivity. They may have 20:20 vision or be completely blind. Perhaps they are dyslexic, or incapable of fine motor movement. They may love animations, or they may become physically uncomfortable in reaction to motion. They may be a he, or a she, or a something else. They may be any combination of any of those, and an unknowable array more. Perhaps the site is being translated into another language I don't speak via a localised URL, and it flows right to left. Or top to bottom. The person consuming content may not be human at all - they may be a search engine or scraper service visiting the site.

The technologies of the web, by their careful design, enable a single web page to cater for _all of those end users_ at once. If you code your HTML and CSS properly. If you treat JavaScript as an enhancement, and not a core requirement. If you remember that the web starts as just text content and _everything you do to it after that_ can close a door for someone somewhere if you aren't thinking about it.

HTML is not merely wrapper code required to let you style things. CSS is not merely a language used to make that content pretty. They are technologies to describe content, enable its broad consumption and understanding, and _also_ to make it pretty.

Most of the web consists of static pages; text, some pictures, and maybe a video. Most of the web's content is not app-like, by which I mean something that requires real-time interaction and dynamically updating regions. Yet frameworks designed for the creation of app-like experiences are all too often used to instead output "apps" that are little more than a way to display regular static text and image content - but fashionably foregoing a full page refresh, or having some shiny spinny animations.

Understand that those frameworks are specialist tooling - effectively their own "custom browser engines" operating inside an _actual browser engine_ - and by necessity of that fact they are more narrowly considered and unavoidably less efficient. If you are using them only to deliver pages of text, some images, and a bit of video - it's extremely likely you have used the wrong tool. It will cut off or inconvenience some of the people that might otherwise have been able to consume that content.

I want to make it clear: the vast majority of the web's content is suitable and appropriate to be implemented using only the core technologies of the web. Technologies which are designed, built, tested, and iterated over _decades_ specifically for the task of handling text, pictures, and some multi-media - for all types of consumer and context - with all manner of considerations and accommodations already thought through, of which the casual developer may not be aware, and for which those fashionable frameworks may have no accommodations.

A "bog standard" HTML, CSS, and Javascript page - delivered over a bog-standard HTTP request - is provably robust and inarguably the fastest method for first-load content. These core technologies are also constantly in development, with the added goal of being permanently backward compatible.

Further, and fundamentally, every framework or build tool has to generate HTML and CSS as the things the browser consumes - the last step in the process. That HTML and CSS _should_ be well considered and implemented. If you understand HTML, CSS, and Javascript; you can properly assess the quality of that output from any framework, or build engine, or app-builder technology.

The best framework, or build technology, or mark-up pattern, or CSS technique you can choose to use is the one where you understand its choices and their trade-offs, and which does only what you and your audience need. If your tooling does anything more, those additional features are an inefficiency someone has to pay for somewhere. If you don't understand what your tooling is doing and why, then you don't know what impact the implementation of its choices forces on your users or peers.

Un-considered use of frameworks and build tooling is an irresponsible default choice. Know the basics before opting to use one. Don't assume because you know one that it's the best choice for all circumstances. Don't assume that the popular framework of the day is doing everything correctly or optimally with regard to its output. Don't assume you need even half of what the framework or build tool is built to offer. It's likely you won't use a large chunk of it.

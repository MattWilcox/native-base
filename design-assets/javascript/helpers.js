import FetchWrapper from './fetch-wrapper.js';
const thisWebsiteAPI = new FetchWrapper(`${window.location.protocol}//${window.location.host}`);

/**
 * Returns the type of interactions the device supports (click / mouseover)
 * @returns {string}
 */
export function interactionType() {
	let interactionType = 'mouseover';

	if( window.matchMedia('(hover: hover)') ) { // desktop
		interactionType = 'mouseover'; }
	if( window.matchMedia('(hover: none) and (pointer: coarse)') ) { // touchscreen
		interactionType = 'click'; }
	if( window.matchMedia('(hover: none) and (pointer: fine)') ) { // stylus
		interactionType = 'click'; }
	if( window.matchMedia('(hover: hover) and (pointer: coarse)') ) { // Wii/Kinect/etc
		interactionType = 'mouseover'; }
	if( window.matchMedia('(hover: hover) and (pointer: fine)') ) { // mouse
		interactionType = 'mouseover'; }

	return interactionType;
}

/**
 * Add and update a data attribute on the HTML element to indicate the state of the page's scroll
 */
function windowHasScrolled() {
	const html = document.querySelector('html');

	if (window.scrollY > 0) {
		html.dataset.pageHasScrolled = 'true';
	} else {
		html.dataset.pageHasScrolled = 'false';
	}
}

/**
 * Adds an event listener to the window which will indicate if the page has scrolled by updating `data-page-has-scrolled` to true or false.
 */
export function initWindowHasScrolled() {
	window.addEventListener('scroll', function() {
		windowHasScrolled();
	});
}

/**
 * Finds HTML elements with a `data-scroll-reveal` attribute, and uses an IntersectionObserver to add a `data-in-viewport` attribute to that element when it's scrolled inside the viewport.
 * @param rootMargin - defaults to `0 0 -20% 0`
 */
export function scrollAnimatedBlocks(rootMargin = "0 0 -20% 0") {
	if (!!window.IntersectionObserver) {
		document.querySelector('html').dataset.supportsIntersectionObserver = 'true';

		let observer = new IntersectionObserver((watchList, observer) => {
			watchList.forEach(watchedElement => {
				if (watchedElement.isIntersecting) {
					watchedElement.target.dataset.inViewport = 'true';
					observer.unobserve(watchedElement.target);
				}
			});
		}, {
			rootMargin: rootMargin
		});

		document.querySelectorAll('[data-scroll-reveal]').forEach(watchTarget => {
			observer.observe(watchTarget);
		});
	}
	else {
		console.log(`Browser doesn't support IntersectionObserver`)
	}
}

/**
 * For images on our website.
 * @param {Node} popupLink
 */
function handlePopupImageLink(popupLink) {
	popupLink.addEventListener('click', (e) => {
		e.preventDefault();
		let parser = new DOMParser();

		let clickedLink = e.currentTarget;
		clickedLink.dataset.fetchStatus = "loading";

		thisWebsiteAPI
			.getHtml(clickedLink.getAttribute('href'))
			.then(response => {
				let responseAsDom = parser.parseFromString(response, "text/html");
				let imageWeWant = responseAsDom.querySelector('#ajaxcontent').outerHTML;

				document.querySelector('body').insertAdjacentHTML('afterbegin', `
					<dialog id="lightbox">
						<div class="wrapper">
							<div class="content">
							${imageWeWant}
							</div>
							<form method="dialog">
								<button><img src="/dist/svg/x.svg" alt="Close"></button>
							</form>
						</div>
					</dialog>
				`);

				let lightbox = document.querySelector('#lightbox');
				lightbox.showModal();
				clickedLink.dataset.fetchStatus = 'loaded';

				// remove the entire thing from the DOM when closed, getting us back to where we were before clicked
				document.querySelector('#lightbox').addEventListener("close", e => {
					e.target.remove();
				});
			})
			.catch(error => {
				console.error(error);
			});
	})
}

/**
 * For links to youtube
 * @param {Node} popupLink
 */
function handlePopupYoutubeLink(popupLink) {
	popupLink.addEventListener('click', (e) => {
		e.preventDefault();
		let clickedLink = e.currentTarget;
		let clickedUrl  = new URL(clickedLink.href);
		let videoId     = clickedUrl.searchParams.get('v');
		let videoWeWant = `
			<iframe
				width="560" height="315"
				src="https://www.youtube-nocookie.com/embed/${videoId}"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		`;

		clickedLink.dataset.fetchStatus = "loading";

		document.querySelector('body').insertAdjacentHTML('afterbegin', `
			<dialog id="lightbox">
				<div class="wrapper">
					<div class="content">
						${videoWeWant}
					</div>
					<form method="dialog">
						<button><img src="/dist/svg/x.svg" alt="Close"></button>
					</form>
				</div>
			</dialog>
		`);

		let lightbox = document.querySelector('#lightbox') ?? null;
		let theVideo = document.querySelector('#lightbox iframe');

		lightbox.showModal();
		clickedLink.dataset.fetchStatus = "loaded";

		// remove the entire thing from the DOM when closed, to stop the video from continuing to play
		document.querySelector('#lightbox').addEventListener("close", e => {
			e.target.remove();
		});
	});
}

/**
 * Activate all anchor links that have a `data-popup="image"` attribute.
 */
export function initPopupImages() {
	document.querySelectorAll('a[data-popup="image"]').forEach( popupLink => {
		handlePopupImageLink( popupLink );
	});
}

/**
 * Activate all anchor links that have a `data-popup="youtube"` attribute.
 */
export function initPopupYoutube() {
	document.querySelectorAll('a[data-popup="youtube"]').forEach( popupLink => {
		handlePopupYoutubeLink( popupLink );
	});
}

/**
 * Adds a relative age in days to DOM elements that are annotated with some sort of date
 *
 * @param {string} targetElement - The selector of the element we're matching against
 * @param {string} outputTarget - The selector of the sub-element we append a relative time to
 *
 * @example data-date-posted="2023-06-23T09:43:58+01:00"
 */
export function relativeAges(targetElement, outputTarget) {
	const utcDate = new Date();
	const isoDate = utcDate.toISOString();
	const rtf1    = new Intl.RelativeTimeFormat(
		'en-GB',
		{ numeric: 'auto' }
	);

	document
		.querySelectorAll( targetElement )
		.forEach(item => {
			const prodDate  = new Date(item.dataset.dateCreated);
			const dateInUTC = new Date(isoDate);

			let differenceInDays = Math.abs(dateInUTC.getDate() - prodDate.getDate());
			let output           = rtf1.format(0 - differenceInDays, 'day')

			if (differenceInDays > 6) {
				item
					.querySelector(':scope ' + outputTarget)
					.insertAdjacentHTML(
						'beforeend',
						`<span class="uc_relativeTime">(${output})</span>`
					);
			}
		});
}

/* Fire functions on load */
initPopupImages();
initPopupYoutube();
initWindowHasScrolled();
scrollAnimatedBlocks();
relativeAges('[data-date-posted]','.meta');

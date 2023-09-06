import FetchWrapper from './fetch-wrapper.js';
const thisWebsiteAPI = new FetchWrapper(`${window.location.protocol}//${window.location.host}` );

/**
 * Returns the type of interactions the device supports (click / mouseover)
 * @returns {string}
 */
function interactionType() {
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
 * Enable animated "intro" on blocks that scroll into view
 */
function scrollAnimatedBlocks() {
	if (!!window.IntersectionObserver) {
		console.log('supportsIntersectionObserver');
		document.querySelector('html').dataset.supportsIntersectionObserver = 'true';

		let observer = new IntersectionObserver((watchList, observer) => {
			watchList.forEach(watchedElement => {
				if (watchedElement.isIntersecting) {
					// console.log(watchedElement);
					watchedElement.target.dataset.inViewport = 'true';
					observer.unobserve(watchedElement.target);
				}
			});
		}, {rootMargin: "0px 0px -20% 0px"});

		document.querySelectorAll('[data-scroll-reveal]').forEach(watchTarget => {
			observer.observe(watchTarget);
		});
	} else { console.log('Browser does not support IntersectionObserver') }
}

/**
 * Take a link with a class of `popup` and create a modal displaying higher resolution of the thumbnail image
 *
 * @param {Node} popupLink
 */
function handlePopupImageLink( popupLink ) {
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
			})
			.catch(error => {
				console.error(error);
			});

		// remove the entire thing from the DOM when closed, to stop any video from continuing to play
		document.querySelector('#lightbox').addEventListener("close", e => {
			e.target.remove();
		});
	})
}

/**
 * Activate all links that have a class `popup`
 */
function popupImages() {
	document.querySelectorAll('a[data-popup="image"]').forEach( popupLink => {
		handlePopupImageLink( popupLink );
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
function relativeAges(targetElement, outputTarget) {
	const utcDate = new Date();
	const isoDate = utcDate.toISOString();
	const rtf1 = new Intl.RelativeTimeFormat(
		'en-GB',
		{ numeric: 'auto' }
	);

	document
		.querySelectorAll( targetElement )
		.forEach(item => {
			const prodDate = new Date(item.dataset.dateCreated);
			const dateInUTC = new Date(isoDate);

			let differenceInDays = Math.abs(dateInUTC.getDate() - prodDate.getDate());
			let output = rtf1.format(0 - differenceInDays, 'day')

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
relativeAges('[data-date-posted]','.meta');
windowHasScrolled();
popupImages();
scrollAnimatedBlocks();

/* Hook functions up to event listeners, so they update things as needed later */
window.addEventListener('scroll', function() {
	windowHasScrolled();
});

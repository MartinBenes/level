/* All components saved in variables */

let acordeon: NodeListOf<Element> = document.querySelectorAll('acordeon');
let body: HTMLBodyElement = document.querySelector('body');
let head: HTMLHeadElement = document.querySelector('head');
let checkbox: NodeListOf<HTMLInputElement> = document.querySelectorAll('checkbox');
let dropdown: NodeListOf<Element> = document.querySelectorAll('dropdown');
let dropmenu: NodeListOf<Element> = document.querySelectorAll('dropmenu');
let radio: NodeListOf<Element> = document.querySelectorAll('radio');
let fab: NodeListOf<Element> = document.querySelectorAll('fab');
//let fabmenu: NodeListOf<Element> = document.querySelectorAll('fabmenu');
let navbar: NodeListOf<Element> = document.querySelectorAll('navbar');
let modal: NodeListOf<Element> = document.querySelectorAll('[modal]');
let range: NodeListOf<Element> = document.querySelectorAll('range');
// let slideshow: NodeListOf<Element> = document.querySelectorAll('slideshow');
let tabs: NodeListOf<Element> = document.querySelectorAll('tabs');
let tabsContent: NodeListOf<Element> = document.querySelectorAll('tabs-content');
let btn_ripple: NodeListOf<Element> = document.querySelectorAll('button, .button');
let burger: NodeListOf<Element> = document.querySelectorAll('burger');
let ellipsis: NodeListOf<Element> = document.querySelectorAll('ellipsis');

// initializes dynamic components
init('checkbox');
init('radio');
init('toggle');
init('process');
init('color');
init('logo');
init('range');

/* ================== Import system CSS ==================== */

let lvInclude: string = body.getAttribute('@include'); //get attribute @include
const PATH_URL: string = '//cdn.jsdelivr.net/npm/level-css-framework@0.5.5/css/'; // path CDN
let includeCSS: string[];
if (lvInclude) {
    includeCSS = (`base ${lvInclude}`).split(' ');
    let hasLevel: boolean = validateArray(includeCSS, 'level');
    let url_include: string;

    if (hasLevel) {
        url_include = `${PATH_URL}level.min.css`; // url to file base.min.css
        head.appendChild(createLink(url_include));
    } else {
        for (let i = 0; i < includeCSS.length; i++) {
            url_include = `${PATH_URL}${includeCSS[i]}.min.css`;
            head.appendChild(createLink(url_include));
        }
    }
    body.removeAttribute('@include');
}


/** add template in toggle icon burger and ellipsis */
if(burger) {
	for (let i = 0; i < burger.length; i++) {
		burger[i].innerHTML ='<span></span><span></span><span></span>';
		burger[i].addEventListener('click', function(){
			this.classList.toggle('is-active');
		},false);
	}
}

if (ellipsis) {
	for (let i = 0; i < ellipsis.length; i++) {
		ellipsis[i].innerHTML = '<span></span><span></span><span></span>';
		ellipsis[i].addEventListener('click', function () {
			this.classList.toggle('is-active');
		}, false);
	}
}

/** Add ripple effect for al buttons elements*/


if(btn_ripple) {
	for (let i = 0; i < btn_ripple.length; i++) {
		btn_ripple[i].innerHTML += `<div class="ripple-container"><span class="ripple-effect"></span></div>`;
		btn_ripple[i].addEventListener('click', function(e: any){
			e.stopPropagation();
			let ripple: HTMLElement = this.querySelector('.ripple-effect');
			let parent: HTMLElement = this.querySelector('.ripple-container');
			let offset: any = this.getBoundingClientRect();
			ripple.style.top = `${e.clientY - offset.top}px`;
			ripple.style.left = `${e.clientX - offset.left}px`;
			ripple.classList.add('ripple-active');

			setTimeout(()=>{
				ripple.classList.remove('ripple-active');
			}, 2000);

		},false);
	}
}

/* hides an element.
@param el: DOM element, classContain: class of the element */
function hideSelector(el: NodeListOf<Element>, classContain: string) {
    if (el.length > 0) {
        for (let i = 0; i < el.length; i++) {
            let element = el[i];
            if (element.classList.contains(classContain)) {
                element.classList.remove(classContain);
            }
        }
    }
}

body.onclick = function () {
    hideSelector(dropmenu, 'is-visible');
    hideSelector(fab, 'is-visible');
};

/* ================== FAB button event listener ===================== */

if (fab.length > 0) {
    for (let i = 0; i < fab.length; i++) {
        onEventListener(fab[i].querySelector('.is-toggle-fab'), 'click', showToggle);
    }
}

/* =============== Dropdown event listener ==================== */

if (dropdown.length > 0) {
    for (let i = 0; i < dropdown.length; i++) {
        onEventListener(dropdown[i].querySelector('.is-toggle-dropdown'), 'click', showToggle);
    }
}

/* ====================== Js modal with custom atribute ========================= */

if (modal.length > 0) {
	for (let i = 0; i < modal.length; i++) {
		onEventListener(modal[i], 'click', modalToggle);
	}
}
function modalToggle() {
		let modalId: string = this.getAttribute('modal');
		let el: Element= document.querySelector(modalId);
		let modalClass: Array<string> = ['is-zoom-in', 'is-slide-up', 'is-slide-down'];
		let modalClassSub: Array<string> = ['zoom-in', 'slide-up', 'slide-down'];

		for (let j = 0; j < modalClass.length; j++) {
				if (el.classList.contains(modalClass[j])) el.classList.toggle(modalClassSub[j]);
		}
		el.classList.toggle('is-visible');
}

/**
 * Add a listener toggle button in navbar and  controll the sticky navbar on scroll
*/

if (navbar.length > 0) {
	let el: NodeListOf<HTMLElement> = document.querySelectorAll('.is-toggle-navbar');
	for (let i = 0; i < el.length; i++) {
			onEventListener(el[i], 'click', navToggle);
	}
	for (let i = 0; i < navbar.length; i++) {
		if(navbar[i].hasAttribute('on-sticky')) {
			let data: Array<string> = navbar[i].getAttribute('on-sticky').split(': ');
			window.addEventListener('scroll', function () {
				if (window.scrollY > parseInt(data[1])) {
					if(data[0] == 'top') {
						navbar[i].classList.add('is-fixed-top');
					}else {
						navbar[i].classList.add('is-fixed-bottom');
					}
				} else {
					if(navbar[i].classList.contains('is-fixed-top')) {
						navbar[i].classList.remove('is-fixed-top');
					} else if(navbar[i].classList.contains('is-fixed-bottom')) {
						navbar[i].classList.remove('is-fixed-bottom');
					}
				}
			}, false);
		}
	}
}
function navToggle() {
		this.parentNode.parentElement.querySelector('navmenu').classList.toggle('is-visible');
}

/* =================== Js acordeon ===================== */

if (acordeon.length > 0) {
	let acordeonItem: NodeListOf<HTMLElement> = document.querySelectorAll('acordeon-item');
	for (let i = 0; i < acordeonItem.length; i++) {
			onEventListener(acordeonItem[i], 'click', acordeonToggle);
	}
}
/* shows, hides, and controls behavior module accordion */
function acordeonToggle() {
	let contentAcordeon: NodeListOf<HTMLElement> = this.parentNode.querySelectorAll('content');
		if (this.parentNode.hasAttribute('multiple')) {
				this.nextElementSibling.classList.toggle('is-visible');
		} else {
				for (let i = 0; i < contentAcordeon.length; i++) {
						contentAcordeon[i].classList.remove('is-visible');
				}
				this.nextElementSibling.classList.toggle('is-visible');
		}
}

/* ======================== range =========================== */

/*
role initializes a elment type renage
@param el: The parent element <range></range> selected
*/
function initRange(el: Element) {
    let input = el.querySelector('input'),
        label = el.querySelector('label'),
        position = parseInt(window.getComputedStyle(input, null).getPropertyValue('width')) / 100;

    label.style.left = `${((parseInt(input.value) * position) - 10)}px`;
    label.textContent = input.value;

    onEventListener(input, 'input mousedown', updateRange);

    /* update position the label floating, and the value of the element type range */
    function updateRange() {
        let position = parseInt(window.getComputedStyle(this, null).getPropertyValue('width')) / 100;
        this.nextElementSibling.style.left = ((this.value * position) - 10) + 'px';
        this.nextElementSibling.textContent = this.value;
    }
}

/* ====================== Tabs ========================== */

for (let i = 0; i < tabs.length; i++) {
    tabs[i].firstElementChild.classList.add("is-active");
}
for (let i = 0; i < tabsContent.length; i++) {
    tabsContent[i].firstElementChild.classList.add("is-active");
}

let tab = document.querySelectorAll('tab');
for (let i = 0; i < tab.length; i++) {
    onEventListener(tab[i], 'click', tabToggle);
}

function tabToggle() {
		removeClass(siblings(this), 'is-active');
		this.classList.add("is-active");
		showContentTab(this.getAttribute('data-id'));
}

/*
function that adds class is-visible to the container with id
@param id: the id container to show
*/
function showContentTab(id: string) {
    if (id !== null) {
        let siblingsId = siblings(document.querySelector(id));
        removeClass(siblingsId, 'is-active');
        document.querySelector(id).classList.add('is-active');
    }
}

/*
initialized function for dinamic components.
@params
Supported components {checkbox, radio, color, process, toggle, range, logo}
type: string
*/
function init(component: string) {
    let element: NodeListOf<Element> = document.querySelectorAll(component);

    for (let i = 0; i < element.length; i++) {
        let currentElement: Element = element[i];
        let id: string = currentElement.id;
        let text: string = currentElement.getAttribute('text');
        let check: string = currentElement.getAttribute('checked');
        let require: string = currentElement.getAttribute('required');
        let form: string = currentElement.getAttribute('form');
        let name: string = currentElement.getAttribute('name');
        let value: string = currentElement.getAttribute('value');

        switch (component) {
            case 'checkbox':
            case 'radio':
                currentElement.innerHTML =
                    `<input type="${component}"${id ? ` id="${id}"` : ''}${value ? ` value="${value}"` : ''}${form ? ` form="${form}"` : ''}${name ? ` name="${name}"` : ''}${check ? ' checked' : ''}${require ? ' required' : ''}/><label ${id ? ` for="${id}"` : ''}>${text ? text : ''}</label>`;
                break;
            case 'color':
				currentElement.innerHTML =
					`<input type="color" ${id ? ` id="${id}"` : ''}${value ? ` value="${value}"` : ''}/>`;
                break;
            case 'process':
                currentElement.innerHTML = `<complete${value ? ` value="${value}"` : ''}></complete>`;
                let querySelector: HTMLElement = currentElement.querySelector('complete');
                querySelector.style.width = currentElement.getAttribute('value');
                break;
            case 'toggle':
				currentElement.innerHTML =`<input type="checkbox" ${id ? ` id="${id}"` : ''}${form ? ` form="${form}"` : ''}${name ? ` name="${name}"` : ''}${check ? ' checked' : ''}${require ? ' required' : ''}/><label ${id ? ` for="${id}"` : ''} ></label>`;
                break;
            case 'logo':
                let value_src = currentElement.getAttribute('src');
                currentElement.innerHTML = `<img ${value_src ? ` src="${value_src}"` : ''}/>${text ? `<span>${text}</span>` : ''}`;
                break;
            case 'range':
                let min = currentElement.getAttribute('min');
                let max = currentElement.getAttribute('max');
              let step = currentElement.getAttribute('step');
                currentElement.innerHTML = `<input type="${component}" ${id ? ` id="${id}"` : ''}${min ? ` min="${min}"` : ''}${max ? ` max="${max}"` : ''}${step ? ` step="${step}"` : ''}/><label ${id ? ` for="${id}"` : ''}${value ? ` value="${value}"` : ''}></label>`;
                initRange(currentElement);
                break;
            default:
                break;
        }
        removeAttr(currentElement, 'id text form name value checked required src min max step');
    }
}

/*
create link element
@param
url: Dynamic URL for import system
type: string
*/
function createLink(url: string): HTMLLinkElement {
    let link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    // link.rel = 'stylesheet';
    // link.href = url;
    return link;
}

// multiple Add event listeners (element, events, function)
/*
@param
el: element ej. button, link, etc.
events: string events ej. ('click load keyup') or ('click')
function function(){...}
*/
function onEventListener(el: Element, eventsStr: string, func: EventListenerOrEventListenerObject) {
    let events: string[] = eventsStr.split(' ');
    if (events.length > 1) {
        for (let i = 0; i < events.length; i++) {
            el.addEventListener(events[i], func, false);
        }
    } else {
        el.addEventListener(events[0], func, false);
    }
}

/*
function that valid a value within an array, and return true
@params
array: collection of data to be scanned
value: value to look for in the array
*/

function validateArray(array: string[], value: string): boolean {
    return array.indexOf(value) !== -1;
}

// remove class for array
/*
@params
array: collection of data to travel
target: class to remove
*/

function removeClass(array: Element[], target: string) {
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            if (element.classList.contains(target)) {
                element.classList.remove(target);
            }
        }
    }
}

/*
Function tha removes multiple attributes to an element.
@params
element: the objet DOM selected;
Array: string - List of attributes separated by space ej. 'id class value required'
*/

function removeAttr(el: Element, attr: string) {
    let array = attr.split(' ');
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        if (el.hasAttribute(element)) {
            el.removeAttribute(element);
        }
    }
}

// select all previous elements siblings
/* @param element - type: DOM objet */

function prevSiblings(target: Element): Element[] {
    let siblings: Element[] = [];
    let n = target;
    if (n !== null && n !== undefined && n + '' !== '') {
        while (n = n.previousElementSibling) {
            siblings.push(n);
        }
        return siblings;
    } else {
        return siblings;
    }

}

// select all next elements siblings
/* @param element - type: DOM objet */
function nextSiblings(target: Element): Element[] {
    let siblings: Element[] = [];
    let n = target;
    if (n !== null && n !== undefined && n + '' !== '') {
        while (n = n.nextElementSibling) {
            siblings.push(n);
        }
        return siblings;
    } else {
        return siblings;
    }
}

// save all previous and next elements siblings in array objet
/* @param element - type: DOM objet */
function siblings(target: Element): Element[] {
    let previus = prevSiblings(target) || [],
        next = nextSiblings(target) || [];
    return previus.concat(next);
}

/**fab, dropdown event listener*/
function showToggle(e: Event): void {
    e.stopPropagation();
    this.nextElementSibling.classList.toggle('is-visible');
}

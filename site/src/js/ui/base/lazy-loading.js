import LazyLoad from 'vanilla-lazyload'
new LazyLoad({
   elements_selector: '[data-src],[data-srcset]',
   class_loaded: '_lazy-loaded',
})

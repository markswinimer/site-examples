/***** Announcement Bar *****/
$(window).bind("load resize", function () {
    if ($("body").hasClass("announcement--bar--active")) {
        let announcementHeight = $(".announcement--bar").outerHeight();

        // Adjust position of mobile hamburger menu
        $(".mobile-toggle").css({ 'top': announcementHeight + 25, 'opacity': 1 });

        // Adjust position of main container
        $(".site-main").css("top", announcementHeight);

        // Adjust position of subpage hero background wave
        if (!$("body").hasClass("home")) {
            // $(".home--hero").css('top', announcementHeight);
            $(".subpage--hero__background").css('top', announcementHeight);
        }
    }
});
$(window).on('load', function () {
    // Removed by Richard 10/12/24 - not sure why this was required as it removes paragraphs (formatting) that are required.
    //$(".col-12.accordion--item p").contents().unwrap();
    $('.catalog-template-dual-catalog .additional-content > p > script').unwrap();
});

$(document).ready(function () {
    /***** Fixed Header *****/

    $(window).bind("load resize scroll", function () {
        let height = $(window).scrollTop();
        let windowWidth = $(window).width();

        if (height > 1) {
            $(".header").addClass("fixed");
            if (windowWidth > 1085) {
                $(".subpage--hero__background-desktop").hide();
            } else {
                $(".subpage--hero__background-mobile").hide();
            }
        } else {
            $(".header").removeClass('fixed');
            if (windowWidth > 1085) {
                $(".subpage--hero__background-desktop").show();
                $(".subpage--hero__background-mobile").hide();
            } else {
                $(".subpage--hero__background-desktop").hide();
                $(".subpage--hero__background-mobile").show();
            }
        }

        $.fn.isInViewport = function () {
            let elementTop = $(this).offset().top;
            let elementBottom = elementTop + $(this).outerHeight();
            let viewportTop = $(window).scrollTop();
            let viewportBottom = viewportTop + $(window).height();
            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        let stickyTabButton = $(".sticky-tab");
        let stickTabTarget = $(".sticky-tab-target")

        if (stickTabTarget.length > 0) {
            if (stickTabTarget.isInViewport()) {
                stickyTabButton.hide();
            } else {
                stickyTabButton.show();
            }
        }
    });

    productCatMobileToggle = () => {
        $(".product--category--filters__filters-ins").slideToggle();
    }

    // Header Search Toggle
    $(".top--bar--search__icon").click(function () {
        $(".top--bar--search--form").toggleClass("is--active");
    });

    // Core Products (with submenu) template - auto go to anchor (open the section and go to anchor)
    if ($("body").hasClass("page-template-page-core-products-with-submenu")) {
        let hash = window.location.hash;
        if (hash) {
            setTimeout(function () {
                $("nav.core--submenu").children("a[href='" + hash + "']").trigger('click');
            }, 200);
        }
    }

    // Core Products (with submenu) template submenu
    $("nav.core--submenu > a").on("click", function (e) {
        e.preventDefault();
        let $btn = $(this);
        let num = $btn.index() + 1;
        $btn.addClass("active");
        $btn.siblings().removeClass("active");
        $("section.core--section").removeClass("active");
        $("section.core--section" + num).addClass("active");
    });

    // Subscribe to blog buttons
    $('#blog-listing-subscribe-btn, #single-featured-subscribe-btn').on('click', function (e) {
        /* $.fancybox([
          {
          href: 'https://share.hsforms.com/17ZS5MMsFQbGvL0yTXpdmHQcgttn',
          //href : 'wp-content/themes/origo/iframe.php?src=https://share.hsforms.com/17ZS5MMsFQbGvL0yTXpdmHQcgttn',
          //href : 'wp-content/themes/origo/iframe.php',
          width: 800,
          height: 600,
          }
        ]); */
        window.open('https://share.hsforms.com/17ZS5MMsFQbGvL0yTXpdmHQcgttn');
    });

    /* Mobile Navigation
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    // When mobile burger button is clicked, open the mobile nav and close submenus if open
    $("#mobileToggle").click(function () {
        $(this).toggleClass("is--active");
        $(".menu-overlay").toggleClass("is--active");
        $("body").toggleClass("mobile-menu-active");
        $(".sub-menu--open").removeClass("sub-menu--open");
        $(".logo--nav__mobile--navigation").toggleClass("is--active");
    });

    // close modal menu via overlay click
    $(".menu-overlay").click(function () {
        $("#mobileToggle").click();
    });

    $(".mobile--navigation--country__link").click(function () {
        $(".mobile--navigation--country__sub-menu").toggleClass("is-open");
    });

    var loadedMobileToggle = false;
    var loadedFooterToggle = false;

    $(window).bind("load resize", function () {
        let windowWidth = $(window).width();

        // If screen size is < 1085, add on click to the submenu items in the mobile nav
        if (windowWidth < 1085 && loadedMobileToggle === false) {
            loadedMobileToggle = true;
            $(".menu-item.menu-item-has-children").click(({ currentTarget }) => {
                $(".sub-menu--open").not(currentTarget).removeClass("sub-menu--open");
                $(currentTarget).toggleClass("sub-menu--open");
            })
            // If screen size goes > 1085, unload the on click
        } else if (windowWidth > 1085 && loadedMobileToggle === true) {
            loadedMobileToggle = false;
            $(".menu-item.menu-item-has-children").off('click');
        }

        // If screen size is < 768, add on click to footer header items which show/hide the newly hidden fields
        if (windowWidth < 768 && loadedFooterToggle === false) {
            loadedFooterToggle = true;
            $(".footer__toggle").click(function () {
                $(this).toggleClass("is-open");
                $(".is-open").not($(this)).removeClass("is-open").siblings(".footer__menu").slideToggle("footer-open");
                $(this).siblings(".footer__menu").slideToggle("footer-open");
            })
            // If screen size goes > 768, unload the on click
        } else if (windowWidth > 768 && loadedFooterToggle === true) {
            loadedFooterToggle = false;
            $(".footer__toggle").off('click');
        }
    });

    /***** Custom Select Dropdowns *****/
    $('.custom--select').each(function () {

        // Cache the number of options
        numberOfOptions = $(this).children('option').length;

        // Hides the select element
        $(this).addClass('s-hidden');

        // Wrap the select element in a div
        $(this).wrap('<div class="custom--select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $(this).after('<div class="styledSelect"></div>');

        // Cache the styled div
        let $styledSelect = $(this).next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($(this).children('option').eq(0).text());

        // Insert an unordered list after the styled div and also cache the list
        let $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (let i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $(this).children('option').eq(i).text(),
                rel: $(this).children('option').eq(i).val(),
            }).appendTo($list);
        }

        // Cache the list items
        let $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.styledSelect.active').each(function () {
                $(this).removeClass('active').next('ul.options').hide();
            });
            $(this).toggleClass('active').next('ul.options').toggle();
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active').attr('rel', $(this).attr('rel'));
            $(this).val($(this).attr('rel'));
            $listItems.removeClass('selected');
            $(this).addClass('selected');
            $list.hide();
            $(this).scrollTop(0);
            /* alert($(this).val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
            $list.scrollTop(0);
        });

    });

    /***** Modal *****/
    $(".modal--trigger").click(({ currentTarget }) => {
        let modalID = $(currentTarget).attr('id');
        $("html, body").addClass('prevent--scroll');
        $('.modal[data-name="' + modalID + '"').addClass('modal--open');
    });
    $(".modal__close").click(() => {
        $('.modal').removeClass('modal--open');
        $("html, body").removeClass('prevent--scroll');
    });

    /***** Testimonials Slider *****/
    let swiper = new Swiper(".testimonial-slider", {
        slidesPerView: 1,
        autoHeight: true,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                autoHeight: true,
            }
        },
    });

    /***** Testimonials Slider *****/
    let blurbSlider = new Swiper(".blurb-slider", {
        slidesPerView: 1,
        autoHeight: true,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: {
                autoHeight: true,
            }
        },
    });

    /***** Product Category Filters *****/
    $(".product--cat--filters__checkbox").click(() => {
        // Define constants for length of checked checkboxes array
        const selectedCategoryLength = $('.product--cat--filters__checkbox').filter(':checked').length;
        // Update mobile toggle button text based on selectedCategoryLength
        if (selectedCategoryLength > 0) {
            $(".product--category--filters__mobile-toggle").html('Filters (' + selectedCategoryLength + ')');
            $(".product--category--filters__clear-all").addClass('show');
        } else {
            $(".product--category--filters__mobile-toggle").html('Filter');
            $(".product--category--filters__clear-all").removeClass('show');
        }
        // Hide all items in the list
        $(".product--catalog--cards__card").hide();
        // If NO checkboxes are selected show all
        if (selectedCategoryLength < 1) {
            $(".product--catalog--cards__card").show();
        } else if (selectedCategoryLength >= 1) {
            // For each of the checked checkboxes in the color-filter
            $(".product--cat--filters__checkbox:checked").each((index, element) => {
                // Show items with a data attribue that includes the value of the checkbox
                $(".product--catalog--cards__card[data-category*=" + $(element).val() + "]").show();
            });
        } else { }
    });

    // Product Category Filters Mobile
    productCatMobileToggle = () => {
        $(".product--category--filters__filters-ins").slideToggle();
    }

    $(window).bind("load resize", function () {
        let width = $(window).width();
        if (width <= 767) {
            $('.product--category--filters__mobile-toggle').unbind('click', productCatMobileToggle);
            $('.product--category--filters__mobile-toggle').on('click', productCatMobileToggle);
        }
        else {
            $(".product--category--filters__filters-ins").removeAttr("style");
        }
    });

    // Clear all product category filters
    $(".product--category--filters__clear-all").click(() => {
        $(".product--cat--filters__checkbox").prop("checked", false);
        $(".product--category--filters__mobile-toggle").html('Filter');
        $(".product--category--filters__clear-all").hide();
        $(".product--catalog--cards__card").show();
    });

    /***** Contact Page - Resource Advisor Filter *****/
    $('.resource--advisors .custom--select .styledSelect').on('DOMSubtreeModified', function (e) {
        let valueSelected = $(this).text();

        if (valueSelected != "All") {
            $(".resource--advisor").hide();
            $(".resource--advisor").each((index, element) => {
                // Show items with a data attribue that includes the value of the checkbox
                $(".resource--advisor[data-filter*='" + valueSelected + "']").show();
            });
            // Check if there are no reps being shown after filter
            if ($('.resource--advisor:visible').length == 0) {
                $(".resource--advisors--listing__no--advisor--msg").show();
            } else {
                $(".resource--advisors--listing__no--advisor--msg").hide();
            }
        } else {
            $(".resource--advisors--listing__no--advisor--msg").hide();
            $(".resource--advisor").show();
        }
    });

    /***** Accordion *****/
    $(document).on("click", ".accordion--item__header", function () {
        let $this = $(this);
        //let accordionID = $this.attr('id');

        $this.toggleClass("accordion--item__header--active").nextAll(".accordion--item__body").slideToggle("slow");

        if (!$("#toggleAllTop, #toggleAllBottom").hasClass("all-open")) {
            $this.parent().siblings().children().removeClass("accordion--item__header--active").next().slideUp(); // Close open item
        }

        setTimeout(function () {
            // Fixed by Richard (03/12/24).
            $("html, body").animate({ scrollTop: $this.offset().top - 150 }, "slow");
            //$("html, body").animate({scrollTop:$("#"+accordionID).offset().top - 150}, "slow");
        }, 500);

        return false;
    });

    // Open/Close All Accordions
    $(document).on("click", ".accordion--toggle--all__btn", function () {
        // Open All Accordions
        if (!$(this).hasClass("all-open")) {
            $(".accordion--toggle--all__btn").addClass("all-open").html("Close All");
            $(".accordion--item__header").each((index, accordion) => {
                if (!$(accordion).hasClass("accordion--item__header--active")) {
                    $(accordion).toggleClass("accordion--item__header--active").next(".accordion--item__body").slideToggle("slow");
                }
            });
        }
        // Close All Accordions
        else {
            $(".accordion--toggle--all__btn").removeClass("all-open").html("Open All");
            $(".accordion--item__header").removeClass("accordion--item__header--active").next(".accordion--item__body").slideUp("slow");
            let $this = $(this);
            setTimeout(function () {
                // Fixed by Richard (03/12/24).
                $("html, body").animate({ scrollTop: $this.parent().parent().siblings('.accordion__items').offset().top - 150 }, "slow");
                //$("html, body").animate({scrollTop:$(".accordion__items").offset().top - 150}, "slow");
            }, 500);
        }
    });

    // detects scroll-to anchor links and scrolls while accommodating lazyloaded images
    $('body').on('click', 'a[href^="#"], a[href^="/#"]', function (e) {

        // Prevent scroll if the link has data-noscroll attribute.
        if ($(this).data('noscroll')) {
            return false;
        }

        // Get the hash. In this example, "#myDestinationAnchor".
        var targetSelector = this.hash;
        var $target = $(targetSelector);
        var targetOffset = $target.offset();

        if (targetOffset) {
            let scrollTopValue = targetOffset.top;
            if ($(".announcement--bar").length > 0) {
                scrollTopValue + 300;
            }

            $('html, body').animate(
                {
                    scrollTop: scrollTopValue // Scroll to this location.
                }, {
                // Set the duration long enough to allow time
                // to lazy load the elements.
                duration: 1000,

                // At each animation step, check whether the target has moved.
                step: function (now, fx) {

                    // Where is the target now located on the page?
                    // i.e. its location will change as images etc. are lazy loaded
                    var newOffset = $target.offset().top - 100;

                    // If where we were originally planning to scroll to is not
                    // the same as the new offset (newOffset) then change where
                    // the animation is scrolling to (fx.end).
                    if (fx.end !== newOffset)
                        fx.end = newOffset;
                }
            });
        }
    });

    // Hide play button until Wistia video is loaded to prevent layout shift
    window._wq = window._wq || [];
    _wq.push({
        id: "_all", onReady: function (video) {
            $(".wistia-card__play--btn").show();
        }
    });

    /************************************************************
      Insert line break opportunities into a URL inside content
    ************************************************************/
    function formatUrl() {
        let links = document.querySelectorAll(".site-main a, .footer a");

        links.forEach(function (link) {
            // Get link text
            let linkText = link.innerHTML;

            if (!linkText.includes("<")) {
                // Check if the link includes https:// or http://
                if (linkText.includes("https://") || linkText.includes("http://")) {
                    // Split the URL into an array to distinguish double slashes from single slashes
                    let doubleSlash = linkText.split('//');

                    // Format the strings on either side of double slashes separately
                    let formatted = doubleSlash.map(str =>
                        // Insert a word break opportunity after a colon
                        str.replace(/(?<after>:)/giu, '$1<wbr>')
                            // Before a single slash, tilde, period, comma, underscore, question mark, number sign, or percent symbol
                            .replace(/(?<before>[/~.,_?#%])/giu, '<wbr>$1')
                            // Before and after an equals sign or ampersand
                            .replace(/(?<beforeAndAfter>[=&])/giu, '<wbr>$1<wbr>')
                        // Reconnect the strings with word break opportunities after double slashes
                    ).join('//<wbr>');

                    // Update link text
                    link.innerHTML = formatted;
                }
                // Check if the link is an email address
                // else if (linkText.includes("@")) {
                //     link.innerHTML = link.innerHTML.replace(/(?<before>[@])/giu, '<wbr>$1');
                // }
                // For links that don't include https:// or http:// and aren't an email address
                else {
                    link.innerHTML = link.innerHTML.replace(/(?<after>:)/giu, '$1<wbr>')
                        // Before a single slash, tilde, period, comma, underscore, question mark, number sign, or percent symbol
                        .replace(/(?<before>[/~.,_?#%])/giu, '<wbr>$1')
                        // Before and after an equals sign or ampersand
                        .replace(/(?<beforeAndAfter>[=&])/giu, '<wbr>$1<wbr>');
                }
            }
        })
    }

    formatUrl();
});
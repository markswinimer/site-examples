/*
   scripts before:after carousel
*/

jQuery(document).ready(function ($) {

    /***********
      This script manages the before and after slider using the classes and id on the 'tab-toggle' elements
      it will display the previous or next arrow depending on the index of the active tab in the array of 'tab-toggle' elements
      it will display the current slide and carousels slides depending on the id of the tab-toggle element with the class 'toggle--active'
      before-and-after-slider.php must be set up accordingly
    ************/

    // takes in part id like "elbow" and handles styling and active class for that tab if not already active
    function handleActiveTab(selectedTabId) {
        let activeTab = $(".toggle--active");
        let selectedTab = $("#" + selectedTabId);

        if (selectedTab != activeTab) {
            activeTab.removeClass("toggle--active");
            selectedTab.addClass("toggle--active");
            manageArrowControls();
            handleActiveSlide(selectedTabId);
        }
    }

    // handles which arrow controls are currently visible
    function manageArrowControls() {
        let previousArrow = $(".previous-arrow");
        let nextArrow = $(".next-arrow");
        let tabs = $(".tab-toggle");
        let activeTab = $(".toggle--active")
        let activeTabIndex = tabs.index(activeTab);

        // if on first slide, don't show left arrow, if on last slide, don't show right arrow, else show both
        if (activeTabIndex === 0) {
            previousArrow.removeClass("show-arrow");
            nextArrow.addClass("show-arrow");
        } else if (activeTabIndex === (tabs.length - 1)) {
            nextArrow.removeClass("show-arrow");
            previousArrow.addClass("show-arrow");
        } else {
            previousArrow.addClass("show-arrow");
            nextArrow.addClass("show-arrow");
        }
    }

    // when an arrow is clicked, progress to next or previous slide if an active tab index is found
    function handleArrowClick(direction) {
        let tabs = $(".tab-toggle");
        let activeTab = $(".toggle--active");
        let activeTabIndex = tabs.index(activeTab);

        if (activeTabIndex !== -1) {
            if (direction === "previous") {
                let targetPartId = tabs.eq(activeTabIndex - 1).attr('id');
                handleActiveTab(targetPartId);
            }
            else if (direction === "next") {
                let targetPartId = tabs.eq(activeTabIndex + 1).attr('id');
                handleActiveTab(targetPartId);
            }
        }
    }

    // handle which slide is active by toggling the class 'slide--active'
    function handleActiveSlide(partId) {
        let targetSlide = $("." + partId + "--slide");
        let activeSlide = $(".slide--active");

        if (targetSlide.hasClass("slide--active") != true) {
            targetSlide.addClass("slide--active");
            activeSlide.removeClass("slide--active");
        }
    }

    if ($(".cocoen")) {
        // initialize the state of the baa-slider
        let tabs = $(".tab-toggle");
        handleActiveTab("elbow");

        tabs.click(function () {
            handleActiveTab(this.id);
        })

        $(".previous-arrow").click(function () {
            handleArrowClick("previous");
        })

        $(".next-arrow").click(function () {
            handleArrowClick("next");
        })

        // creates multiple Cocoen sliders for any elements with a class of .cocoen
        Cocoen.parse(document.body);
    }
});

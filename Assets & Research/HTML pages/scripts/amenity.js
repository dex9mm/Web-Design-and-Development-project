

        // The URL for the Google Programmable Search Engine query
        const SEARCH_URL = "https://programmablesearchengine.google.com/docs/element/results-only_url.html?q=nearest%20water%20amenity";

        /**
         * Navigates the user to the predefined search URL in a new tab.
         */
        function findNearestAmenity() {
            // Using window.open('_blank') is preferred for search links 
            // so the user's current page is not lost.
            window.open(SEARCH_URL, '_blank');
        }

        // Optional: Add event listener as a modern alternative to onclick in HTML
        // This is commented out as the user provided the onclick structure, but is
        // included for best practice awareness.
        /*
        document.addEventListener('DOMContentLoaded', () => {
            const button = document.getElementById('amenityButton');
            if (button) {
                button.addEventListener('click', findNearestAmenity);
            }
        });
        */
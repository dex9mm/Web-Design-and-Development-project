
    //Wait for the DOMContentLoaded event to ensure all HTML is loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // --- 1. Get all buttons and close buttons ---
        var btns = document.querySelectorAll('[id^="myBtn"]'); 
        var closeSpans = document.querySelectorAll('.close');
        btns.forEach(function(btn) {
            btn.onclick = function() {
                // Determine the modal ID directly from the button's ID (e.g., myBtn1 -> myModal1)
                var modalId = "myModal" + btn.id.slice(-1);
                var modal = document.getElementById(modalId);
                
                if (modal) {
                    modal.style.display = "block";
                }
            };
        });
        // --- 3. Close Logic: Add event listener to each 'x' to CLOSE its modal ---
        closeSpans.forEach(function(span) {
            span.onclick = function() {
                var modalId = span.getAttribute('data-modal-id');
                var modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = "none";
                }
            };
        });

        // --- 4. Close the modal if the user clicks anywhere outside of it ---
        window.onclick = function(event) {
            var modals = document.querySelectorAll('.modal');
            modals.forEach(function(modal) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        };
    }); 
	
	
        // The URL for the Google Programmable Search Engine query
        const SEARCH_URL = "https://www.google.com/search?q=nearest+water+amenity&ie=UTF-8";

        /**
         * Navigates the user to the predefined search URL in a new tab.
         */
        function findNearestAmenity() {
            // Using window.open('_blank') is preferred for search links 
            // so the user's current page is not lost.
            window.open(SEARCH_URL, '_blank');
        }

        document.addEventListener('DOMContentLoaded', () => {
            const button = document.getElementById('amenityButton');
            if (button) {
                button.addEventListener('click', findNearestAmenity);
            }
        });
    
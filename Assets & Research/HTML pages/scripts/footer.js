// all worked on navbar development
// Tristan, Alex, Derek, Andrei
var footer = `
		<!-- FOOTER -->
		<footer class="mt-5 py-4 bg-dark text-light">
		<div class="container">
		 
				<!-- All columns by Center -->
		<div class="row justify-content-center text-center">
		 
					<!-- Left column -->
		<div class="col-md-4 mb-3">
		<h5 class="fw-bold">Group G</h5>
		<p class="small">Sustainability Project — National College of Ireland</p>
		</div>
		 
					<!-- Center column -->
		<div class="col-md-3 mb-3">
		<h5 class="fw-bold">Navigation</h5>
		<ul class="list-unstyled">
		<li><a href="index.html" class="text-light text-decoration-none">Home</a></li>
		<li><a href="news.html" class="text-light text-decoration-none">News</a></li>
		<li><a href="info.html" class="text-light text-decoration-none">Info</a></li>
		<li><a href="contact.html" class="text-light text-decoration-none">Contact Us</a></li>
		</ul>
		</div>
		 
					<!-- Right column -->
		<div class="col-md-3 mb-3">
		<h5 class="fw-bold">Contact</h5>
		<p class="small mb-1">Email: groupg@nci.ie</p>
		<p class="small mb-1">Phone: +353 123 4567</p>
		<p class="small">Dublin, Ireland</p>
		</div>
		 
				</div>
		 
				<hr class="border-light">
		 
				<p class="text-center small mb-0">
					© 2025 Group G — All Rights Reserved
		</p>
		 
			</div>
		</footer>`;
		// insert navbar at the beginning of body tag
		document.body.insertAdjacentHTML("beforeend", footer);

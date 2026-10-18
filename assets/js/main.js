(function () {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="wrap nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="SAPEX">
          <span class="brand-text">
            <strong>SAPEX</strong>
            <span>Mining Systems and Processes</span>
          </span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="nav-links">
          <li><a href="index.html" data-page="index.html">Home</a></li>
          <li><a href="about.html" data-page="about.html">About</a></li>
          <li><a href="services.html" data-page="services.html">Services</a></li>
          <li><a href="capability.html" data-page="capability.html">Capability</a></li>
          <li><a class="nav-cta" href="contact.html" data-page="contact.html">Contact</a></li>
        </ul>
      </div>`;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <h2>SAPEX Mining Systems and Processes Limited</h2>
            <p>Technical document writing for mining and mobile maintenance. Based in Tabubil, Western Province, Papua New Guinea.</p>
          </div>
          <div>
            <h3>Pages</h3>
            <p><a href="index.html">Home</a><br>
            <a href="about.html">About</a><br>
            <a href="services.html">Services</a><br>
            <a href="capability.html">Capability</a><br>
            <a href="contact.html">Contact</a></p>
          </div>
          <div>
            <h3>Principal</h3>
            <p>Isaac Madrino Piwen<br>Director<br>Tabubil, Western Province, PNG</p>
          </div>
        </div>
        <p class="legal">© ${new Date().getFullYear()} SAPEX Mining Systems and Processes Limited. All rights reserved.</p>
      </div>`;
  }

  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.getAttribute("data-page") === path) {
      link.setAttribute("aria-current", "page");
    }
  });

  const toggle = document.querySelector(".menu-toggle");
  const links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const org = String(data.get("organisation") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        status.className = "form-status err";
        status.textContent = "Please complete name, email, and message.";
        return;
      }

      const subject = encodeURIComponent(`SAPEX enquiry — ${service || "General"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nOrganisation: ${org}\nEmail: ${email}\nService: ${service}\n\n${message}`
      );
      status.className = "form-status ok";
      status.textContent = "Enquiry prepared. Your email application will open with the message ready to send to the Director.";
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  }
})();

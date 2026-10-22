// Shared tools for madeinusawalkintubs.com: shower footprint finder + origin wording checker. No network calls.
(function () {
  var S4L = 'https://showers4less.com/products/';
  // Bestbath footprints in the Showers4Less Made in USA collection, checked 2026-10-22. [width, depth, label, handle, kind]
  var P = [
    [36, 36, 'ADA transfer shower package', '36-x-36-ada-transfer-shower-package-complete-bundle', 'Package'],
    [38, 38, 'Barrier-free shower pan', '38-x-38-barrier-free-shower-pan', 'Pan only'],
    [40, 38, 'Barrier-free shower', '40-x-38-ada-compliant-handicap-shower-barrier-free-shower', 'Shower'],
    [42, 36, 'Roll-in shower package', '42-x-36-roll-in-shower-full-package-multi-piece-shower-center-drain-integrated-soap-dishes', 'Package'],
    [42, 42, 'Neo-angle corner pan', '42-x-42-barrier-free-shower-pan-neo-angle-corner-shower-pan', 'Pan only'],
    [45, 50, 'Trench-drain roll-in pan', '45-x-50-roll-in-shower-pan-barrier-free-trench-drain-75-up-to-2-option', 'Pan only'],
    [48, 34, 'Roll-in shower pan', '48-x-34-roll-in-shower-pan-barrier-free', 'Pan only'],
    [48, 48, 'Barrier-free shower package', '48-x-48-barrier-free-shower', 'Package'],
    [51, 39, 'Low-threshold pan', 'barrie-free-shower-pan-51-x-39-low-threshold-shower-pan', 'Pan only'],
    [54, 30, 'Low-threshold roll-in pan', 'low-threshold-shower-pan-54-x-30-roll-in-shower-pan', 'Pan only'],
    [54, 36, 'Barrier-free shower pan', 'barrier-free-shower-pan-54-x-36', 'Pan only'],
    [60, 29, 'Wheelchair-accessible pan', 'wheelchair-accessible-shower-pan-60-x-29-low-roll-in-threshold', 'Pan only'],
    [60, 30, 'Roll-in shower package', '60-x-30-roll-in-shower', 'Package'],
    [60, 32, 'Roll-in shower package', '60-x-32-roll-in-shower-barrier-free-shower-handicap-shower', 'Package'],
    [60, 33, 'Roll-in shower package', '60-x-33-roll-in-shower-barrier-free-shower-handicap-shower', 'Package'],
    [60, 34, 'Roll-in shower kit', '60-x-34-roll-in-shower-barrier-free-shower-diy-shower-kit', 'Package'],
    [60, 36, 'Roll-in shower package', '60-x-36', 'Package'],
    [60, 42, 'Roll-in shower kit', '60-x-42-roll-in-shower-barrier-free-shower-diy-shower-kits', 'Package'],
    [60, 48, 'Large wheelchair-accessible shower', '60-x-48-roll-in-shower-handicap-showers-large-wheelchair-accessible-shower', 'Package'],
    [60, 60, 'Roll-in shower kit', '60-x-60-roll-in-shower-kit-barrier-free-showers-handicap-showers', 'Package'],
    [72, 48, 'Large / bariatric roll-in shower', '72-x-48-roll-in-shower-large-walk-in-shower-bariatric-shower-stall', 'Shower']
  ];
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var fit = document.getElementById('fit');
  if (fit) {
    var out = document.getElementById('fit-out');
    var run = function () {
      var w = parseFloat(document.getElementById('fw').value), d = parseFloat(document.getElementById('fd').value), need = document.getElementById('fn').value;
      if (!(w >= 24 && w <= 120 && d >= 24 && d <= 120)) { out.innerHTML = '<p class="warn">Please enter a width and a depth between 24 and 120 inches.</p>'; return; }
      var big = Math.max(w, d), small = Math.min(w, d);
      var rows = P.filter(function (p) {
        var L = Math.max(p[0], p[1]), S = Math.min(p[0], p[1]);
        if (L > big || S > small) return false;
        if (need === 'chair') return L >= 60 && S >= 30;
        if (need === 'care') return L >= 60 && S >= 42;
        if (need === 'seat') return S >= 36 || (L >= 60 && S >= 29);
        return true;
      }).sort(function (a, b) { return b[0] * b[1] - a[0] * a[1]; });
      var note = { any: 'All footprints that fit are shown.', seat: 'Shown: footprints at least 36 inches on both sides (transfer size) or tub-size 60-inch pans, which leave room for a seat.', chair: 'Shown: 60-inch footprints, the size class of a standard roll-in shower in the ADA Standards (30 x 60 inches inside, minimum).', care: 'Shown: 60-inch footprints at least 42 inches deep, which leave standing room for a helper.' }[need];
      if (!rows.length) { out.innerHTML = '<p class="warn">None of the listed American-made footprints fit ' + esc(w) + ' x ' + esc(d) + ' inches for that need. A custom size or moving a wall may be needed. Aging Safely Baths can look at your plan: call 1-888-779-2284.</p>'; return; }
      var h = '<p><strong>' + rows.length + ' footprint' + (rows.length > 1 ? 's' : '') + ' fit ' + esc(w) + ' x ' + esc(d) + ' inches.</strong> ' + note + '</p><ul class="fitlist">';
      rows.slice(0, 8).forEach(function (p) { h += '<li><a href="' + S4L + p[3] + '">' + p[0] + ' x ' + p[1] + ' in. ' + esc(p[2]) + '</a> <span class="badge">' + p[4] + '</span></li>'; });
      h += '</ul>' + (rows.length > 8 ? '<p>Showing the 8 largest. See them all in the <a href="https://showers4less.com/collections/made-in-usa">Made in USA collection</a>.</p>' : '');
      out.innerHTML = h;
    };
    fit.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    ['fw', 'fd', 'fn'].forEach(function (id) { document.getElementById(id).addEventListener('change', run); });
    run();
  }
  var chk = document.getElementById('chk');
  if (chk) {
    var R = {
      made: ['A full U.S.-origin claim.', 'Under the FTC rule (16 CFR 323.2) this means final assembly and all significant processing in the U.S., and all or virtually all components made and sourced in the U.S.', 'Ask: "Which parts, if any, are imported? Can you show the plant name in writing?"'],
      assembled: ['An honest claim about where the work happened.', 'The FTC allows "Assembled in USA" when the principal assembly in the U.S. is substantial. Parts can come from anywhere, and a simple screwdriver assembly usually does not qualify.', 'Ask: "Where are the shell, door, seal, pumps and faucet made?"'],
      qualified: ['A qualified claim that discloses foreign content.', 'The FTC treats this as a claim about real U.S. work with imported parts disclosed. It is more precise than an unqualified claim, not weaker in honesty.', 'Ask: "Which parts are imported, and from where?"'],
      designed: ['A claim about one step, not the whole product.', 'The FTC uses "Designed in USA, Made in Finland" as its example. The product itself may be made elsewhere.', 'Ask: "Where is it manufactured?" and look for a separate country-of-origin mark.'],
      foreign: ['The required foreign-origin mark.', 'Under 19 U.S.C. 1304, imported articles must show the English name of their country of origin so the ultimate purchaser can see it. This tells you the product was imported in this form.', 'Ask: "Who supports this product in the U.S., and where do spare parts ship from?"'],
      distributed: ['Not an origin claim at all.', 'A U.S. company name or address tells you who sells or imports the product, not where it was made. An imported product still needs its own country-of-origin mark.', 'Ask: "Where is it manufactured?" and look on the product and carton for a "Made in" mark.'],
      flag: ['An implied U.S.-origin claim.', 'The FTC says U.S. symbols such as flags or maps can convey a claim of U.S. origin by themselves, so the product should meet the Made in USA standard.', 'Ask: "Does the flag mean Made in USA? Which parts are imported?"'],
      none: ['No answer yet.', 'Most products sold in the U.S. do not have to say "Made in USA." But imported articles generally must carry a foreign-origin mark, on the article or sometimes its container.', 'Check the carton and spec sheet, then ask the seller to write down where it is made.']
    };
    var W = { product: 'A mark on the product itself is the most reliable, because CBP prefers marks worked in at manufacture.', carton: 'For some items the container carries the mark. Photograph it before the box is thrown away.', web: 'Online listings and brochures are covered by the same FTC standard as physical labels (16 CFR 323.3). Save a screenshot.' };
    var o = document.getElementById('chk-out');
    var show = function () {
      var k = document.getElementById('phrase').value, wh = document.getElementById('where').value;
      if (!k) { o.innerHTML = '<p>Choose a phrase to see what it means.</p>'; return; }
      var r = R[k];
      o.innerHTML = '<p><strong>' + r[0] + '</strong></p><p>' + r[1] + '</p><p class="nextq">' + r[2] + '</p><p class="where">' + W[wh] + '</p>';
    };
    chk.addEventListener('change', show);
    chk.addEventListener('submit', function (e) { e.preventDefault(); show(); });
  }
})();

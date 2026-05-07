const STORAGE_KEYS = {
    watchlist: "watchlist",
    franchiseProgress: "baba_franchise_progress_v2",
    userRatings: "baba_user_ratings_v2"
};

let CATALOG = [];

function normalizeGenre(genreStr) {
    if (!genreStr) return "other";
    const first = genreStr.split(",")[0].trim().toLowerCase();
    const map = {
        "body horror": "horror",
        "slasher": "horror",
        "mystery": "thriller",
        "romance": "drama",
        "musical": "drama",
        "western": "action",
        "adventure": "action",
        "superhero": "action",
        "family": "fantasy"
    };
    return map[first] || first;
}

function parseMovieRating(ratingStr) {
    if (!ratingStr || ratingStr === "TBA") return 0;
    const n = parseFloat(ratingStr);
    return isNaN(n) ? 0 : n;
}

async function loadMoviesData() {
    try {
        const res = await fetch("movies-data.json");
        const data = await res.json();
        return Object.entries(data).map(([id, movie]) => ({
            id,
            title: movie.title,
            type: movie.type || "movie",
            genre: normalizeGenre(movie.genre),
            year: movie.year || "",
            duration: movie.duration || "",
            poster: movie.cover || "",
            communityRating: parseMovieRating(movie.rating),
            description: movie.description || "",
            streamUrl: movie.streamUrl || ""
        }));
    } catch (err) {
        console.error("Fehler beim Laden von movies-data.json:", err);
        return [];
    }
}

const FRANCHISES = [
    {
        slug: "harry-potter",
        title: "Harry Potter",
        parts: [
            { id: "hp-1", title: "Stein der Weisen", year: 2001, communityRating: 7.6, likes: 21000 },
            { id: "hp-2", title: "Kammer des Schreckens", year: 2002, communityRating: 7.4, likes: 18600 },
            { id: "hp-3", title: "Gefangener von Askaban", year: 2004, communityRating: 8.0, likes: 23300 },
            { id: "hp-4", title: "Feuerkelch", year: 2005, communityRating: 7.7, likes: 19800 }
        ]
    },
    {
        slug: "fast-furious",
        title: "Fast & Furious",
        parts: [
            { id: "ff-1", title: "The Fast and the Furious", year: 2001, communityRating: 6.8, likes: 14100 },
            { id: "ff-2", title: "2 Fast 2 Furious", year: 2003, communityRating: 6.0, likes: 9800 },
            { id: "ff-3", title: "Tokyo Drift", year: 2006, communityRating: 6.3, likes: 12000 },
            { id: "ff-4", title: "Fast & Furious", year: 2009, communityRating: 6.6, likes: 10200 }
        ]
    },
    {
        slug: "star-wars",
        title: "Star Wars",
        parts: [
            { id: "sw-4", title: "Episode IV", year: 1977, communityRating: 8.6, likes: 26100 },
            { id: "sw-5", title: "Episode V", year: 1980, communityRating: 8.8, likes: 29400 },
            { id: "sw-6", title: "Episode VI", year: 1983, communityRating: 8.3, likes: 20100 },
            { id: "sw-7", title: "Episode VII", year: 2015, communityRating: 7.8, likes: 18800 }
        ]
    },
    {
        slug: "marvel",
        title: "Marvel",
        parts: [
            { id: "m-ironman", title: "Iron Man", year: 2008, communityRating: 7.9, likes: 22400 },
            { id: "m-avengers", title: "The Avengers", year: 2012, communityRating: 8.0, likes: 24100 },
            { id: "m-infwar", title: "Infinity War", year: 2018, communityRating: 8.4, likes: 27300 },
            { id: "m-endgame", title: "Endgame", year: 2019, communityRating: 8.3, likes: 28600 }
        ]
    },
    {
        slug: "shrek",
        title: "Shrek",
        parts: [
            { id: "shrek-1", title: "Shrek", year: 2001, communityRating: 7.9, likes: 17800 },
            { id: "shrek-2", title: "Shrek 2", year: 2004, communityRating: 7.9, likes: 24100 },
            { id: "shrek-3", title: "Shrek der Dritte", year: 2007, communityRating: 6.2, likes: 10200 },
            { id: "shrek-4", title: "Fuer immer Shrek", year: 2010, communityRating: 6.3, likes: 9600 }
        ]
    },
    {
        slug: "toy-story",
        title: "Toy Story",
        parts: [
            { id: "ts-1", title: "Toy Story", year: 1995, communityRating: 8.3, likes: 21900 },
            { id: "ts-2", title: "Toy Story 2", year: 1999, communityRating: 7.9, likes: 17300 },
            { id: "ts-3", title: "Toy Story 3", year: 2010, communityRating: 8.3, likes: 27500 },
            { id: "ts-4", title: "Toy Story 4", year: 2019, communityRating: 7.7, likes: 16000 }
        ]
    }
];

const appState = {
    watchlist: {},
    franchise: {},
    userRatings: {},
    roulettePick: null
};

// ── Catalog filter/sort state ──────────────────────────
let catalogFilterType = "all";
let catalogFilterGenre = "all";
let catalogSort = "default";

// ── Franchise groups detected from catalog IDs ────────
const CATALOG_FRANCHISE_MAP = {
    "saw":              { label: "SAW Universe",          ids: ["saw-1","saw-2","saw-3","saw-4","saw-5","saw-6","saw-7","jigsaw","saw-spiral","saw-x"] },
    "final-dest":       { label: "Final Destination",     ids: ["final-destination","final-destination-6"] },
    "scream":           { label: "Scream Franchise",      ids: ["scream-1","scream-2","scream-3","scream-4","scream-5","scream-6"] },
    "cloverfield":      { label: "Cloverfield Universe",  ids: ["cloverfield","10-cloverfield-lane","cloverfield-paradox"] },
    "cube":             { label: "Cube Franchise",        ids: ["cube-zero","cube","cube-2","cube-2021"] },
};

function safeGetJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch {
        return fallback;
    }
}

function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function initState() {
    appState.watchlist = safeGetJSON(STORAGE_KEYS.watchlist, {});
    appState.franchise = safeGetJSON(STORAGE_KEYS.franchiseProgress, {});
    appState.userRatings = safeGetJSON(STORAGE_KEYS.userRatings, {});

    FRANCHISES.forEach((franchise) => {
        if (!appState.franchise[franchise.slug]) appState.franchise[franchise.slug] = {};
        franchise.parts.forEach((part) => {
            if (!appState.franchise[franchise.slug][part.id]) {
                appState.franchise[franchise.slug][part.id] = {
                    seen: false,
                    status: "planned",
                    rating: 0,
                    comment: ""
                };
            }
        });
    });

    saveJSON(STORAGE_KEYS.franchiseProgress, appState.franchise);
}

function formatLikes(n) {
    return `${Math.round(n / 100) / 10}k`;
}

function makeStars(value) {
    const full = Math.round(value / 2);
    return `${"★".repeat(full)}${"☆".repeat(5 - full)}`;
}

function isInWatchlist(id) {
    return Boolean(appState.watchlist[id]);
}

function toggleWatchlist(movieId, title) {
    if (isInWatchlist(movieId)) {
        delete appState.watchlist[movieId];
    } else {
        appState.watchlist[movieId] = {
            title,
            addedAt: new Date().toISOString(),
            addedAtFormatted: new Date().toLocaleDateString("de-DE")
        };
    }

    saveJSON(STORAGE_KEYS.watchlist, appState.watchlist);
    renderStats();
    renderCatalogShelf();
    renderContinueWatching();
}

function getFranchiseStats(franchise) {
    const progressMap = appState.franchise[franchise.slug];
    const total = franchise.parts.length;
    const seenCount = franchise.parts.filter((part) => progressMap[part.id].seen).length;
    const progress = Math.round((seenCount / total) * 100);
    return { total, seenCount, progress };
}

function renderStats() {
    const statsEl = document.getElementById("quickStats");
    if (!statsEl) return;

    const allParts = FRANCHISES.flatMap((f) => f.parts.map((p) => ({ franchise: f.slug, id: p.id })));
    const seen = allParts.filter((part) => appState.franchise[part.franchise][part.id].seen).length;
    const ratings = Object.values(appState.userRatings).filter((v) => Number(v) > 0);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + Number(b), 0) / ratings.length).toFixed(1) : "—";
    const completedFranchises = FRANCHISES.filter((f) => getFranchiseStats(f).progress === 100).length;

    statsEl.innerHTML = `
        <div class="quick-stat"><b>${CATALOG.length}</b><span>Titel</span></div>
        <div class="quick-stat"><b>${Object.keys(appState.watchlist).length}</b><span>Watchlist</span></div>
        <div class="quick-stat"><b>${seen}/${allParts.length}</b><span>Franchise gesehen</span></div>
        <div class="quick-stat"><b>${avgRating}</b><span>Mein Schnitt</span></div>
        <div class="quick-stat"><b>${completedFranchises}</b><span>Achievements</span></div>
    `;

    // Update accordion badges
    const fb = document.getElementById("franchiseBadge");
    if (fb) fb.textContent = `${completedFranchises}/${FRANCHISES.length} abgeschlossen`;

    const cb = document.getElementById("continueCount");
    if (cb) {
        const remaining = FRANCHISES.filter(f => f.parts.some(p => !appState.franchise[f.slug][p.id].seen)).length;
        cb.textContent = remaining > 0 ? String(remaining) : "";
        cb.style.display = remaining > 0 ? "" : "none";
    }
}

function renderContinueWatching() {
    const box = document.getElementById("continueWatching");
    if (!box) return;

    const nextUp = [];
    FRANCHISES.forEach((franchise) => {
        const progressMap = appState.franchise[franchise.slug];
        const candidate = franchise.parts.find((part) => !progressMap[part.id].seen);
        if (candidate) {
            const stats = getFranchiseStats(franchise);
            nextUp.push({
                title: `${franchise.title}: ${candidate.title}`,
                progress: stats.progress,
                note: `${stats.seenCount}/${stats.total} gesehen`
            });
        }
    });

    if (!nextUp.length) {
        box.innerHTML = '<p class="empty-note">Alles durchgeschaut. Zeit fuer neue Reihen.</p>';
        return;
    }

    box.innerHTML = nextUp.slice(0, 6).map((item) => `
        <article class="continue-card">
            <h3>${item.title}</h3>
            <p>${item.note}</p>
            <div class="progress-track"><div class="progress-fill" style="width:${item.progress}%"></div></div>
        </article>
    `).join("");
}

function renderFranchiseGrid() {
    const grid = document.getElementById("franchiseGrid");
    if (!grid) return;

    grid.innerHTML = FRANCHISES.map((franchise) => {
        const map = appState.franchise[franchise.slug];
        const stats = getFranchiseStats(franchise);
        const unlocked = stats.progress === 100;

        const partsHtml = franchise.parts.map((part) => {
            const state = map[part.id];
            return `
                <div class="part-item" data-franchise="${franchise.slug}" data-part="${part.id}">
                    <div class="part-head">
                        <input class="part-check" type="checkbox" ${state.seen ? "checked" : ""}>
                        <div>
                            <strong class="part-title">${part.title} (${part.year})</strong>
                            <div class="part-community">Community ${part.communityRating}/10 · ${formatLikes(part.likes)} Likes</div>
                        </div>
                        <span>${makeStars(part.communityRating)}</span>
                    </div>
                    <div class="part-controls">
                        <select class="part-select">
                            <option value="planned" ${state.status === "planned" ? "selected" : ""}>Geplant</option>
                            <option value="watching" ${state.status === "watching" ? "selected" : ""}>Schaue ich</option>
                            <option value="paused" ${state.status === "paused" ? "selected" : ""}>Pausiert</option>
                            <option value="completed" ${state.status === "completed" ? "selected" : ""}>Abgeschlossen</option>
                        </select>
                        <input class="part-rating" type="number" min="0" max="10" step="0.5" value="${state.rating}">
                        <textarea class="part-comment" placeholder="Kommentar...">${state.comment || ""}</textarea>
                    </div>
                </div>
            `;
        }).join("");

        return `
            <article class="franchise-card">
                <div class="franchise-head">
                    <h3>${franchise.title}</h3>
                    <span class="franchise-chip">${franchise.parts.length} Teile</span>
                </div>
                <div class="franchise-progress-row">
                    <div class="progress-track"><div class="progress-fill" style="width:${stats.progress}%"></div></div>
                    <span>${stats.progress}%</span>
                </div>
                ${unlocked ? '<span class="franchise-chip">Achievement: Reihe abgeschlossen</span>' : ""}
                <div class="parts-list">${partsHtml}</div>
            </article>
        `;
    }).join("");
}

// ── Group catalog movies into franchise/genre buckets ──
function buildCatalogGroups(movies) {
    const assigned = new Set();
    const groups = [];

    for (const [key, def] of Object.entries(CATALOG_FRANCHISE_MAP)) {
        const grouped = def.ids.map(id => movies.find(m => m.id === id)).filter(Boolean);
        if (!grouped.length) continue;
        grouped.forEach(m => assigned.add(m.id));
        groups.push({ key, label: def.label, type: "franchise", movies: grouped, bgImage: grouped[0].poster });
    }

    const rest = movies.filter(m => !assigned.has(m.id));

    // Series as their own group
    const seriesMovies = rest.filter(m => m.type === "series");
    if (seriesMovies.length) groups.push({ key: "series", label: "Serien", type: "group", movies: seriesMovies, bgImage: seriesMovies[0].poster });

    // Remaining films grouped by genre
    const byGenre = {};
    rest.filter(m => m.type !== "series").forEach(m => { (byGenre[m.genre] = byGenre[m.genre] || []).push(m); });

    const genreLabels = {
        horror: "Horror & Schock", thriller: "Thriller & Spannung",
        "sci-fi": "Sci-Fi & Zukunft", action: "Action & Abenteuer",
        drama: "Drama", animation: "Animation", fantasy: "Fantasy & Märchen",
        crime: "Crime", other: "Weitere Titel"
    };

    for (const [genre, gMovies] of Object.entries(byGenre)) {
        groups.push({ key: `genre-${genre}`, label: genreLabels[genre] || genre, type: "genre", movies: gMovies, bgImage: gMovies[0].poster });
    }

    return groups;
}

function applyShelfFilters(groups) {
    let result = groups.map(g => ({
        ...g,
        movies: g.movies.filter(m => {
            if (catalogFilterType !== "all" && m.type !== catalogFilterType) return false;
            if (catalogFilterGenre !== "all" && m.genre !== catalogFilterGenre) return false;
            if (catalogSort === "watchlist" && !isInWatchlist(m.id)) return false;
            if (catalogSort === "rated" && !Number(appState.userRatings[m.id])) return false;
            return true;
        })
    })).filter(g => g.movies.length > 0);

    const sortFns = {
        "rating-desc": (a, b) => b.communityRating - a.communityRating,
        "rating-asc":  (a, b) => a.communityRating - b.communityRating,
        "year-desc":   (a, b) => String(b.year || "0").localeCompare(String(a.year || "0")),
        "year-asc":    (a, b) => String(a.year || "0").localeCompare(String(b.year || "0")),
    };

    if (sortFns[catalogSort]) {
        const flat = result.flatMap(g => g.movies).sort(sortFns[catalogSort]);
        return flat.length ? [{ key: "sorted", label: "Sortierte Ansicht", movies: flat, bgImage: flat[0].poster }] : [];
    }

    return result;
}

/* ── Shelf book: just the cover; tooltip is a portal in <body> ── */
function renderShelfBook(movie) {
    const inWL = isInWatchlist(movie.id);
    const esc = (s) => String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return `
        <div class="shelf-book${inWL ? " in-watchlist" : ""}"
             data-id="${esc(movie.id)}"
             tabindex="0" role="button" aria-label="${esc(movie.title)}">
            <img class="shelf-book-cover" src="${esc(movie.poster)}" alt="${esc(movie.title)}" loading="lazy">
        </div>`;}

/* ── Build tooltip content for a given movie ── */
function buildTooltipHTML(movie) {
    const ur = Number(appState.userRatings[movie.id] || 0);
    const inWL = isInWatchlist(movie.id);
    const ratingDisplay = movie.communityRating > 0 ? `${movie.communityRating}/10` : "TBA";
    const esc = (s) => String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const stars = makeStars(movie.communityRating || 0);
    return `
        <div class="shelf-popup-poster-wrap">
            <img class="shelf-popup-poster" src="${esc(movie.poster)}" alt="${esc(movie.title)}" loading="lazy">
        </div>
        <div class="shelf-popup-body">
            <h4 class="shelf-popup-title">${movie.title}</h4>
            <div class="shelf-popup-meta">
                <span class="meta-pill">${movie.type === "movie" ? "Film" : "Serie"}</span>
                ${movie.year ? `<span class="meta-pill">${movie.year}</span>` : ""}
                <span class="meta-pill">${ratingDisplay}</span>
                ${inWL ? '<span class="meta-pill wl-pill">&#9733; Watchlist</span>' : ""}
            </div>
            <p class="shelf-popup-desc">${movie.description}</p>
            <div class="shelf-popup-rating">
                <span class="popup-stars">${stars}</span>
                <select data-action="set-user-rating" data-movie-id="${esc(movie.id)}">
                    <option value="0" ${ur === 0 ? "selected" : ""}>Mein Rating</option>
                    <option value="6" ${ur === 6 ? "selected" : ""}>6/10</option>
                    <option value="7" ${ur === 7 ? "selected" : ""}>7/10</option>
                    <option value="8" ${ur === 8 ? "selected" : ""}>8/10</option>
                    <option value="9" ${ur === 9 ? "selected" : ""}>9/10</option>
                    <option value="10" ${ur === 10 ? "selected" : ""}>10/10</option>
                </select>
            </div>
            <div class="shelf-popup-actions">
                <button type="button" data-action="open-movie" data-movie-id="${esc(movie.id)}">Details</button>
                <button type="button" data-action="toggle-watchlist" data-movie-id="${esc(movie.id)}" data-title="${esc(movie.title)}">
                    ${inWL ? "&#8722; Liste" : "&#43; Liste"}
                </button>
            </div>
        </div>`;}

/* ── Portal tooltip system ── */
let _shelfTooltip = null;
let _hideTimer = null;

function attachShelfPopups() {
    _shelfTooltip = document.createElement("div");
    _shelfTooltip.className = "shelf-popup";
    _shelfTooltip.setAttribute("role", "tooltip");
    document.body.appendChild(_shelfTooltip);
    _shelfTooltip.addEventListener("mouseenter", () => clearTimeout(_hideTimer));
    _shelfTooltip.addEventListener("mouseleave", _scheduleHide);
}

function _scheduleHide() {
    _hideTimer = setTimeout(() => {
        if (_shelfTooltip) _shelfTooltip.classList.remove("popup-visible");
    }, 80);
}

function _showTooltip(book) {
    if (!_shelfTooltip) return;
    clearTimeout(_hideTimer);
    const id = book.dataset.id;
    const movie = CATALOG.find(m => m.id === id);
    if (!movie) return;
    _shelfTooltip.innerHTML = buildTooltipHTML(movie);
    _positionTooltip(book);
    _shelfTooltip.classList.add("popup-visible");
}

function _positionTooltip(book) {
    const rect = book.getBoundingClientRect();
    const pw = 230;
    // force layout to measure height before showing
    _shelfTooltip.style.visibility = "hidden";
    _shelfTooltip.style.left = "0px";
    _shelfTooltip.style.top = "0px";
    const ph = _shelfTooltip.offsetHeight || 340;
    _shelfTooltip.style.visibility = "";

    // center horizontally over book, appear above
    let left = rect.left + rect.width / 2 - pw / 2;
    let top  = rect.top - ph - 16;

    // clamp to viewport
    if (left < 8) left = 8;
    if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
    if (top < 8) top = rect.bottom + 16; // flip below if no space above

    _shelfTooltip.style.left = left + "px";
    _shelfTooltip.style.top  = top  + "px";
}

function bindShelfBooks() {
    document.querySelectorAll(".shelf-book").forEach(book => {
        book.addEventListener("mouseenter", () => _showTooltip(book));
        book.addEventListener("mouseleave", _scheduleHide);
        book.addEventListener("focus",  () => _showTooltip(book));
        book.addEventListener("blur",   _scheduleHide);
    });
}

function renderCatalogShelf() {
    const host = document.getElementById("catalogShelf");
    if (!host) return;

    const groups = buildCatalogGroups(CATALOG);
    const visible = applyShelfFilters(groups);

    const countEl = document.getElementById("catalogCount");
    const total = visible.reduce((n, g) => n + g.movies.length, 0);
    if (countEl) countEl.textContent = `${total} Titel`;

    if (!visible.length) {
        host.innerHTML = '<p class="empty-note">Keine Treffer für diesen Filter.</p>';
        return;
    }

    host.innerHTML = visible.map(group => `
        <div class="shelf-group" style="--bg-img: url('${group.bgImage}')">
            <div class="shelf-group-inner">
                <div class="shelf-group-label">
                    <h3 class="shelf-group-name">${group.label}</h3>
                    <span class="shelf-group-meta">${group.movies.length} Titel</span>
                </div>
            </div>
            <div class="shelf-stage">
                <div class="shelf-scroll">
                    <div class="shelf-books">
                        ${group.movies.map(m => renderShelfBook(m)).join("")}
                    </div>
                </div>
            </div>
            <div class="shelf-plank"></div>
        </div>
    `).join("");

    bindShelfBooks();

    window.requestAnimationFrame(() => {
        host.querySelectorAll(".shelf-group").forEach((el, idx) => {
            setTimeout(() => el.classList.add("is-visible"), idx * 55);
        });
    });
}

// legacy alias kept for backward compatibility
function renderCatalog() { renderCatalogShelf(); }

function getFilteredPool() {
    const type = document.getElementById("typeFilter")?.value || "all";
    const genre = document.getElementById("genreFilter")?.value || "all";
    const watchlistMode = document.getElementById("watchlistFilter")?.value || "all";

    return CATALOG.filter((item) => {
        if (type !== "all" && item.type !== type) return false;
        if (genre !== "all" && item.genre !== genre) return false;
        if (watchlistMode === "watchlist" && !isInWatchlist(item.id)) return false;
        if (watchlistMode === "not-watchlist" && isInWatchlist(item.id)) return false;
        return true;
    });
}

function renderRoulettePick(movie) {
    const box = document.getElementById("randomFilmResult");
    if (!box) return;

    if (!movie) {
        box.innerHTML = '<p class="result-placeholder">Keine Treffer mit den aktuellen Filtern.</p>';
        return;
    }

    box.innerHTML = `
        <div class="result-card">
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="result-meta">
                <h4>${movie.title}</h4>
                <p>${movie.description}</p>
                <div class="mini-actions">
                    <button type="button" data-action="roulette-open">Details</button>
                    <button type="button" data-action="roulette-watchlist">${isInWatchlist(movie.id) ? "Aus Watchlist" : "Zur Watchlist"}</button>
                </div>
            </div>
        </div>
    `;
}

function runRoulette() {
    const box = document.getElementById("randomFilmResult");
    if (!box) return;

    const pool = getFilteredPool();
    box.classList.add("is-loading");

    setTimeout(() => {
        box.classList.remove("is-loading");
        if (!pool.length) {
            appState.roulettePick = null;
            renderRoulettePick(null);
            return;
        }

        const pick = pool[Math.floor(Math.random() * pool.length)];
        appState.roulettePick = pick;
        renderRoulettePick(pick);
    }, 750);
}

function findMovieById(movieId) {
    const direct = CATALOG.find((movie) => movie.id === movieId);
    if (direct) return direct;

    for (const franchise of FRANCHISES) {
        const part = franchise.parts.find((item) => item.id === movieId);
        if (part) {
            return {
                id: part.id,
                title: `${franchise.title}: ${part.title}`,
                poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
                description: `Teil aus ${franchise.title}`,
                genre: "franchise",
                type: "movie",
                communityRating: part.communityRating
            };
        }
    }

    return null;
}

function openMovie(movieId) {
    const movie = findMovieById(movieId);
    if (!movie) return;

    const movieData = {
        id: movie.id,
        title: movie.title,
        cover: movie.poster,
        description: movie.description,
        genre: movie.genre,
        rating: movie.communityRating
    };

    localStorage.setItem("currentMovie", JSON.stringify(movieData));
    window.location.href = `movie-detail.html?id=${encodeURIComponent(movie.id)}`;
}

window.openMovie = openMovie;

function persistFranchiseState() {
    saveJSON(STORAGE_KEYS.franchiseProgress, appState.franchise);
}

function attachEvents() {
    document.getElementById("randomFilmBtn")?.addEventListener("click", runRoulette);

    document.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const { action, movieId, title } = button.dataset;

        if (action === "toggle-watchlist" && movieId) {
            toggleWatchlist(movieId, title || movieId);
        }

        if (action === "open-movie" && movieId) {
            openMovie(movieId);
        }

        if (action === "roulette-open" && appState.roulettePick) {
            openMovie(appState.roulettePick.id);
        }

        if (action === "roulette-watchlist" && appState.roulettePick) {
            toggleWatchlist(appState.roulettePick.id, appState.roulettePick.title);
            renderRoulettePick(appState.roulettePick);
        }
    });

    document.addEventListener("change", (event) => {
        const ratingSelect = event.target.closest('select[data-action="set-user-rating"]');
        if (ratingSelect) {
            const value = Number(ratingSelect.value || 0);
            appState.userRatings[ratingSelect.dataset.movieId] = value;
            saveJSON(STORAGE_KEYS.userRatings, appState.userRatings);
            renderStats();
            return;
        }

        const partItem = event.target.closest(".part-item");
        if (!partItem) return;

        const franchiseKey = partItem.dataset.franchise;
        const partId = partItem.dataset.part;
        const state = appState.franchise[franchiseKey][partId];

        if (event.target.classList.contains("part-check")) {
            state.seen = event.target.checked;
            if (state.seen) state.status = "completed";
        }

        if (event.target.classList.contains("part-select")) {
            state.status = event.target.value;
            if (state.status === "completed") state.seen = true;
        }

        if (event.target.classList.contains("part-rating")) {
            const value = Number(event.target.value || 0);
            state.rating = Math.max(0, Math.min(10, value));
        }

        persistFranchiseState();
        renderFranchiseGrid();
        renderStats();
        renderContinueWatching();
    });

    document.addEventListener("blur", (event) => {
        const partItem = event.target.closest(".part-item");
        if (!partItem || !event.target.classList.contains("part-comment")) return;

        const franchiseKey = partItem.dataset.franchise;
        const partId = partItem.dataset.part;
        appState.franchise[franchiseKey][partId].comment = event.target.value.trim();
        persistFranchiseState();
    }, true);
}

function attachAccordions() {
    document.querySelectorAll(".section-toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const drawer = document.getElementById(btn.dataset.target);
            const section = btn.closest(".accordion-section");
            if (!drawer) return;
            if (section.classList.contains("is-open")) {
                drawer.style.maxHeight = drawer.scrollHeight + "px";
                requestAnimationFrame(() => { drawer.style.maxHeight = "0"; });
                section.classList.remove("is-open");
            } else {
                section.classList.add("is-open");
                drawer.style.maxHeight = drawer.scrollHeight + "px";
                drawer.addEventListener("transitionend", () => {
                    if (section.classList.contains("is-open")) drawer.style.maxHeight = "none";
                }, { once: true });
            }
        });
    });
}

function attachParallaxHero() {
    const hero = document.getElementById("cineHero");
    const bg = document.getElementById("heroLayerBg");
    const mid = document.getElementById("heroLayerMid");
    if (!hero || !bg) return;
    hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        bg.style.transform = `translate(${x * -16}px, ${y * -10}px)`;
        if (mid) mid.style.transform = `translate(${x * -28}px, ${y * -18}px)`;
    });
}

function attachCatalogFilters() {
    document.getElementById("scrollToCatalog")?.addEventListener("click", () => {
        document.getElementById("catalogSection")?.scrollIntoView({ behavior: "smooth" });
    });
    document.querySelectorAll("[data-filter-type]").forEach(btn => {
        btn.addEventListener("click", () => {
            catalogFilterType = btn.dataset.filterType;
            document.querySelectorAll("[data-filter-type]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderCatalogShelf();
        });
    });
    document.querySelectorAll("[data-filter-genre]").forEach(btn => {
        btn.addEventListener("click", () => {
            catalogFilterGenre = btn.dataset.filterGenre;
            document.querySelectorAll("[data-filter-genre]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderCatalogShelf();
        });
    });
    document.getElementById("catalogSort")?.addEventListener("change", (e) => {
        catalogSort = e.target.value;
        renderCatalogShelf();
    });
}

function attachPageTransitions() {
    document.querySelectorAll('.topnav a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript')) return;
            e.preventDefault();
            document.body.classList.remove('page-ready');
            document.body.classList.add('page-exit');
            setTimeout(() => { window.location.href = href; }, 380);
        });
    });
}

function attachScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".shelf-group, .accordion-section, .catalog-section").forEach(el => {
        observer.observe(el);
    });
}

async function init() {
    CATALOG = await loadMoviesData();
    initState();
    renderStats();
    renderContinueWatching();
    renderFranchiseGrid();
    renderCatalog();
    attachShelfPopups();
    attachEvents();
    attachAccordions();
    attachParallaxHero();
    attachCatalogFilters();
    attachPageTransitions();
    attachScrollReveal();

    window.requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });
}

document.addEventListener("DOMContentLoaded", init);
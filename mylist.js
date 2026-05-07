const MYLIST_STATE = {
    movies: [],
    sortBy: "added",
    statusFilter: "all",
    genreFilter: "all"
};

function loadCollections() {
    const collections = new MovieCollections();
    return collections.getAllMovies().map((movie, index) => ({
        ...movie,
        _added: index + 1
    }));
}

function normalizeGenreLabel(genre) {
    return genre.charAt(0).toUpperCase() + genre.slice(1);
}

function statusLabel(status) {
    const map = {
        watching: "Schaue ich",
        completed: "Abgeschlossen",
        planned: "Geplant",
        paused: "Pausiert"
    };
    return map[status] || status;
}

function statusClass(status) {
    const map = {
        watching: "watching",
        completed: "completed",
        planned: "planned",
        paused: "paused"
    };
    return map[status] || "planned";
}

function starsFromRating(rating) {
    const full = Math.max(0, Math.min(5, Math.round(rating / 2)));
    return `${"★".repeat(full)}${"☆".repeat(5 - full)}`;
}

function getVisibleMovies() {
    const filtered = MYLIST_STATE.movies.filter((movie) => {
        const statusMatch = MYLIST_STATE.statusFilter === "all" || movie.status === MYLIST_STATE.statusFilter;
        const genreMatch = MYLIST_STATE.genreFilter === "all" || movie.genres.split(",").includes(MYLIST_STATE.genreFilter);
        return statusMatch && genreMatch;
    });

    return filtered.sort((a, b) => {
        switch (MYLIST_STATE.sortBy) {
            case "title":
                return a.title.localeCompare(b.title);
            case "year":
                return b.year - a.year;
            case "rating":
                return b.rating - a.rating;
            case "progress":
                return b.progress - a.progress;
            case "status": {
                const order = { watching: 1, paused: 2, planned: 3, completed: 4 };
                return (order[a.status] || 99) - (order[b.status] || 99);
            }
            case "added":
            default:
                return a._added - b._added;
        }
    });
}

function renderResultsInfo(visible) {
    const node = document.getElementById("resultsInfo");
    if (!node) return;

    const parts = [
        `${visible.length} von ${MYLIST_STATE.movies.length} Filmen sichtbar`,
        `Sortierung: ${MYLIST_STATE.sortBy}`
    ];

    if (MYLIST_STATE.statusFilter !== "all") {
        parts.push(`Status: ${statusLabel(MYLIST_STATE.statusFilter)}`);
    }
    if (MYLIST_STATE.genreFilter !== "all") {
        parts.push(`Genre: ${normalizeGenreLabel(MYLIST_STATE.genreFilter)}`);
    }

    node.textContent = parts.join(" • ");
}

function renderMovieList() {
    const container = document.getElementById("movieList");
    if (!container) return;

    const visible = getVisibleMovies();
    renderResultsInfo(visible);

    container.innerHTML = visible.map((movie) => `
        <article class="mylist-card" data-title="${movie.title}">
            <img src="${movie.poster}" alt="${movie.title}" class="mylist-card-cover">
            <div class="mylist-card-body">
                <h3>${movie.title}</h3>
                <p>${movie.year} • ${movie.duration} Min • ${movie.director}</p>
                <div class="mylist-tags">${movie.genres.split(",").map((genre) => `<span>${normalizeGenreLabel(genre)}</span>`).join("")}</div>
                <div class="mylist-rating-row">
                    <span>${starsFromRating(movie.rating)}</span>
                    <strong>${movie.rating}/10</strong>
                    <span class="status-chip ${statusClass(movie.status)}">${statusLabel(movie.status)}</span>
                </div>
                <div class="mylist-progress-row">
                    <div class="progress-track"><div class="progress-fill" style="width:${movie.progress}%"></div></div>
                    <span>${movie.progress}%</span>
                </div>
            </div>
        </article>
    `).join("");
}

function buildFranchiseOverview() {
    const franchiseGrid = document.getElementById("franchiseOverviewGrid");
    if (!franchiseGrid) return;

    const collections = new MovieCollections();
    const raw = collections.collections;

    const keys = Object.keys(raw);
    franchiseGrid.innerHTML = keys.map((key) => {
        const items = raw[key] || [];
        const seen = items.filter((movie) => movie.status === "completed").length;
        const progress = items.length ? Math.round((seen / items.length) * 100) : 0;

        return `
            <article class="my-franchise-card" data-key="${key}">
                <div class="my-franchise-head">
                    <h3>${key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</h3>
                    <span>${items.length} Teile</span>
                </div>
                <div class="my-franchise-progress">
                    <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
                    <strong>${progress}%</strong>
                </div>
                <div class="my-franchise-list">
                    ${items.slice(0, 5).map((movie) => `<button type="button" data-title="${movie.title}">${movie.title}</button>`).join("")}
                </div>
            </article>
        `;
    }).join("");

    franchiseGrid.querySelectorAll("button[data-title]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const title = btn.dataset.title;
            const target = document.querySelector(`.mylist-card[data-title="${CSS.escape(title)}"]`);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.add("spotlight");
            setTimeout(() => target.classList.remove("spotlight"), 1200);
        });
    });
}

function setActive(groupSelector, value) {
    document.querySelectorAll(groupSelector).forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.value === value);
    });
}

function bindControls() {
    document.querySelectorAll(".ctrl-btn[data-sort]").forEach((btn) => {
        btn.addEventListener("click", () => {
            MYLIST_STATE.sortBy = btn.dataset.sort;
            setActive(".ctrl-btn[data-sort]", btn.dataset.value);
            renderMovieList();
        });
    });

    document.querySelectorAll(".ctrl-btn[data-status]").forEach((btn) => {
        btn.addEventListener("click", () => {
            MYLIST_STATE.statusFilter = btn.dataset.status;
            setActive(".ctrl-btn[data-status]", btn.dataset.value);
            renderMovieList();
        });
    });

    document.querySelectorAll(".ctrl-btn[data-genre]").forEach((btn) => {
        btn.addEventListener("click", () => {
            MYLIST_STATE.genreFilter = btn.dataset.genre;
            setActive(".ctrl-btn[data-genre]", btn.dataset.value);
            renderMovieList();
        });
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

function initMyList() {
    MYLIST_STATE.movies = loadCollections();
    buildFranchiseOverview();
    bindControls();
    renderMovieList();
    attachPageTransitions();

    window.requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });
}

document.addEventListener("DOMContentLoaded", initMyList);

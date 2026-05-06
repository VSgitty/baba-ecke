// Categories data and functionality
const categories = [
    {
        id: 'horror',
        name: 'Horror',
        icon: '🎭',
        description: 'Gruselige Filme für Nervenkitzel',
        class: 'category-horror'
    },
    {
        id: 'action',
        name: 'Action',
        icon: '💥',
        description: 'Adrenalingeladene Action-Filme',
        class: 'category-action'
    },
    {
        id: 'comedy',
        name: 'Comedy',
        icon: '😂',
        description: 'Lustige Filme für gute Laune',
        class: 'category-comedy'
    },
    {
        id: 'scifi',
        name: 'Sci-Fi',
        icon: '🚀',
        description: 'Futuristische Science Fiction',
        class: 'category-scifi'
    },
    {
        id: 'drama',
        name: 'Drama',
        icon: '🎬',
        description: 'Emotionale und tiefgreifende Geschichten',
        class: 'category-drama'
    },
    {
        id: 'thriller',
        name: 'Thriller',
        icon: '🔍',
        description: 'Spannende und aufregende Filme',
        class: 'category-thriller'
    }
];

// Function to create categories section
function createCategoriesSection() {
    const categoriesHTML = `
        <section class="categories-section">
            <h2 class="categories-title">Film Kategorien</h2>
            <div class="categories-container">
                ${categories.map(category => `
                    <div class="category-card ${category.class}" onclick="openCategory('${category.id}')">
                        <div class="category-content">
                            <div class="category-icon">${category.icon}</div>
                            <div class="category-name">${category.name}</div>
                            <div class="category-description">${category.description}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    
    return categoriesHTML;
}

// Function to create categories section
function createCategoriesSection() {
    const categoriesHTML = `
        <section class="categories-section">
            <h2 class="categories-title">Film Kategorien</h2>
            <div class="categories-container">
                ${categories.map(category => `
                    <div class="category-card ${category.class}" onclick="openCategory('${category.id}')">
                        <div class="category-content">
                            <div class="category-icon">${category.icon}</div>
                            <div class="category-name">${category.name}</div>
                            <div class="category-description">${category.description}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    
    return categoriesHTML;
}

// Function to open category page
function openCategory(categoryId) {
    window.location.href = `category.html?category=${categoryId}`;
}

// Function to add categories to existing page
function addCategoriesToPage() {
    // Find the main container or footer and insert categories before it
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.insertAdjacentHTML('beforebegin', createCategoriesSection());
    } else {
        // If no footer, append to body
        document.body.insertAdjacentHTML('beforeend', createCategoriesSection());
    }
}

// Auto-load categories when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only add categories if we're on the main page (not stream.html or category.html)
    if (!window.location.pathname.includes('stream.html') && !window.location.pathname.includes('category.html')) {
        addCategoriesToPage();
    }
});

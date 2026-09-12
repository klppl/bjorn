import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const THEME_DIR = __dirname;

const PORT = process.env.PORT || 3000;

// Mock Ghost Site & Data
const site = {
    title: "Björn",
    description: "A minimal, text-first Bear Blog theme for Ghost.",
    url: "/",
    locale: "en",
    logo: null,
    navigation: [
        { label: "Home", url: "/", slug: "home" },
        { label: "About", url: "/about/", slug: "about" },
        { label: "Tags", url: "/tag/minimalism/", slug: "tags" }
    ],
    secondary_navigation: [
        { label: "Ghost.org", url: "https://ghost.org" },
        { label: "Bear Blog", url: "https://bearblog.dev" },
        { label: "GitHub", url: "https://github.com" }
    ]
};

const tags = [
    { name: "minimalism", slug: "minimalism", url: "/tag/minimalism/", description: "Articles focused on digital minimalism and lightweight web design." },
    { name: "ghost", slug: "ghost", url: "/tag/ghost/", description: "Tips and themes for the Ghost publishing platform." },
    { name: "web", slug: "web", url: "/tag/web/", description: "Building for the open, accessible web." },
    { name: "design", slug: "design", url: "/tag/design/", description: "Clean typographic systems and content-first UI." },
    { name: "guide", slug: "guide", url: "/tag/guide/", description: "Practical step-by-step walkthroughs." }
];

const author = {
    name: "Alex",
    slug: "alex",
    url: "/author/alex/",
    bio: "Minimalist writer, open-source enthusiast, and typography lover.",
    website: "https://example.com"
};

const posts = [
    {
        title: "Welcome to Björn: A Minimal Bear Blog Theme for Ghost",
        slug: "welcome-to-bjorn",
        url: "/welcome-to-bjorn/",
        date: "12 Sep, 2026",
        datetime: "2026-09-12",
        reading_time: "2 min read",
        tags: [tags[0], tags[1]],
        feature_image: null,
        content: `
            <p>Welcome to <strong>Björn</strong>! This theme brings the beloved, distraction-free aesthetic of <a href="https://bearblog.dev">Bear Blog</a> directly to <strong>Ghost CMS</strong>.</p>
            
            <h2>Why another theme?</h2>
            <p>Most modern websites suffer from an obesity crisis. Heavy JavaScript bundles, tracking pixels, layout shifts, and endless popups create a sluggish reading experience. Björn takes the exact opposite approach:</p>
            
            <ul>
                <li><strong>Tiny CSS footprint:</strong> The entire stylesheet is under 6KB minified.</li>
                <li><strong>Zero heavy JavaScript:</strong> Pure HTML and CSS for lightning-fast page loads.</li>
                <li><strong>Automatic Dark Mode:</strong> Seamlessly switches based on your system preference (<code>prefers-color-scheme: dark</code>).</li>
                <li><strong>Full Ghost 5.x compatibility:</strong> Works with Ghost's native card system, image sizes, and dynamic helpers.</li>
            </ul>

            <div class="kg-callout-card">
                <div class="kg-callout-emoji">ʕ•ᴥ•ʔ</div>
                <div class="kg-callout-text">
                    <strong>Bear Fact:</strong> Björn is Swedish and Norse for <em>bear</em>. Just like its Hugo counterpart, it stays loyal to Herman Martinus's original vision.
                </div>
            </div>

            <h2>Typographic Hierarchy</h2>
            <p>Björn uses standard system <code>Verdana</code> for body text and headers, with monospace styling for dates, tags, and code blocks. This guarantees crisp rendering on any device without downloading external web fonts.</p>

            <blockquote>
                "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."<br>
                — Antoine de Saint-Exupéry
            </blockquote>

            <h2>Code & Technical Content</h2>
            <p>Inline code looks like <code>var(--width: 720px)</code>, and multi-line blocks are formatted with clean horizontal scrolling:</p>

            <pre><code>// Example Ghost config in package.json
{
  "name": "bjorn",
  "version": "1.0.0",
  "config": {
    "posts_per_page": 15,
    "card_assets": true
  }
}</code></pre>

            <h2>Ghost Bookmark Cards</h2>
            <figure class="kg-card kg-bookmark-card">
                <a class="kg-bookmark-container" href="https://bearblog.dev" target="_blank" rel="noopener">
                    <div class="kg-bookmark-content">
                        <div class="kg-bookmark-title">Bear Blog — Free, no-nonsense, super-fast blogging</div>
                        <div class="kg-bookmark-description">Publish your ideas without bloated themes, tracking scripts, or complicated setups. Fast for readers and painless for writers.</div>
                        <div class="kg-bookmark-metadata">
                            <span class="kg-bookmark-author">Herman Martinus</span>
                        </div>
                    </div>
                </a>
            </figure>

            <hr>

            <p>Feel free to customize the colors or navigation links to make Björn your own!</p>
        `
    },
    {
        title: "The Website Obesity Crisis and the Case for Text",
        slug: "website-obesity-crisis",
        url: "/website-obesity-crisis/",
        date: "08 Sep, 2026",
        datetime: "2026-09-08",
        reading_time: "3 min read",
        tags: [tags[0], tags[2]],
        content: `
            <p>The average web page today exceeds 2.5 megabytes. For an article consisting of 800 words of plain text (approx. 5 kilobytes), that represents a 500x inflation ratio.</p>
            <h2>Returning to First Principles</h2>
            <p>Readers come for your writing, your insights, and your story. When you strip away sticky navbars, modal dialogues, and analytics scripts, what remains is the intimacy of words on a page.</p>
            <p>Björn delivers the speed of the early web paired with the modern publishing power of Ghost.</p>
        `
    },
    {
        title: "Typography and Spacing: The Elegance of Verdana",
        slug: "typography-in-verdana",
        url: "/typography-in-verdana/",
        date: "28 Aug, 2026",
        datetime: "2026-08-28",
        reading_time: "1 min read",
        tags: [tags[3]],
        content: `
            <p>Designed by Matthew Carter for Microsoft in 1996, Verdana was built specifically for low-resolution screens. Its wide proportions and generous x-height make it exceptionally legible at almost any size.</p>
            <p>By relying on system fonts, Björn avoids font layout shifts (CLS) and saves HTTP requests.</p>
        `
    },
    {
        title: "A Match Made in Heaven: Ghost CMS and Bear Blog",
        slug: "a-match-made-in-heaven",
        url: "/a-match-made-in-heaven/",
        date: "15 Aug, 2026",
        datetime: "2026-08-15",
        reading_time: "4 min read",
        tags: [tags[1], tags[2]],
        content: `
            <p>Ghost gives you the best-in-class markdown editor, newsletter delivery, scheduled publishing, and membership management. Pairing it with a Bear Blog theme gives you the ultimate minimalist publication.</p>
        `
    },
    {
        title: "Customizing Accent Colors and Dark Mode",
        slug: "customizing-colors",
        url: "/customizing-colors/",
        date: "01 Aug, 2026",
        datetime: "2026-08-01",
        reading_time: "2 min read",
        tags: [tags[4]],
        content: `
            <p>You can change the accent color in <code>assets/css/index.css</code> with a single line:</p>
            <pre><code>:root {
  --link-color: #3273dc; /* Your favorite color */
}</code></pre>
            <p>In dark mode, <code>--link-color</code> defaults to a softer <code>#8cc2dd</code> for reduced eye strain.</p>
        `
    }
];

const aboutPage = {
    title: "About",
    content: `
        <p>This is a demonstration of a static page rendered by Ghost CMS using the <strong>Björn</strong> theme's <code>page.hbs</code> template.</p>
        <h2>About This Theme</h2>
        <p>Björn is inspired by the iconic Bear Blog theme originally created for Hugo and Jekyll by Herman Martinus and Jan Raasch. It has been faithfully ported to Ghost with complete Handlebars templating and Ghost 5.x compatibility.</p>
        <p>Built with simplicity, readability, and speed in mind.</p>
    `
};

// Simple Handlebars Template Engine for Theme Preview
function renderTemplate(templateName, context) {
    let templateFile = path.join(THEME_DIR, `${templateName}.hbs`);
    if (!fs.existsSync(templateFile)) {
        templateFile = path.join(THEME_DIR, 'error-404.hbs');
    }
    let content = fs.readFileSync(templateFile, 'utf8');

    // Handle partials
    const partialCard = fs.readFileSync(path.join(THEME_DIR, 'partials/card.hbs'), 'utf8');
    const partialNav = fs.readFileSync(path.join(THEME_DIR, 'partials/navigation.hbs'), 'utf8');
    const partialPagination = fs.readFileSync(path.join(THEME_DIR, 'partials/pagination.hbs'), 'utf8');

    // Check layout inheritance
    const usesDefault = content.includes('{{!< default}}');
    content = content.replace(/\{\{!<\s*default\}\}/g, '');

    // Render Index / Post Loop
    if (templateName === 'index' || templateName === 'tag' || templateName === 'author') {
        const postsList = context.posts || posts;
        let cardsHtml = '';
        postsList.forEach(p => {
            let cardHtml = partialCard
                .replace(/\{\{url\}\}/g, p.url)
                .replace(/\{\{title\}\}/g, p.title)
                .replace(/\{\{date format="YYYY-MM-DD"\}\}/g, p.datetime)
                .replace(/\{\{date format="DD MMM, YYYY"\}\}/g, p.date);
            cardsHtml += cardHtml + '\n';
        });

        content = content.replace(/\{\{#foreach posts\}\}[\s\S]*?\{\{\/foreach\}\}/g, cardsHtml);

        // Tags helper
        let tagsHtml = '<div class="tags-list">';
        tags.forEach(t => {
            tagsHtml += `<a href="${t.url}">#${t.name}</a> `;
        });
        tagsHtml += '</div>';
        content = content.replace(/\{\{#get "tags"[\s\S]*?\{\{\/get\}\}/g, tagsHtml);

        // Tag context in tag.hbs
        if (context.tag) {
            content = content.replace(/\{\{#tag\}\}([\s\S]*?)\{\{\/tag\}\}/g, (match, p1) => {
                return p1
                    .replace(/\{\{name\}\}/g, context.tag.name)
                    .replace(/\{\{description\}\}/g, context.tag.description || '')
                    .replace(/\{\{#if description\}\}([\s\S]*?)\{\{\/if\}\}/g, context.tag.description ? `$1` : '');
            });
        }

        // Author context in author.hbs
        if (context.author) {
            content = content.replace(/\{\{#author\}\}([\s\S]*?)\{\{\/author\}\}/g, (match, p1) => {
                return p1
                    .replace(/\{\{name\}\}/g, context.author.name)
                    .replace(/\{\{bio\}\}/g, context.author.bio || '')
                    .replace(/\{\{website\}\}/g, context.author.website || '')
                    .replace(/\{\{#if bio\}\}([\s\S]*?)\{\{\/if\}\}/g, context.author.bio ? `$1` : '')
                    .replace(/\{\{#if website\}\}([\s\S]*?)\{\{\/if\}\}/g, context.author.website ? `$1` : '');
            });
        }

        // Pagination
        const pagHtml = partialPagination
            .replace(/\{\{page\}\}/g, '1')
            .replace(/\{\{pages\}\}/g, '1')
            .replace(/\{\{#if prev\}\}[\s\S]*?\{\{\/if\}\}/g, '')
            .replace(/\{\{#if next\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        content = content.replace(/\{\{pagination\}\}/g, pagHtml);
    }

    // Render Single Post
    if (templateName === 'post') {
        const p = context.post;
        content = content.replace(/\{\{#post\}\}([\s\S]*?)\{\{\/post\}\}/g, '$1');
        content = content.replace(/\{\{title\}\}/g, p.title);
        content = content.replace(/\{\{date format="YYYY-MM-DD"\}\}/g, p.datetime);
        content = content.replace(/\{\{date format="DD MMM, YYYY"\}\}/g, p.date);
        content = content.replace(/\{\{reading_time\}\}/g, p.reading_time);
        content = content.replace(/\{\{content\}\}/g, p.content);
        content = content.replace(/\{\{post_class\}\}/g, 'post');

        // Post Tags
        let postTagsHtml = '';
        if (p.tags && p.tags.length > 0) {
            p.tags.forEach(t => {
                postTagsHtml += `<a href="${t.url}">#${t.name}</a> `;
            });
            content = content.replace(/\{\{#if tags\}\}[\s\S]*?\{\{\/if\}\}/g, `<div class="tags-list">${postTagsHtml}</div>`);
        } else {
            content = content.replace(/\{\{#if tags\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        // Feature Image
        content = content.replace(/\{\{#if feature_image\}\}[\s\S]*?<\/figure>\s*\{\{\/if\}\}/g, '');

        // Post Navigator
        const currentIndex = posts.findIndex(x => x.slug === p.slug);
        const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
        const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

        if (prev) {
            content = content.replace(/\{\{#prev_post\}\}([\s\S]*?)\{\{\/prev_post\}\}/g, `<a href="${prev.url}">&laquo; ${prev.title}</a>`);
        } else {
            content = content.replace(/\{\{#prev_post\}\}[\s\S]*?\{\{\/prev_post\}\}/g, `<span style="opacity: 0.4">&laquo; Previous Post</span>`);
        }

        if (next) {
            content = content.replace(/\{\{#next_post\}\}([\s\S]*?)\{\{\/next_post\}\}/g, `<a href="${next.url}">${next.title} &raquo;</a>`);
        } else {
            content = content.replace(/\{\{#next_post\}\}[\s\S]*?\{\{\/next_post\}\}/g, `<span style="opacity: 0.4">Next Post &raquo;</span>`);
        }

        content = content.replace(/\{\{#if comments\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }

    // Render Page
    if (templateName === 'page') {
        const p = context.page;
        content = content.replace(/\{\{#post\}\}([\s\S]*?)\{\{\/post\}\}/g, '$1');
        content = content.replace(/\{\{title\}\}/g, p.title);
        content = content.replace(/\{\{content\}\}/g, p.content);
        content = content.replace(/\{\{post_class\}\}/g, 'page');
        content = content.replace(/\{\{#if feature_image\}\}[\s\S]*?<\/figure>\s*\{\{\/if\}\}/g, '');
    }

    // Clean up unresolved conditionals
    content = content.replace(/\{\{#if @site\.description\}\}([\s\S]*?)\{\{\/if\}\}/g, site.description ? `<p>${site.description}</p>` : '');
    content = content.replace(/\{\{@site\.url\}\}/g, site.url);

    // If using default.hbs layout
    if (usesDefault) {
        let defaultLayout = fs.readFileSync(path.join(THEME_DIR, 'default.hbs'), 'utf8');

        // Nav
        let primaryNavHtml = '';
        site.navigation.forEach(n => {
            const isCurrent = context.currentPath === n.url;
            primaryNavHtml += `<a href="${n.url}" class="${isCurrent ? 'nav-current' : ''}">${n.label}</a> `;
        });

        let secondaryNavHtml = '';
        site.secondary_navigation.forEach(n => {
            secondaryNavHtml += `<a href="${n.url}" target="_blank" rel="noopener">${n.label}</a> `;
        });

        defaultLayout = defaultLayout.replace(/\{\{@site\.locale\}\}/g, site.locale);
        defaultLayout = defaultLayout.replace(/\{\{meta_title\}\}/g, context.title ? `${context.title} — ${site.title}` : site.title);
        defaultLayout = defaultLayout.replace(/\{\{asset "built\/index\.css"\}\}/g, '/assets/built/index.css');
        defaultLayout = defaultLayout.replace(/\{\{ghost_head\}\}/g, '<meta name="generator" content="Ghost 5.0 (Björn Theme Local Preview)" />');
        defaultLayout = defaultLayout.replace(/\{\{ghost_foot\}\}/g, '');
        defaultLayout = defaultLayout.replace(/\{\{body_class\}\}/g, context.bodyClass || 'home-template');
        defaultLayout = defaultLayout.replace(/\{\{@site\.url\}\}/g, site.url);
        defaultLayout = defaultLayout.replace(/\{\{#if @site\.logo\}\}[\s\S]*?\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g, `<h2>${site.title}</h2>`);
        defaultLayout = defaultLayout.replace(/\{\{navigation\}\}/g, primaryNavHtml);
        defaultLayout = defaultLayout.replace(/\{\{#if @site\.secondary_navigation\}\}([\s\S]*?)\{\{\/if\}\}/g, `$1`);
        defaultLayout = defaultLayout.replace(/\{\{navigation type="secondary"\}\}/g, secondaryNavHtml);

        defaultLayout = defaultLayout.replace(/https:\/\/github\.com\/janraasch\/hugo-bearblog/g, 'https://github.com/klppl/bjorn');
        // Insert body
        return defaultLayout.replace(/\{\{\{body\}\}\}/g, content);
    }

    return content;
}

// HTTP Server
const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];

    // Static Assets
    if (urlPath.startsWith('/assets/')) {
        const filePath = path.join(THEME_DIR, urlPath);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath);
            const contentType = ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : 'text/plain';
            res.writeHead(200, { 'Content-Type': contentType });
            return res.end(fs.readFileSync(filePath));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Asset not found');
        }
    }

    // Home / Index
    if (urlPath === '/' || urlPath === '/index.html') {
        const html = renderTemplate('index', { currentPath: '/', bodyClass: 'home-template' });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
    }

    // About Static Page
    if (urlPath === '/about/' || urlPath === '/about') {
        const html = renderTemplate('page', { page: aboutPage, currentPath: '/about/', title: 'About', bodyClass: 'page-template page-about' });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
    }

    // Tag Archive
    const tagMatch = urlPath.match(/^\/tag\/([a-zA-Z0-9_-]+)\/?$/);
    if (tagMatch) {
        const tagSlug = tagMatch[1];
        const matchedTag = tags.find(t => t.slug === tagSlug) || { name: tagSlug, slug: tagSlug, description: `Posts tagged with #${tagSlug}` };
        const filteredPosts = posts.filter(p => p.tags && p.tags.some(t => t.slug === tagSlug));
        const html = renderTemplate('tag', {
            tag: matchedTag,
            posts: filteredPosts.length > 0 ? filteredPosts : posts.slice(0, 2),
            currentPath: urlPath,
            title: `#${matchedTag.name}`,
            bodyClass: 'tag-template'
        });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
    }

    // Author Archive
    const authorMatch = urlPath.match(/^\/author\/([a-zA-Z0-9_-]+)\/?$/);
    if (authorMatch) {
        const html = renderTemplate('author', {
            author: author,
            posts: posts,
            currentPath: urlPath,
            title: `Posts by ${author.name}`,
            bodyClass: 'author-template'
        });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
    }

    // Post Pages
    const postSlug = urlPath.replace(/^\/|\/$/g, '');
    const matchedPost = posts.find(p => p.slug === postSlug);
    if (matchedPost) {
        const html = renderTemplate('post', {
            post: matchedPost,
            currentPath: urlPath,
            title: matchedPost.title,
            bodyClass: 'post-template'
        });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
    }

    // 404 Fallback
    const notFoundHtml = renderTemplate('error-404', { title: '404 - Page not found' });
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(notFoundHtml);
});

server.listen(PORT, () => {
    console.log(`\n🐻 Björn Theme Preview Server running at:`);
    console.log(`👉 http://localhost:${PORT}/\n`);
    console.log(`Available preview URLs:`);
    console.log(` • Homepage: http://localhost:${PORT}/`);
    console.log(` • Single Post: http://localhost:${PORT}/welcome-to-bjorn/`);
    console.log(` • Static Page: http://localhost:${PORT}/about/`);
    console.log(` • Tag Archive: http://localhost:${PORT}/tag/minimalism/`);
    console.log(` • Author Archive: http://localhost:${PORT}/author/alex/\n`);
});

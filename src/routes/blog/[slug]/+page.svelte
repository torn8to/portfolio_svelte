<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />
<script>
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import markdownItKatex from 'markdown-it-katex';
	
	export let data;
	const article = data.post;
	let md;
	let markdownContent = '';
	let rawContent = '';
	
	// Helper function to handle tags that could be arrays or strings
	function formatTags(tags) {
		if (Array.isArray(tags)) {
			return tags;
		} else if (typeof tags === 'string') {
			return tags.split(',').map(tag => tag.trim());
		}
		return [];
	}

	onMount(async () => {
		console.log('Article data:', article);
		
		// Create markdown-it instance with KaTeX support
		md = new MarkdownIt({
			html: true,
			linkify: true,
			typographer: true
		});
		
		// Add KaTeX support - this is critical for math rendering
		md.use(markdownItKatex);
		console.log('MarkdownIt initialized with KaTeX plugin');
		
		if (article && article.slug) {
			// Dynamically import the markdown file
			try {
				// This is the key part - dynamically import the markdown file
				const module = await import(`../../../content/blog/${article.slug}.md`);
				console.log('Markdown module:', module);
				
				if (module.html) {
					// If the vite-plugin-markdown has pre-rendered HTML, use it
					// BUT we need to re-render it with KaTeX since the plugin might not use KaTeX
					if (module.default || module.raw) {
						rawContent = module.default || module.raw;
						markdownContent = md.render(rawContent);
						console.log('Re-rendered markdown with KaTeX:', markdownContent);
					} else {
						markdownContent = module.html;
						console.log('Using pre-rendered HTML:', markdownContent);
					}
				} else if (module.default) {
					// Otherwise use the raw content and render it with KaTeX
					rawContent = module.default;
					console.log('Raw markdown content:', rawContent);
					markdownContent = md.render(rawContent);
					console.log('Rendered markdown with KaTeX:', markdownContent);
				} else {
					console.error('No content found in markdown module');
					// Fallback to description
					rawContent = article.description;
					markdownContent = md.render(article.description);
				}
			} catch (error) {
				console.error('Error importing markdown:', error);
				// Fallback to description
				rawContent = article.description;
				markdownContent = md.render(article.description);
			}
		}
	});
</script>

<svelte:head>
	<title>{article?.title || 'Blog Post'} — Nathan Rogers</title>
	<!-- Ensure KaTeX CSS is properly loaded -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0" crossorigin="anonymous">
</svelte:head>

<div class="article-container">
	{#if article}
		<div class="article">
			<h1>{article.title}</h1>
			<div class="metadata">
				{#if article.date}
					<span class="date">{new Date(article.date).toLocaleDateString()}</span>
				{/if}
				{#if article.tags || article.technologies}
					<div class="tags">
						{#each formatTags(article.tags || article.technologies) as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>
			
			<div class="markdown-content">
				{#if markdownContent}
					{@html markdownContent}
				{:else}
					<p>{article.description}</p>
				{/if}
			</div>
			
			<a href="/blog" class="back-link">
				<div class="button">← Back to Articles</div>
			</a>
		</div>
	{:else}
		<div class="not-found">
			<h1>Article Not Found</h1>
			<p>The article you're looking for doesn't exist or has been removed.</p>
			<a href="/blog" class="back-link">
				<div class="button">← Back to Articles</div>
			</a>
		</div>
	{/if}
</div>

<style>
	.article-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}
	
	.article {
		background: #111;
		padding: 2rem;
		border-radius: 25px;
		color: white;
	}
	
	h1 {
		font-size: 2.5rem;
		margin-top: 0;
		margin-bottom: 1rem;
	}
	
	.metadata {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
		color: #708090;
		font-size: 0.9rem;
	}
	
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.tag {
		background: #222;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}
	
	.markdown-content {
		color: #d0d0d0;
		line-height: 1.6;
		margin-bottom: 2rem;
	}
	
	.markdown-content :global(h1),
	.markdown-content :global(h2),
	.markdown-content :global(h3),
	.markdown-content :global(h4) {
		color: white;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}
	
	.markdown-content :global(p) {
		margin-bottom: 1rem;
	}
	
	.markdown-content :global(ul),
	.markdown-content :global(ol) {
		margin-left: 1.5rem;
		margin-bottom: 1rem;
	}
	
	.markdown-content :global(code) {
		background-color: #222;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: monospace;
	}
	
	.markdown-content :global(pre) {
		background-color: #222;
		padding: 1rem;
		border-radius: 5px;
		overflow-x: auto;
		margin-bottom: 1rem;
	}
	
	.markdown-content :global(a) {
		color: #4dabf7;
		text-decoration: underline;
	}
	
	.markdown-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 5px;
	}
	
	/* KaTeX styling */
	.markdown-content :global(.katex) {
		font-size: 1.1em;
	}
	
	.markdown-content :global(.katex-display) {
		margin: 1.5rem 0;
		overflow-x: auto;
		overflow-y: hidden;
	}
	
	.button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: white;
		border: 2px solid white;
		padding: 10px 20px;
		border-radius: 5px;
		transition: background-color 0.2s ease;
		margin-top: 1rem;
	}
	
	.button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
	
	.not-found {
		text-align: center;
		padding: 3rem 1rem;
		color: white;
	}
	
	a {
		text-decoration: none;
	}
</style>

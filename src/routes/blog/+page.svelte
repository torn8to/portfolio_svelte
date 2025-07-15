<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0" crossorigin="anonymous">
<script>
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import markdownItKatex from 'markdown-it-katex';
	import posts from '$lib/Posts';
	
	let md;
	let filteredArticles = posts;
	let renderedDescriptions = {};

	// Helper function to handle tags that could be arrays or strings
	function formatTags(tags) {
		if (Array.isArray(tags)) {
			return tags.join(', ');
		} else if (typeof tags === 'string') {
			return tags;
		}
		return '';
	}

	onMount(() => {
		md = new MarkdownIt({
			html: true,
			linkify: true,
			typographer: true
		});
		
		// Add KaTeX support
		md.use(markdownItKatex);
		console.log('MarkdownIt initialized with KaTeX for blog index');
		
		// Pre-render all descriptions
		filteredArticles.forEach(article => {
			if (article.description) {
				console.log(`Rendering description for ${article.id}:`, article.description);
				renderedDescriptions[article.id] = md.render(article.description);
				console.log(`Rendered result for ${article.id}:`, renderedDescriptions[article.id]);
			}
		});
	});
</script>

<svelte:head>
	<title>Nathan Rogers — Blog</title>
</svelte:head>

<div class="articlesContainer">
	<div class="articles">
		<h1>Articles</h1>
		{#if filteredArticles && filteredArticles.length > 0}
			{#each filteredArticles as article}
				<div class="article">
					<div class="header">
						<h2>
							{article.title}
						</h2>
						<div>Tags: {formatTags(article.tags || article.technologies)}</div>
					</div>
					{#if article.description}
						<div class="markdown-content">
							{#if renderedDescriptions[article.id]}
								{@html renderedDescriptions[article.id]}
							{:else}
								<p>{article.description}</p>
							{/if}
						</div>
					{:else}
						<p></p>
					{/if}

					<a
						href={article.slug ? `/blog/${article.slug}` : article.link}
						target={!article.slug ? '_blank' : '_self'}
					>
						<div class="button">Read Article =></div>
					</a>
				</div>
			{/each}
		{:else}
			<div>No Articles</div>
		{/if}
	</div>
</div>

<style>
	.articlesContainer {
		width: 100%;
		max-width: 900px;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		text-align: center;
	}

	a {
		text-decoration: none;
	}

	.articlesContainer .articles {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 40px;
		margin-top: 30px;
	}

	h2 {
		display: flex;
	}

	.articles > h1 {
		font-weight: 700;
		text-align: start;
		margin: 0;
		font-size: 36px;
	}

	.article {
		text-align: start;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		color: white;
		background: #111;
		padding: 2rem;
		width: 100%;
		border-radius: 5px;
		transition: transform 0.2s ease-in-out;
		border-radius: 25px;
	}

	.article p {
		font-weight: 100;
		color: #708090;
	}

	.articles {
		width: 100%;
		margin: 50px auto;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr;
	}

	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		border: 2px solid white;
		padding: 10px;
	}

	@media (min-width: 900px) {
		.articlesContainer {
			padding: 0;
		}
		.articles > h1 {
			font-size: 48px;
			margin: 0 0 50px 0;
		}

		.articles {
			grid-template-columns: 1fr;
		}

		.articles .article {
			min-height: 200px;
		}

		.button {
			max-width: 200px;
		}
	}

	@media (min-width: 600px) {
		.articles {
			grid-template-columns: 1fr;
		}
	}

	.markdown-content {
		color: #d0d0d0;
		line-height: 1.6;
		margin-bottom: 1.5rem;
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
	
	/* KaTeX styling */
	.markdown-content :global(.katex) {
		font-size: 1.1em;
	}
	
	.markdown-content :global(.katex-display) {
		margin: 1.5rem 0;
		overflow-x: auto;
		overflow-y: hidden;
	}
</style>

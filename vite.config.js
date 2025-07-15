import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { plugin as markdown } from 'vite-plugin-markdown';
import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';

// Create markdown-it instance with KaTeX support
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(markdownItKatex);

export default defineConfig({
	plugins: [
		sveltekit(),
		markdown({ 
			mode: ['html', 'toc', 'raw'],
			markdownIt: md
		})
	],
	optimizeDeps: {
		include: ['markdown-it', 'markdown-it-katex']
	}
}); 
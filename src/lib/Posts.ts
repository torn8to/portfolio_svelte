const posts = [
	{
		id: 'sample-post',
		title: 'Sparse Voxel HashMap ICP',
		technologies: ['embedded programming', 'DMA', ],
		description:'A fast hashmap implementation that uses a voxel hashmap enabling enabling quick lookup times for smaller hashmaps',
		url: "adc-fast.md",
		slug: 'adc-fast',
		markdownPath: 'src/content/blog/adc-fast.md'
	},
	{
		id: 'second-post',
		title: 'High frequency Force sensor',
		technologies: 'C, javasscript, networking',
		description: 'Leveraging direct memory access on the stm32H747XI and leveraging the dsp\
		and arm simd operations for effifcient type conversions from adc reading to force reading and\
		display the data in manner that is human intereperetible',
		url: "second-post.md",
		slug: 'second-post',
		markdownPath: 'src/content/blog/second-post.md'
	},
	{
		id: 'second-post',
		title: 'Advanced Math with KaTeX',
		technologies: 'math, katex, equations',
		description: 'This post demonstrates more advanced mathematical notation using KaTeX in your Svelte blog.',
		url: "second-post.md",
		slug: 'second-post',
		markdownPath: 'src/content/blog/second-post.md'
	}
];

export default posts;

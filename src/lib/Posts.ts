const posts = [
	{
		id: 'sample-post',
		title: 'Sparse Voxel HashMap ICP',
		technologies: ['cpp', 'tbb', 'ROS2'],
		description:
			'Sparse VoxelHasmap is data structuree behind basing the icp algorithim as a way to lookup provide quickest lookup times.  ITs performance drops off when reaching around 800,000 points but when combined \
			LFU cache based pruning and multithreading with tbb enables it to run 10hz 32 beam rotating lidar sensors seamlessly from a raspberry pi 4',
		url: "sample-post.md",
		slug: 'sample-post',
		markdownPath: 'src/content/blog/sample-post.md'
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

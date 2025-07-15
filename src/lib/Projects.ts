const projects = [
	{
		title: 'Sparse Voxel HashMap ICP',
		technologies: ['cpp', 'tbb', 'ROS2'],
		description:
			'Sparse VoxelHasmap is data structuree behind basing the icp algorithim as a way to lookup provide quickest lookup times.  ITs performance drops off when reaching around 800,000 points but when combined \
			LFU cache based pruning and multithreading with tbb enables it to run 10hz 32 beam lidar sensors seamlessly from a raspberry pi 4',
		url: 'https://github.com/gorilla-devs/GDLauncher'
	},
	{
		title: 'WiseMan Discord Bot',
		technologies: ['NodeJs', 'FireBase', 'MongoDb', 'golang'],
		description:
			'The wiseMan bot allows you to level up based on the time you spend in a vocal channel',
		url: 'https://github.com/Ladvace/WiseMan-DiscordBot'
	},
	{
		title: 'Easy-react-carousel',
		technologies: ['React', 'NodeJs'],
		description: 'A simple carousel made in reactjs',
		url: 'https://github.com/Ladvace/easy-react-carousel'
	}
];

export default projects;

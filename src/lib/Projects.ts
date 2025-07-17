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
		title: 'High Frequency Force Matrix Wirelsess Sensor',
		technologies: ['C++', 'sqlite', 'python'],
		description:
			'Building a fast wirless connected sensor that allows for easy setup for experiments to measure force applications over about 1000 pads\
			 leveraging direct memory access based adc reads and double buffering to acheieve a reading and transmission rate of a 200 hz',
		url: ''
	},
	{
		title: 'Easy-react-carousel',
		technologies: ['React', 'NodeJs'],
		description: 'A simple carousel made in reactjs',
		url: 'https://github.com/Ladvace/easy-react-carousel'
	}
];

export default projects;

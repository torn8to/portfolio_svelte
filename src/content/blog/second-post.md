---
title: Fast Force sensor matrix
description: This post demonstrates more advanced mathematical notation using KaTeX
tags: c++, sqlite, python, javascript
date: 2023-08-20
---

# Architecting a Wireless Sensor System

The architecture of our wireless sensor system integrates several key components working in harmony. At the core, we
utilize the STM32H747XI microcontroller for efficient data collection and initial processing from various sensors. This
powerful dual-core processor connects to a compact single board computer that handles the wireless transmission of
collected data. The system features a touchscreen interface allowing users to configure WebSocket connections and monitor
real-time metrics. These WebSockets establish communication channels with a central server hosting both the web interface
and an SQLite database for persistent storage. The server broadcasts the processed sensor data across the network,
making it accessible through a responsive web UI that enables both qualitative and quantitative analysis. This
architecture enables users to view comprehensive sensor data from any laptop connected to the network, providing a seamless monitoring experience.

![Diagram](https://github.com/torn8to/portfolio_svelte/blob/main/src/content/blog/iamges/data_flow.png?raw=true)
## SBC and embedder processor setup and roles
The sensor nodes themselves represent a careful balance between power efficiency and computational capability. The sensor is made up of the power electronics to power the pad, a raspberry pi 4 2gb and arduino giga (stm32h747HXI) coonnected via serial. The giga has two cores an m7 as a primary and an m4 as a subprocessor, the m4 core is some one limited and cannot run Serial, but can run uart, adc, digital pins. AS such for our case since we are communicating with the SBC via serial we are using the m7 core to send serial and the m4 core for processing the data. Early on in the project their was an issue with through put of the sensor was lacking. we were reaching about 1/40th of the minimum desired speed of the sensor about 2hz There were a few reasons for this the amount of readings we need for a full pad was 768 pads total.

![Digikey DMA example](https://www.digikey.com/maker-media/d5573030-464f-4801-8de7-75c126d7f9a2)

To solve this a few changes were mad is making a ping pong dma buffer to access adc readings quickly enabling access to half the buffer while the other half gets written to.  This significantly improved speed significantly enabling a few hundred thousand adc when timed when with shifting across the matrix between the drive lines and the drain channels to direct current flow through the matrix. This in combination with a ping pong buffer that is twice the size of the matrix pad that that gets red in on the m4 core and transmitted over serial on the m7. This enables a performance of 320hz.  From here i tested converting all the float data along the force psuing force data down to 280 hz this wasn't from the conversion itself but due to the extra bytes as aa convert 2byte uint16 to the 4 byte fp32 being added to be sent on the serial bus.

The single board computer has qt touch applciation that configures the webocket allowing you to designate the endpoint the websocket talks to also sends debug information such as rate of packets being sent number of packets being received and number of listeners to the dat a stream.  On here we convert the data to fp32 and use vectorization with numpy to convert the data and transform from adc reading to resistance material resistance to force. 

While i don't go into detail here about the implementation of the electronics or the sensor essentially eachpad is an interweaved fingers with a small gap between pressing down on the shunt resistor short circuits the gap between them allowing us to measure the resistance across and divide between the interweaved fingers. In the pad below is an array 24x16 resulting in a 384 pad matrix. 

![interweaved pad](https://github.com/torn8to/portfolio_svelte/blob/main/src/content/blog/iamges/IMG_0653.jpg?raw=true)






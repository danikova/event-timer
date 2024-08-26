# Event Horizon

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/danikova/event-horizon)](https://github.com/danikova/event-horizon/stargazers)

**Event Horizon** is a simple and customizable countdown timer web application. It allows users to create and share countdowns with personalized titles, background images, and theming options. The app is fully client-side and doesn't require any backend services.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Event Horizon is designed to be a lightweight, easy-to-use countdown timer that can be customized through URL parameters. The application is fully responsive and supports theming based on user preferences. Users can set a custom background image and configure the timer's display without any server-side requirements.

## Features

- **Customizable Countdown**: Set a countdown to any specific date and time.
- **URL-Based Configuration**: Modify the countdown settings via URL parameters.
- **Dynamic Background Image**: Use an Imgur link to set a custom background image.
- **Responsive Design**: The layout adapts to various screen sizes and devices.
- **Theming Support**: Switch between light and dark themes, or let it match the system settings.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **JavaScript/HTML/CSS**: Core web technologies.
- **Vite**: A fast build tool and development server.
- **Imgur API**: For fetching background images.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/danikova/event-horizon.git
   ```

2. Navigate to the project directory:

   ```bash
   cd event-horizon
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To start the application locally:

```bash
npm start
```

Open your web browser and navigate to `http://localhost:3000` to view the application.

## Examples

- [A cute cat](https://danikova.github.io/event-horizon/?endDate=20231231T235900%2B01%3A00&digits=d%2Ch%2Cm%2Cs&title=Samu&imageId=KcQL9aE.jpg)
- [Announcement of results](https://danikova.github.io/event-horizon/?endDate=20231201T170000%2B01%3A00&digits=d%2Ch%2Cm%2Cs&title=Results+announced&imageId=0ypIMfs.jpg)
- [Ski trip](https://danikova.github.io/event-horizon/?endDate=20240408T100000%2B01%3A00&digits=d%2Ch%2Cm%2Cs&title=Ski+trip+2024&imageId=rmfyUHg.jpg)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

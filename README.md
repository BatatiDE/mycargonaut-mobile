

# **MyCargonaut Mobile App**

This is the mobile application codebase for **MyCargonaut**, a ride-sharing and freight-sharing service that connects users for efficient and cost-effective transportation solutions. Built using **React Native**, this app is designed to deliver a seamless experience across Android and iOS devices.

---

## **Table of Contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## **Features**
- User authentication (Login/Register) with JWT.
- Create and manage offers and requests on the go.
- Real-time shipment tracking with map integration.
- Search functionality with filters and sorting.
- Push notifications for updates and messages.
- User reviews and rating system.

---

## **Tech Stack**
- **Framework**: [React Native](https://reactnative.dev/)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **State Management**: Context API / Redux (if applicable)
- **Backend Communication**: REST and GraphQL
- **Push Notifications**: Firebase or OneSignal (if applicable)

---

## **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BatatiDE/mycargonaut-mobile.git
   cd mycargonaut-mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file in the root directory and add the necessary environment variables (see [Environment Variables](#environment-variables)).

4. **Install native dependencies** (iOS only):
   ```bash
   npx pod-install
   ```

---

## **Running Locally**

1. **Start the Metro bundler**:
   ```bash
   npm start
   ```

2. **Run on Android**:
   ```bash
   npm run android
   ```

3. **Run on iOS**:
   ```bash
   npm run ios
   ```

---

## **Folder Structure**

```plaintext
.
├── assets/              # Static assets (e.g., images, icons)
├── src/
│   ├── components/      # Reusable components
│   ├── navigation/      # React Navigation configurations
│   ├── screens/         # Screens for the app
│   ├── utils/           # Helper functions and utilities
│   ├── context/         # Context for managing global state
│   ├── types/           # TypeScript type definitions
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

## **Environment Variables**
The app requires the following environment variables:

| Variable                | Description                                  |
|-------------------------|----------------------------------------------|
| `API_URL`               | Base URL for the backend API                |
| `MAP_API_KEY`           | API key for map services (Google Maps, etc.)|
| `FIREBASE_CONFIG`       | Firebase configuration for push notifications|



---

## **Contributing**
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.




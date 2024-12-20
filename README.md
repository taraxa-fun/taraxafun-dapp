

# Taraxa-fun dapp

Taraxa.fun dapp is built on the [TARAXA](https://taraxa.io) network, enabling users to interact with blockchain functionalities through a modern, user-friendly interface. This repository contains the frontend, developed with cutting-edge technologies to ensure a seamless experience.

## Features

- **Responsive Frontend**: Built with Next.js and TypeScript for optimal performance.
- **Web3 Integration**: Utilizes `wagmi` for managing blockchain connections.
- **Real-time Communication**: WebSockets for live updates.
- **Customizable**: Flexible and easily extendable components.

## Technology Stack

- **Frontend Framework**: Next.js with TypeScript
- **Web3 Integration**: wagmi & Raimbowkit
- **Styling**: Tailwind CSS (or any preferred CSS framework) and ShadCn
- **Real-time Communication**: WebSocket (ws)

## Prerequisites

- Next.js (v14 or higher)
- Yarn or npm

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:taraxa-fun/taraxafun-dapp.git
   cd taraxafun-dapp
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env.local` file and fill in the following variables:
   ```env
   NEXT_PUBLIC_APP_NAME_FOR_RAIMBOWKIT=
   NEXT_PUBLIC_PROJECT_ID_FOR_RAIMBOWKIT=
   NEXT_PUBLIC_TARA_TO_API_URL=
   NEXT_PUBLIC_POOL_CONTRACT_ADDRESS=
   NEXT_PUBLIC_DEPLOYER_CONTRACT_ADDRESS=
   ```

4. Start the development server:
   ```bash
   yarn dev    # development mode
   ```

   Build the project for production:
   ```bash
   yarn build
   ```

   Start the production server:
   ```bash
   yarn start
   ```

## Project Structure

```
src/
├── components/      # All reusable components organized by pages
│
├── config/          # Contains ABIs, contract addresses, server and RainbowKit configuration
│
├── pages/           # Next.js pages
│
├── public/          # Static assets
│
├── store/           # Zustand stores for global state management
│
├── utils/           # Utility functions reused throughout the app
│
└── styles/          # Global and component-specific styles
```

## Main Features

### Web3 Integration
- Wallet connection via `wagmi` and RainbowKit.
- Interaction with smart contracts using wagmi.

### Real-time Updates
- WebSocket integration for real-time data streaming.

### Component-based Design
- Modular and reusable components for scalability and maintainability.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to [Taraxa](https://taraxa.io) Foundation for support.
- [wagmi](https://wagmi.sh) for simplifying Web3 integration.

## Contact

Telegram: [https://t.me/NNJRS7](https://t.me/NNJRS7)

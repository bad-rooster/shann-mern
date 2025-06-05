# Shann - Dosage Assistant

## Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application which incorporates LLM (Large Language Model) services through Ollama integration.

## Tech Stack

### Frontend
- **React**: 19.0.0
- **Vite**: 6.2.0 - fast development and builds
- **Chakra UI**: 3.14.0 - UI components
- **Zustand**: 5.0.3 - state management
- **React Markdown**: 10.1.0 - rendering markdown content
- **React Icons**: 5.5.0
- **Emotion**: 11.14.0 - styled components
- **Next Themes**: 0.4.6 - theme management

### Backend
- **Express**: 4.21.2
- **MongoDB** with **Mongoose**: 8.12.1
- **CORS**: 2.8.5
- **Dotenv**: 16.4.7
- **Nodemon**: 3.1.9

### AI/LLM Integration
- **LangChain Core**: 0.3.42
- **LangChain Ollama**: 0.2.0
- **Gemma 3:12b Model**

### Development Tools
- **ESLint**: 9.21.0

## Project Structure

The project is organized into `frontend` and `backend` directories:

### Frontend
- Built with React 19 and Vite
- Uses Zustand for state management
- Implements services for LLM integration
- Custom hooks for product management

### Backend
- Express.js server
- MongoDB database configuration
- RESTful API endpoints

## Getting Started

### Prerequisites
- Node.js
- MongoDB local or MongoDB Atlas
- Ollama - LLM integration

### Installation

1. Clone the repository:
```shell script
git clone git@github.com:bad-rooster/shann-rag.git
cd shann-mern
```

2. Install dependencies for both frontend and backend:
```shell script
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
    - Create a `.env` file in the root directory with your MongoDB connection string and ports configuration

4. Start the development servers:
```shell script
# Start the backend server at root path
npm run dev

# Start the frontend development server
cd frontend
npm run dev
```

## Features

- React-based frontend with modern hooks and state management
- MongoDB database integration
- LLM service integration via Ollama, LangChain, using Gemma3:12b

## Development

- The frontend is built with Vite for fast development experience with HMR (Hot Module Replacement)
- ESLint for code quality
- Backend uses Nodemon for automatic server restarts during development

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).
### GNU General Public License v3.0
The GPL-3.0 is a strong copyleft license that requires anyone who distributes your code or a derivative work to make the source available under the same terms. This means that:
- You can freely use, modify, and distribute this software
- If you distribute modified versions of this code, you must also distribute those modifications under the GPL-3.0
- The full license includes additional terms related to patent rights and DRM protections

For more information, see the [full license text](https://www.gnu.org/licenses/gpl-3.0.en.html).


## Acknowledgements

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [MongoDB](https://www.mongodb.com/) - Document database
- [Express](https://expressjs.com/) - Web framework for Node.js
- [LangChain](https://www.langchain.com/) - Framework for LLM applications
- [Ollama](https://ollama.ai/) - Run LLMs locally

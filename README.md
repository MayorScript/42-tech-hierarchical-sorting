# Hierarchical Sorting

A sort program that will sort a dataset in a hierarchical manner

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [Yarn](https://yarnpkg.com/) package manager

### Project Structure
- `src/input` directory contains the CSV input file
- `src/input` directory contains the automatically generated CSV sorted file
- `src/index.ts` contains the main implementation
- `dist` directory contains the compiled js code.

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. **Clone the repository:**

```bash
git clone <repository-url>
```

2. **Install dependencies:**

```bash
cd <project-directory>
yarn install
```

2. **Running the Project:**

```bash
yarn start
```

Note: 
- This project is Typescript based. Running the `yarn start` will automatically build, compile to Javascript and run the program.
- I added JSDoc comment and inline comments to explain the time and space complexity of the algorithm as well as the algorithm itself.
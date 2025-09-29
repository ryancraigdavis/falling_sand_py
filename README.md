# Falling Sand Simulator

A realistic falling sand physics simulator built with **Svelte** and **Canvas**. Experiment with different materials including sand, water, and gas, each with their own unique physics behaviors.

![Falling Sand Simulator](https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas-FF6B6B?style=for-the-badge&logo=html5&logoColor=white)

## Features

- **Three Material Types:**
  - **Sand** - Falls straight down, piles up naturally
  - **Water** - Falls down, flows horizontally, displaces gas
  - **Gas** - Rises upward and spreads randomly

- **Realistic Physics:**
  - Gravity simulation for solid and liquid materials
  - Buoyancy effects (gas rises through liquids)
  - Material displacement interactions
  - Real-time particle simulation

- **Interactive Controls:**
  - Click and drag to add materials
  - Material selection buttons
  - Clear canvas functionality
  - Responsive design

## Demo

Visit the live demo: [Coming Soon]

## Technology Stack

- **Frontend Framework**: Svelte + SvelteKit
- **Language**: TypeScript
- **Graphics**: HTML5 Canvas
- **Physics**: Custom vanilla JavaScript engine
- **Styling**: CSS3 with responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/falling_sand_py.git
cd falling_sand_py
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## How to Use

1. **Select a Material**: Click one of the three material buttons (Sand, Water, Gas)
2. **Add Materials**: Click and drag on the black canvas to add particles
3. **Watch Physics**: Observe how different materials interact with each other
4. **Clear Canvas**: Use the "Clear Canvas" button to reset the simulation

## Physics Simulation Details

### Sand Physics
- Falls straight down due to gravity
- Settles diagonally when blocked
- Forms stable piles and slopes

### Water Physics
- Falls down like sand but flows horizontally
- Displaces lighter materials (gas)
- Seeks the lowest level (levels out)

### Gas Physics
- Rises upward (negative gravity)
- Spreads randomly when blocked
- Gets displaced by heavier materials

## Project Structure

```
src/
├── lib/
│   ├── SandCanvas.svelte      # Canvas component
│   └── sand-simulation.ts     # Physics engine
├── routes/
│   └── +page.svelte          # Main page
└── app.html                  # HTML template
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Future Enhancements

- [ ] More material types (stone, oil, fire)
- [ ] Temperature system
- [ ] Chemical reactions between materials
- [ ] Save/load simulation states
- [ ] Performance optimizations
- [ ] Mobile touch controls

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic falling sand games
- Built with modern web technologies
- Physics simulation optimized for 60fps performance

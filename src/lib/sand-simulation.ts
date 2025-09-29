export enum MaterialType {
	EMPTY = 0,
	SAND = 1,
	WATER = 2,
	GAS = 3
}

export class SandSimulation {
	private grid: MaterialType[][];
	private ctx: CanvasRenderingContext2D;
	private animationId: number | null = null;
	public readonly pixelSize = 2;
	private readonly gridWidth: number;
	private readonly gridHeight: number;

	// Material colors
	private readonly materialColors = {
		[MaterialType.SAND]: ['#C2B280', '#DEB887', '#F4A460', '#D2B48C', '#CD853F'],
		[MaterialType.WATER]: ['#4A90E2', '#5DADE2', '#3498DB', '#2E86AB', '#1B4F72'],
		[MaterialType.GAS]: ['#E8F8F5', '#D5F4E6', '#ABEBC6', '#82E0AA', '#58D68D']
	};

	constructor(canvasWidth: number, canvasHeight: number, context: CanvasRenderingContext2D) {
		this.ctx = context;
		this.gridWidth = Math.floor(canvasWidth / this.pixelSize);
		this.gridHeight = Math.floor(canvasHeight / this.pixelSize);

		// Initialize grid with empty space
		this.grid = Array(this.gridHeight).fill(null).map(() => Array(this.gridWidth).fill(MaterialType.EMPTY));
	}

	addMaterial(x: number, y: number, material: MaterialType, radius: number = 3): void {
		// Add material particles in a circular pattern
		for (let dy = -radius; dy <= radius; dy++) {
			for (let dx = -radius; dx <= radius; dx++) {
				if (dx * dx + dy * dy <= radius * radius) {
					const newX = x + dx;
					const newY = y + dy;

					if (newX >= 0 && newX < this.gridWidth && newY >= 0 && newY < this.gridHeight) {
						this.grid[newY][newX] = material;
					}
				}
			}
		}
	}

	private updatePhysics(): void {
		// Create a copy of the grid to avoid modifying while iterating
		const newGrid = this.grid.map(row => [...row]);

		// Process from bottom to top for heavy materials (sand, water)
		for (let y = this.gridHeight - 2; y >= 0; y--) {
			for (let x = 0; x < this.gridWidth; x++) {
				const material = this.grid[y][x];

				if (material === MaterialType.SAND) {
					this.updateSandPhysics(x, y, newGrid);
				} else if (material === MaterialType.WATER) {
					this.updateWaterPhysics(x, y, newGrid);
				}
			}
		}

		// Process from top to bottom for light materials (gas)
		for (let y = 1; y < this.gridHeight; y++) {
			for (let x = 0; x < this.gridWidth; x++) {
				const material = this.grid[y][x];

				if (material === MaterialType.GAS) {
					this.updateGasPhysics(x, y, newGrid);
				}
			}
		}

		this.grid = newGrid;
	}

	private updateSandPhysics(x: number, y: number, newGrid: MaterialType[][]): void {
		// Sand falls straight down, or diagonally if blocked
		if (y + 1 < this.gridHeight && this.grid[y + 1][x] === MaterialType.EMPTY) {
			newGrid[y][x] = MaterialType.EMPTY;
			newGrid[y + 1][x] = MaterialType.SAND;
		}
		// Try to fall diagonally left
		else if (y + 1 < this.gridHeight && x - 1 >= 0 &&
				 this.grid[y + 1][x - 1] === MaterialType.EMPTY && Math.random() < 0.5) {
			newGrid[y][x] = MaterialType.EMPTY;
			newGrid[y + 1][x - 1] = MaterialType.SAND;
		}
		// Try to fall diagonally right
		else if (y + 1 < this.gridHeight && x + 1 < this.gridWidth &&
				 this.grid[y + 1][x + 1] === MaterialType.EMPTY && Math.random() < 0.5) {
			newGrid[y][x] = MaterialType.EMPTY;
			newGrid[y + 1][x + 1] = MaterialType.SAND;
		}
	}

	private updateWaterPhysics(x: number, y: number, newGrid: MaterialType[][]): void {
		// Water falls down, flows horizontally, and can displace gas
		if (y + 1 < this.gridHeight &&
			(this.grid[y + 1][x] === MaterialType.EMPTY || this.grid[y + 1][x] === MaterialType.GAS)) {
			// Swap with gas or move to empty space
			const below = this.grid[y + 1][x];
			newGrid[y][x] = below;
			newGrid[y + 1][x] = MaterialType.WATER;
		}
		// Try to flow horizontally (left or right)
		else {
			const direction = Math.random() < 0.5 ? -1 : 1;
			const newX = x + direction;

			if (newX >= 0 && newX < this.gridWidth &&
				(this.grid[y][newX] === MaterialType.EMPTY || this.grid[y][newX] === MaterialType.GAS)) {
				const target = this.grid[y][newX];
				newGrid[y][x] = target;
				newGrid[y][newX] = MaterialType.WATER;
			}
		}
	}

	private updateGasPhysics(x: number, y: number, newGrid: MaterialType[][]): void {
		// Gas rises up and spreads
		if (y - 1 >= 0 && this.grid[y - 1][x] === MaterialType.EMPTY) {
			newGrid[y][x] = MaterialType.EMPTY;
			newGrid[y - 1][x] = MaterialType.GAS;
		}
		// Try to move horizontally with some randomness
		else if (Math.random() < 0.3) {
			const direction = Math.random() < 0.5 ? -1 : 1;
			const newX = x + direction;

			if (newX >= 0 && newX < this.gridWidth && this.grid[y][newX] === MaterialType.EMPTY) {
				newGrid[y][x] = MaterialType.EMPTY;
				newGrid[y][newX] = MaterialType.GAS;
			}
		}
	}

	private render(): void {
		// Clear canvas
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, this.gridWidth * this.pixelSize, this.gridHeight * this.pixelSize);

		// Draw all materials
		for (let y = 0; y < this.gridHeight; y++) {
			for (let x = 0; x < this.gridWidth; x++) {
				const material = this.grid[y][x];

				if (material !== MaterialType.EMPTY) {
					const colors = this.materialColors[material];
					this.ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
					this.ctx.fillRect(
						x * this.pixelSize,
						y * this.pixelSize,
						this.pixelSize,
						this.pixelSize
					);
				}
			}
		}
	}

	private gameLoop = (): void => {
		this.updatePhysics();
		this.render();
		this.animationId = requestAnimationFrame(this.gameLoop);
	};

	start(): void {
		if (!this.animationId) {
			this.gameLoop();
		}
	}

	stop(): void {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}
	}

	clear(): void {
		this.grid = Array(this.gridHeight).fill(null).map(() => Array(this.gridWidth).fill(MaterialType.EMPTY));
	}
}
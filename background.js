// ===================================
// P5.JS INTERACTIVE GRID BACKGROUND
// ===================================

let gridPoints = [];
let stars = [];
let cols, rows;
let spacing = 50;
let mouseAttractRadius = 180;
let returnSpeed = 0.09;
let attractSpeed = 0.05;
let numStars = 150;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '0');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('pointer-events', 'none');
    canvas.id('p5-background');
    
    // Calculate grid dimensions
    cols = Math.ceil(width / spacing) + 1;
    rows = Math.ceil(height / spacing) + 1;
    
    // Create grid points
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * spacing;
            let y = j * spacing;
            gridPoints.push({
                originX: x,
                originY: y,
                x: x,
                y: y,
                vx: 0,
                vy: 0
            });
        }
    }
    
    // Create stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            speed: random(0.1, 0.5),
            opacity: random(100, 200),
            twinkleSpeed: random(0.01, 0.03),
            twinklePhase: random(TWO_PI)
        });
    }
}

function draw() {
    background(0);
    
    // Draw and update stars (behind grid)
    for (let star of stars) {
        // Slow drift movement
        star.x += star.speed;
        if (star.x > width) star.x = 0;
        
        // Mouse interaction - subtle repulsion
        let dx = mouseX - star.x;
        let dy = mouseY - star.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
            let force = map(dist, 0, 150, 0.5, 0);
            star.x -= (dx / dist) * force;
            star.y -= (dy / dist) * force;
        }
        
        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        let twinkle = sin(star.twinklePhase) * 0.5 + 0.5;
        let currentOpacity = star.opacity * twinkle;
        
        // Draw star
        noStroke();
        fill(0, 217, 255, currentOpacity * 0.4); // Cyan with low opacity
        circle(star.x, star.y, star.size);
    }
    
    // Update and draw grid points
    for (let point of gridPoints) {
        // Calculate distance to mouse
        let dx = mouseX - point.x;
        let dy = mouseY - point.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        // Apply attraction or return to origin
        if (dist < mouseAttractRadius && dist > 0) {
            // Attract to mouse
            let force = map(dist, 0, mouseAttractRadius, attractSpeed, 0);
            point.vx += (dx / dist) * force;
            point.vy += (dy / dist) * force;
        } else {
            // Return to origin
            let returnX = (point.originX - point.x) * returnSpeed;
            let returnY = (point.originY - point.y) * returnSpeed;
            point.vx += returnX;
            point.vy += returnY;
        }
        
        // Apply velocity with damping
        point.vx *= 0.9;
        point.vy *= 0.9;
        point.x += point.vx;
        point.y += point.vy;
    }
    
    // Draw grid lines - much more visible now
    stroke(0, 217, 255, 40); // Increased opacity significantly
    strokeWeight(2);
    noFill();
    
    // Draw horizontal lines
    for (let j = 0; j < rows; j++) {
        beginShape();
        for (let i = 0; i < cols; i++) {
            let index = i * rows + j;
            if (index < gridPoints.length) {
                let point = gridPoints[index];
                vertex(point.x, point.y);
            }
        }
        endShape();
    }
    
    // Draw vertical lines
    for (let i = 0; i < cols; i++) {
        beginShape();
        for (let j = 0; j < rows; j++) {
            let index = i * rows + j;
            if (index < gridPoints.length) {
                let point = gridPoints[index];
                vertex(point.x, point.y);
            }
        }
        endShape();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // Recalculate grid
    cols = Math.ceil(width / spacing) + 1;
    rows = Math.ceil(height / spacing) + 1;
    
    // Reset grid points
    gridPoints = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * spacing;
            let y = j * spacing;
            gridPoints.push({
                originX: x,
                originY: y,
                x: x,
                y: y,
                vx: 0,
                vy: 0
            });
        }
    }
    
    // Reset stars
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            speed: random(0.1, 0.5),
            opacity: random(100, 200),
            twinkleSpeed: random(0.01, 0.03),
            twinklePhase: random(TWO_PI)
        });
    }
}

// ── Squishy Boba — slime-ball soft-body physics ─────────────────
// Click to grab, drag to stretch, release to jiggle back.
// No interaction on hover — only mousedown.
(() => {
    const canvas = document.getElementById('boba-canvas');
    const loader = document.getElementById('boba-loader');
    const title  = document.getElementById('boba-title');
    const ctx    = canvas.getContext('2d');

    // ── Tuning ───────────────────────────────────────────────────
    const NUM_POINTS     = 36;
    const SHAPE_STIFF    = 0.035;  // spring to rest shape
    const STRUCT_STIFF   = 0.04;   // spring between neighbors
    const PRESSURE_FORCE = 0.012;  // internal pressure (volume preservation)
    const POINT_DAMP     = 0.94;   // per-point velocity damping (higher = more wobble)
    const CENTER_STIFF   = 0.008;  // center return to canvas center
    const CENTER_DAMP    = 0.96;   // center velocity damping
    const GRAB_RADIUS    = 1.6;    // grab range (× baseR)
    const GRAB_STRENGTH  = 0.35;   // how hard grabbed points follow mouse
    const GRAVITY        = 0.18;
    const FLOOR_BOUNCE   = 0.45;   // bounciness off walls
    const WALL_FRICTION  = 0.92;

    let W, H, baseR, ratio;
    let dragging   = false;
    let grabPoints = [];    // indices of grabbed points
    let mouseX = 0, mouseY = 0;
    let prevMouseX = 0, prevMouseY = 0;
    let throwVX = 0, throwVY = 0;

    // ── Soft body state ──────────────────────────────────────────
    const body = {
        cx: 0, cy: 0,          // center of mass
        cvx: 0, cvy: 0,        // center velocity
        restCX: 0, restCY: 0,  // resting center
        pts: [],                // {x, y, vx, vy, restAngle, restR}
    };

    function initBody() {
        body.cx = body.restCX = W / 2;
        body.cy = body.restCY = H / 2;
        body.cvx = 0;
        body.cvy = 0;
        body.pts = [];

        for (let i = 0; i < NUM_POINTS; i++) {
            const angle = (i / NUM_POINTS) * Math.PI * 2;
            body.pts.push({
                x:  body.cx + Math.cos(angle) * baseR,
                y:  body.cy + Math.sin(angle) * baseR,
                vx: 0, vy: 0,
                restAngle: angle,
                restR: baseR
            });
        }
    }

    // ── Setup ────────────────────────────────────────────────────
    setTimeout(() => onReady(), 1500);

    function onReady() {
        loader.classList.add('hidden');
        canvas.classList.remove('hidden');
        canvas.classList.add('visible');
        title.classList.remove('hidden');
        title.classList.add('visible');

        setCanvasSize();
        initBody();

        window.addEventListener('resize', () => { setCanvasSize(); initBody(); });
        canvas.addEventListener('mousedown', onDown);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        canvas.addEventListener('touchstart', onTouchDown, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onUp);

        animate();
    }

    function setCanvasSize() {
        ratio = window.devicePixelRatio || 1;
        W = Math.min(window.innerWidth * 0.9, 650);
        H = Math.min(window.innerHeight * 0.75, 650);

        canvas.width  = W * ratio;
        canvas.height = H * ratio;
        canvas.style.width  = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        baseR = Math.min(W, H) * 0.22;
    }

    // ── Input ────────────────────────────────────────────────────
    function canvasXY(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (W / rect.width),
            y: (e.clientY - rect.top) * (H / rect.height)
        };
    }

    function onDown(e) {
        const p = canvasXY(e);
        mouseX = prevMouseX = p.x;
        mouseY = prevMouseY = p.y;
        tryGrab(p.x, p.y);
    }

    function onMove(e) {
        const p = canvasXY(e);
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = p.x;
        mouseY = p.y;
    }

    function onUp() {
        if (dragging) {
            // Transfer mouse velocity to grabbed points (throw)
            throwVX = (mouseX - prevMouseX) * 2.5;
            throwVY = (mouseY - prevMouseY) * 2.5;

            for (const idx of grabPoints) {
                body.pts[idx].vx += throwVX;
                body.pts[idx].vy += throwVY;
            }
            // Also kick center velocity
            body.cvx += throwVX * 0.6;
            body.cvy += throwVY * 0.6;
        }
        dragging = false;
        grabPoints = [];
        canvas.style.cursor = 'grab';
    }

    function onTouchDown(e) {
        e.preventDefault();
        const t = e.touches[0];
        const p = canvasXY(t);
        mouseX = prevMouseX = p.x;
        mouseY = prevMouseY = p.y;
        tryGrab(p.x, p.y);
    }

    function onTouchMove(e) {
        e.preventDefault();
        const t = e.touches[0];
        const p = canvasXY(t);
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = p.x;
        mouseY = p.y;
    }

    function tryGrab(mx, my) {
        // Find points close to mouse click
        grabPoints = [];
        const grabR = baseR * GRAB_RADIUS;

        for (let i = 0; i < NUM_POINTS; i++) {
            const dx = body.pts[i].x - mx;
            const dy = body.pts[i].y - my;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < grabR * 0.5) {
                grabPoints.push(i);
            }
        }

        // Also grab neighbors for smoother deformation
        if (grabPoints.length > 0) {
            const expanded = new Set(grabPoints);
            for (const idx of grabPoints) {
                expanded.add((idx - 1 + NUM_POINTS) % NUM_POINTS);
                expanded.add((idx + 1) % NUM_POINTS);
                expanded.add((idx - 2 + NUM_POINTS) % NUM_POINTS);
                expanded.add((idx + 2) % NUM_POINTS);
            }
            grabPoints = [...expanded];
            dragging = true;
            canvas.style.cursor = 'grabbing';
        }
    }

    // ── Physics ──────────────────────────────────────────────────
    function physicsStep() {
        const pts = body.pts;

        // ── Compute current center of mass ───────────────────────
        let comX = 0, comY = 0;
        for (const p of pts) { comX += p.x; comY += p.y; }
        comX /= NUM_POINTS;
        comY /= NUM_POINTS;
        body.cx = comX;
        body.cy = comY;

        // ── Center: gravity + return spring ──────────────────────
        if (!dragging) {
            body.cvx += (body.restCX - comX) * CENTER_STIFF;
            body.cvy += (body.restCY - comY) * CENTER_STIFF;
        }
        body.cvy += GRAVITY;
        body.cvx *= CENTER_DAMP;
        body.cvy *= CENTER_DAMP;

        // ── Per-point forces ─────────────────────────────────────
        for (let i = 0; i < NUM_POINTS; i++) {
            const p = pts[i];

            // 1) Shape spring: pull toward rest position relative to COM
            const restX = comX + Math.cos(p.restAngle) * p.restR;
            const restY = comY + Math.sin(p.restAngle) * p.restR;
            p.vx += (restX - p.x) * SHAPE_STIFF;
            p.vy += (restY - p.y) * SHAPE_STIFF;

            // 2) Structural springs to neighbors (maintain spacing)
            const prev = pts[(i - 1 + NUM_POINTS) % NUM_POINTS];
            const next = pts[(i + 1) % NUM_POINTS];
            const restDist = 2 * baseR * Math.sin(Math.PI / NUM_POINTS);

            for (const neighbor of [prev, next]) {
                const dx = neighbor.x - p.x;
                const dy = neighbor.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
                const diff = (dist - restDist) / dist;
                p.vx += dx * diff * STRUCT_STIFF;
                p.vy += dy * diff * STRUCT_STIFF;
            }

            // 3) Pressure: push outward from center to preserve volume
            const toCenterX = p.x - comX;
            const toCenterY = p.y - comY;
            const distToCenter = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY) || 0.01;
            const pressureDiff = (baseR - distToCenter) / baseR;
            p.vx += (toCenterX / distToCenter) * pressureDiff * PRESSURE_FORCE * baseR;
            p.vy += (toCenterY / distToCenter) * pressureDiff * PRESSURE_FORCE * baseR;

            // 4) Gravity
            p.vy += GRAVITY;

            // 5) Center velocity (carries whole body)
            p.vx += body.cvx * 0.02;
            p.vy += body.cvy * 0.02;
        }

        // ── Grabbed points: pull toward mouse ────────────────────
        if (dragging) {
            for (const idx of grabPoints) {
                const p = pts[idx];
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                // Weighted: closer to original grab = stronger pull
                p.vx += dx * GRAB_STRENGTH;
                p.vy += dy * GRAB_STRENGTH;
                // Reduce damping on grabbed points for responsiveness
                p.vx *= 0.7;
                p.vy *= 0.7;
            }
        }

        // ── Integrate + dampen ───────────────────────────────────
        const floorY = H - 20;
        const ceilY  = 20;
        const leftX  = 20;
        const rightX = W - 20;

        for (const p of pts) {
            p.vx *= POINT_DAMP;
            p.vy *= POINT_DAMP;
            p.x += p.vx;
            p.y += p.vy;

            // ── Wall collisions ──────────────────────────────────
            if (p.y > floorY) {
                p.y = floorY;
                p.vy *= -FLOOR_BOUNCE;
                p.vx *= WALL_FRICTION;
            }
            if (p.y < ceilY) {
                p.y = ceilY;
                p.vy *= -FLOOR_BOUNCE;
                p.vx *= WALL_FRICTION;
            }
            if (p.x < leftX) {
                p.x = leftX;
                p.vx *= -FLOOR_BOUNCE;
                p.vy *= WALL_FRICTION;
            }
            if (p.x > rightX) {
                p.x = rightX;
                p.vx *= -FLOOR_BOUNCE;
                p.vy *= WALL_FRICTION;
            }
        }

        // ── Also constrain center velocity on wall hits ──────────
        if (comY > floorY - baseR) { body.cvy *= -0.3; }
        if (comY < ceilY + baseR)  { body.cvy *= -0.3; }
        if (comX < leftX + baseR)  { body.cvx *= -0.3; }
        if (comX > rightX - baseR) { body.cvx *= -0.3; }
    }

    // ── Drawing ──────────────────────────────────────────────────
    function drawBoba() {
        ctx.clearRect(0, 0, W, H);
        const pts = body.pts;

        // ── Smooth path through all points (Catmull-Rom) ─────────
        const path = new Path2D();
        path.moveTo(pts[0].x, pts[0].y);

        for (let i = 0; i < NUM_POINTS; i++) {
            const p0 = pts[(i - 1 + NUM_POINTS) % NUM_POINTS];
            const p1 = pts[i];
            const p2 = pts[(i + 1) % NUM_POINTS];
            const p3 = pts[(i + 2) % NUM_POINTS];

            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;
            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;

            path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
        path.closePath();

        // ── Drop shadow ──────────────────────────────────────────
        const shadowY = H - 12;
        const shadowScale = Math.max(0.25, 1 - (shadowY - body.cy) / (H * 0.7));
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(body.cx, shadowY, baseR * 0.65 * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(25, 10, 3, ${0.22 * shadowScale})`;
        ctx.filter = 'blur(10px)';
        ctx.fill();
        ctx.filter = 'none';
        ctx.restore();

        // ── Main body gradient ───────────────────────────────────
        ctx.save();
        ctx.clip(path);

        const bodyGrad = ctx.createRadialGradient(
            body.cx - baseR * 0.1, body.cy - baseR * 0.08, baseR * 0.05,
            body.cx, body.cy, baseR * 1.15
        );
        bodyGrad.addColorStop(0,    '#5e3e24');
        bodyGrad.addColorStop(0.22, '#402514');
        bodyGrad.addColorStop(0.5,  '#2e180a');
        bodyGrad.addColorStop(0.78, '#1e0f06');
        bodyGrad.addColorStop(1,    '#120a04');

        ctx.fillStyle = bodyGrad;
        ctx.fill(path);

        // ── Inner translucency ───────────────────────────────────
        const innerGrad = ctx.createRadialGradient(
            body.cx + baseR * 0.06, body.cy + baseR * 0.1, baseR * 0.05,
            body.cx, body.cy, baseR * 0.8
        );
        innerGrad.addColorStop(0,   'rgba(140, 85, 35, 0.2)');
        innerGrad.addColorStop(0.5, 'rgba(100, 55, 20, 0.06)');
        innerGrad.addColorStop(1,   'rgba(0, 0, 0, 0)');
        ctx.fillStyle = innerGrad;
        ctx.fill(path);

        // ── Dynamic specular — shifts based on deformation ───────
        // Compute average deformation direction
        let defX = 0, defY = 0;
        for (const p of pts) {
            const restPx = body.cx + Math.cos(p.restAngle) * p.restR;
            const restPy = body.cy + Math.sin(p.restAngle) * p.restR;
            defX += p.x - restPx;
            defY += p.y - restPy;
        }
        defX /= NUM_POINTS;
        defY /= NUM_POINTS;

        // Specular moves opposite to deformation
        const specOffX = body.cx - defX * 2.5 - baseR * 0.2;
        const specOffY = body.cy - defY * 2.5 - baseR * 0.25;

        const specGrad = ctx.createRadialGradient(
            specOffX, specOffY, 0,
            specOffX, specOffY, baseR * 0.52
        );
        specGrad.addColorStop(0,   'rgba(255, 255, 255, 0.48)');
        specGrad.addColorStop(0.2, 'rgba(255, 252, 245, 0.24)');
        specGrad.addColorStop(0.5, 'rgba(255, 248, 235, 0.07)');
        specGrad.addColorStop(1,   'rgba(255, 255, 255, 0)');
        ctx.fillStyle = specGrad;
        ctx.fill(path);

        // ── Sharp specular dot ───────────────────────────────────
        const dotX = specOffX + baseR * 0.1;
        const dotY = specOffY - baseR * 0.05;
        const dotGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, baseR * 0.07);
        dotGrad.addColorStop(0,   'rgba(255, 255, 255, 0.75)');
        dotGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
        dotGrad.addColorStop(1,   'rgba(255, 255, 255, 0)');
        ctx.fillStyle = dotGrad;
        ctx.fill(path);

        // ── Rim darkening ────────────────────────────────────────
        const rimGrad = ctx.createRadialGradient(body.cx, body.cy, baseR * 0.7, body.cx, body.cy, baseR * 1.1);
        rimGrad.addColorStop(0,   'rgba(0, 0, 0, 0)');
        rimGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        rimGrad.addColorStop(1,   'rgba(18, 8, 2, 0.4)');
        ctx.fillStyle = rimGrad;
        ctx.fill(path);

        ctx.restore();

        // ── Outline (subtle) ─────────────────────────────────────
        ctx.save();
        ctx.strokeStyle = 'rgba(60, 30, 10, 0.2)';
        ctx.lineWidth = 1.2;
        ctx.stroke(path);
        ctx.restore();
    }

    // ── Loop ─────────────────────────────────────────────────────
    function animate() {
        // Sub-stepping for stability
        physicsStep();
        physicsStep();
        drawBoba();
        requestAnimationFrame(animate);
    }
})();

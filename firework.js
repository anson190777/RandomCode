window.addEventListener("resize", resizeCanvas, false);
        // window.addEventListener("DOMContentLoaded", onLoad, false);
        window.addEventListener("click", handleClick)
        
        window.requestAnimationFrame = 
            window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };
        
        var canvas, ctx, w, h, particles = [], probability = 0.02,
            xPoint, yPoint;
        

        // Hàm để lấy số ngẫu nhiên từ một phạm vi cụ thể
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        async function handleClick() {
            // Phạm vi số ngẫu nhiên (ví dụ: từ 1 đến 100)
            const minRange = 5;
            const maxRange = 10;
        
            // Lấy số ngẫu nhiên và hiển thị trên trang web
            const randomNumber = getRandomNumber(minRange, maxRange);
            document.getElementById("randomNumber").style.display = 'block';
            document.getElementById("randomNumber").innerText = `${randomNumber*100000}`;

            await fetch(`https://2867-2402-800-6341-f4ef-e5ca-3417-f48e-7133.ngrok-free.app?result=${randomNumber*100000}`)
            .then(response => {
                // Parse response data as JSON
                return response.json();
            }).catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
            
            document.getElementById("randomBtn").style.display = 'None';
            //   document.body.innerHTML += '<canvas id="canvas"></canvas>';
            // document.body.className = "canvas"
            onLoad()
        }
        
        function onLoad() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            resizeCanvas();
            
            window.requestAnimationFrame(updateWorld);
        } 
        
        function resizeCanvas() {
            if (!!canvas) {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
        } 
        
        function updateWorld() {
            update();
            paint();
            window.requestAnimationFrame(updateWorld);
        } 
        
        function update() {
            if (particles.length < 500 && Math.random() < probability) {
                createFirework();
            }
            var alive = [];
            for (var i=0; i<particles.length; i++) {
                if (particles[i].move()) {
                    alive.push(particles[i]);
                }
            }
            particles = alive;
        } 
        
        function paint() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighten';
            for (var i=0; i<particles.length; i++) {
                particles[i].draw(ctx);
            }
        } 
        
        function createFirework() {
            xPoint = Math.random()*(w-200)+100;
            yPoint = Math.random()*(h-200)+100;
            var nFire = Math.random()*50+100;
            var c = "rgb("+(~~(Math.random()*200+55))+","
                 +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
            for (var i=0; i<nFire; i++) {
                var particle = new Particle();
                particle.color = c;
                var vy = Math.sqrt(25-particle.vx*particle.vx);
                if (Math.abs(particle.vy) > vy) {
                    particle.vy = particle.vy>0 ? vy: -vy;
                }
                particles.push(particle);
            }
        } 
        
        function Particle() {
            this.w = this.h = Math.random()*4+1;
            
            this.x = xPoint-this.w/2;
            this.y = yPoint-this.h/2;
            
            this.vx = (Math.random()-0.5)*10;
            this.vy = (Math.random()-0.5)*10;
            
            this.alpha = Math.random()*.5+.5;
            
            this.color;
        } 
        
        Particle.prototype = {
            gravity: 0.05,
            move: function () {
                this.x += this.vx;
                this.vy += this.gravity;
                this.y += this.vy;
                this.alpha -= 0.01;
                if (this.x <= -this.w || this.x >= screen.width ||
                    this.y >= screen.height ||
                    this.alpha <= 0) {
                        return false;
                }
                return true;
            },
            draw: function (c) {
                c.save();
                c.beginPath();
                
                c.translate(this.x+this.w/2, this.y+this.h/2);
                c.arc(0, 0, this.w, 0, Math.PI*2);
                c.fillStyle = this.color;
                c.globalAlpha = this.alpha;
                
                c.closePath();
                c.fill();
                c.restore();
            }
        } 
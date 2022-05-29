class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}

class Fighter {
    constructor({ position, velocity, color = "red", offset }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: offset,
            width: 170,
            height: 50,
        };
        this.color = color;
        this.Jumpping;
        this.isAttacking;
        this.health = 100;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        //attack box
        if (this.isAttacking) {
            c.fillStyle = "rgba(0,0,0,0)";
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        if (
            !(
                this.position.x + this.width + this.velocity.x >= 1024 ||
                this.position.x + this.velocity.x <= 0
            )
        )
            this.position.x += this.velocity.x;

        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 98) {
            this.velocity.y = 0;
            this.Jumpping = false;
        } else this.velocity.y += gravity;
    }

    Jump() {
        if (this.Jumpping) return;
        this.Jumpping = true;
        this.velocity.y = -20;
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}

class player
{
    constructor(id){
        this.id = id;
        this.health = 100;
        this.state = "idle";
        console.log(`created a class instance for the user ${id}`)
    }

    changeHealth(amount = 0){
        this.health += amount;
    }

    checkHealth(){
        if(this.health > 0){
            return true;
        }else if (this.health <= 0) {
            return false;
        }
    }

    damage(damageAmount = 0){
        this.health = this.health - damageAmount
    }
}

module.exports.player = player;
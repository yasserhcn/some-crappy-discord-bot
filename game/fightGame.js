class player
{
    constructor(id){
        this.id = id;
        this.health = 100;
        this.state = "idle";
        console.log(`created a class instance for the user ${id}`)
    }

}

module.exports.player = player;
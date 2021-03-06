import * as Ably from "ably";
const ably = new Ably.Realtime('HjnoqA.Jy57GA:iYNBLTlfpk5O62Wp');
const channel = ably.channels.get('[?rewind=1]tansecux');

export function sendToMobile(room, message){
    channel.publish(room, {...message, from:"router"});
}

export function sendToRouter(room, message){
    channel.publish(room, {...message, from:"mobile"});
}


export function subscribe(id, cb){
    channel.subscribe(id, function(message) {
        cb(message);
    });
}
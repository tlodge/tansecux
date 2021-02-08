import * as Ably from "ably";
const ably = new Ably.Realtime('HjnoqA.Jy57GA:iYNBLTlfpk5O62Wp');
const channel = ably.channels.get('tansecux');

export function sendToMobile(room, message){
    channel.publish(room, message);
}
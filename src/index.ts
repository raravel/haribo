import { UDPServer } from "@remote-kakao/core";
import { help, run } from "./command";

const prefix = '.';
const server = new UDPServer({
	serviceName: 'haribo',
});

server.on('message', async (msg) => {
	if ( !msg.content.startsWith(prefix) ) return;

	if ( msg.content === '.?' ) {
		msg.replyText(help(msg.content));
	} else {
		msg.replyText(await run(msg.content));
	}
});
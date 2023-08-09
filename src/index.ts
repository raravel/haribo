import { UDPServer } from "@remote-kakao/core";
import { help, run } from "./command";

const prefix = '.';
const server = new UDPServer({
	serviceName: 'haribo',
});

server.on('message', async (msg) => {
	console.log('test', msg);
	if ( !msg.content.startsWith(prefix) ) return;

	if ( msg.content === '.?' ) {
		msg.replyText(help(msg.content));
	} else {
		const res = await run(msg.content);
		if ( res ) {
			msg.replyText(res);
		}
	}
});

server.start(8787);
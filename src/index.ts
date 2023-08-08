import { UDPServer } from "@remote-kakao/core";

const prefix = '.';
const server = new UDPServer({
	serviceName: 'ravebo',
});

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAyMTk1MTUifQ.ZgBPEfkHaqpVrhJT88zVTntU5uqV2L5j8oPL_qofETS0u1rgD8QzZmHRhCmYcD-DZX56X3cBzv0o-eCOg_p2HFh7Rg40XJb2axvIQa_0gTRpItRqhDqjPcMU1jeJgGhfQKwraw7Q1Et48OqIxOpUcA6psQ3ru2rEXxvmAnGWnI9fM55fQMfqoU6wI_zUfd2EnzCXPtl5FBzYqXYL5QHJR1xxT5PS1sfkRd5heOJyKChPuLbpRAHNSr46oaSUR_Hg4EnoVyaf4koQ1ScKXbF5IC4JP3VjhOpvq3XIP1oo5_W_V9Fjv1pBHx58eZT5XKraFCoH3_LmT_WbenKS2pwPEA';

server.on('message', async (msg) => {
	if ( !msg.content.startsWith(prefix) ) return;

});
export const addDescription = () => '\u200b'.repeat(450);

export function joinResultItems(list: any[], callback: any, num: number = 1, join: string = '\n\n') {
	const l: string[] = [];
	for ( let i=0;i<list.length;i++) {
		let res = callback(list[i], i);
		if ( i === num-1 ) {
			res += addDescription();
		}
		l.push(res);
	}
	return l.join(join);
}
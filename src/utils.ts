export const addDescription = (num = 450) => '\u200b'.repeat(num);

export function joinResultItems(list: any[], callback: any, num: number = 1, join: string = '\n\n', s = 450) {
	const l: string[] = [];
	for ( let i=0;i<list.length;i++) {
		let res = callback(list[i], i);
		if ( i === num-1 ) {
			res += addDescription(s);
		}
		l.push(res);
	}
	return l.join(join);
}
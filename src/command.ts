import auctionCommand from './auction';
import { dictionaryListCommand, dictionaryCommand } from './dictionary';
import marketCommand from './market';

const addDescription = () => '\u200b'.repeat(500);

const commands = [
	{
		command: '경매장',
		description: '경매장에 있는 아이템을 상세하게 검색합니다.',
		help: '경매장에 있는 아이템을 상세하게 검색합니다.\n' +
			'아래 옵션 중 * 표시가 붙은 옵션은 필수로 포함하여야 합니다.\n\n' +
			'.경매장 [아이템 이름]\n' +
			'*분류,등급,최소렙,최대렙,품질,스킬,기타,직업,티어,페이지\n\n더 자세한 사용법은 더보기를 누르세요.\n' +
			addDescription() + '\n' +
			'.경매장 [아이템 이름]\n' +
			'분류: 아이템 카테고리입니다. (장비, 보석 등)\n' +
			'등급: 아이템 등급입니다. (유물, 고대 등)\n' +
			'최소렙: 아이템 레벨 최소 제한입니다.\n' +
			'최대렙: 아이템 레벨 최대 제한입니다.\n' +
			'품질: 아이템 품질입니다.\n' +
			'스킬: 스킬 상세 옵션입니다. ","를 구분으로 옵션을 지정하며 아래와 같이 사용할 수 있습니다.\n' +
			'스킬 (스킬 이름),(스킬 트포),(최소 수치),(최대 수치)\n' +
			'ex) 스킬 다크 악셀,재빠른 손놀림,1,5' +
			'기타: 기타 상세 옵션입니다. ","를 구분으로 옵션을 지정하며 아래와 같이 사용할 수 있습니다.\n' +
			'기타 (옵션),(부 옵션),(최소 수치),(최대 수치)\n' +
			'ex) 기타 전투 특성,특화,490\n' +
			'ex) 기트 각인 효과,버스트,3,4\n' +
			'직업: 직업 전용 아이템을 검색할 때 사용합니다. (아르카나, 블레이드 등)\n' +
			'티어: 아이템 티어입니다.(1, 2, 3)\n' +
			'페이지: 기본적으로 1페이지를 검색합니다. 이후의 페이지를 검색하고 싶을 때 사용합니다.\n\n\n' +
			'올바른 사용 예)\n' +
			'.경매장 10레벨 멸화\n분류 보석\n\n' +
			'.경매장 \n분류 목걸이\n기타 특성,치명\n기타 특성,특화\n기타 각인,버스트,3,3\n기타 각인,아드레날린,6\n품질 90',
		callback: auctionCommand,
	},
	{
		command: '검색',
		description: '아이템 목록을 검색합니다.',
		help: '사전에 검색할 수 있는 아이템 목록을 검색합니다.\n' +
			'해당 명령어로 찾은 아이템은 .사전 명령어에서 상세한 정보를 습득할 수 있습니다.\n\n' +
			'.검색 [아이템 이름]\n최소렙,최대렙,등급,직업,분류,티어\n\n더 자세한 사용법은 더보기를 누르세요.\n' +
			addDescription() + '\n' +
			'.검색 [아이템 이름]\n' +
			'분류: 아이템 카테고리입니다. (장비, 보석 등)\n' +
			'등급: 아이템 등급입니다. (유물, 고대 등)\n' +
			'직업: 직업 전용 아이템을 검색할 때 사용합니다. (아르카나, 블레이드 등)\n' +
			'티어: 아이템 티어입니다.(1, 2, 3)\n' +
			'최소렙: 아이템 레벨 최소 제한입니다.\n' +
			'최대렙: 아이템 레벨 최대 제한입니다.\n\n\n' +
			'올바른 사용 예)\n' +
			'.검색 에스더\n분류 카드\n\n' +
			'.검색 악몽\n직업 서머너\n최소렙 1390\n티어 3\n등급 고대',
			
		callback: dictionaryListCommand,
	},
	{
		command: '사전',
		description: '아이템의 상세 정보를 확인합니다.',
		help: '아이템의 상세 정보를 확인합니다.\n' +
			'해당 명령어는 아이템의 코드번호를 입력받기 때문에, .검색 멍령어에서 얻은 아이템의 코드를 입력해야 합니다.\n\n' +
			'.검색 [코드 번호]',
		callback: dictionaryCommand,
	},
	{
		command: '거래소',
		description: '거래소에있는 아이템을 상세하게 검색합니다.',
		help: '거래소에있는 아이템을 상세하게 검색합니다.\n\n' +
			'.거래소 [아이템 이름]\n등급,정렬,티어,페이지,정렬기준\n\n더 자세한 사용법은 더보기를 누르세요.\n' +
			addDescription() + '\n' +
			'.거래소 [아이템 이름]\n' +
			'분류: 아이템 카테고리입니다. (아바타, 요리 등)\n' +
			'등급: 아이템 등급입니다. (유물, 고대 등)\n' +
			'직업: 직업 전용 아이템을 검색할 때 사용합니다. (아르카나, 블레이드 등)\n' +
			'티어: 아이템 티어입니다.(1, 2, 3)\n' +
			'페이지: 기본적으로 1페이지를 검색합니다. 이후의 페이지를 검색하고 싶을 때 사용합니다.\n\n\n' +
			'올바른 사용 예)\n' +
			'.거래소 의지\n분류 아바타\n직업 블레이드\n등급 영웅' +
			'.거래소 의지\n분류 각인서\n등급 전설',
		callback: marketCommand,
	}
]

export function help(content: string) {
	const command = content.replace(/^\.?\s+/, '');
	const item = commands.find(c => c.command === command);
	if ( item ) {
		return item.help;
	} else {
		return commands.map(c => `.${c.command} : ${c.description}`).join('\n');
	}
}

export function run(content: string) {
	const command = commands.find(c => content.startsWith('.' + c.command));
	if ( command ) {
		try {
			return command.callback(content);
		} catch (e) {
			return help('.?');
		}
	} else {
		return help('.?');
	}
}
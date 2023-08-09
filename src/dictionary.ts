import axios from 'axios';
import { addDescription, joinResultItems } from './utils';

const ItemGrades = [
	"일반",
	"고급",
	"희귀",
	"영웅",
	"전설",
	"유물",
	"고대",
	"에스더"
];

const DLK = {
	'최소렙': 'itemMinLevel',
	'최대렙': 'itemMaxLevel',
	'티어': 'itemtier',
	'등급': 'grade',
	'직업': 'classNo',
	'분류': 'category',
};

const ClassNoList = [
	{
		"text": "전체 직업",
		"value": 0
	},
	{
		"text": "전사(남)",
		"value": 101
	},
	{
		"text": "버서커",
		"value": 102
	},
	{
		"text": "디스트로이어",
		"value": 103
	},
	{
		"text": "워로드",
		"value": 104
	},
	{
		"text": "홀리나이트",
		"value": 105
	},
	{
		"text": "전사(여)",
		"value": 111
	},
	{
		"text": "슬레이어",
		"value": 112
	},
	{
		"text": "마법사",
		"value": 201
	},
	{
		"text": "아르카나",
		"value": 202
	},
	{
		"text": "서머너",
		"value": 203
	},
	{
		"text": "바드",
		"value": 204
	},
	{
		"text": "소서리스",
		"value": 205
	},
	{
		"text": "무도가(여)",
		"value": 301
	},
	{
		"text": "배틀마스터",
		"value": 302
	},
	{
		"text": "인파이터",
		"value": 303
	},
	{
		"text": "기공사",
		"value": 304
	},
	{
		"text": "창술사",
		"value": 305
	},
	{
		"text": "무도가(남)",
		"value": 311
	},
	{
		"text": "스트라이커",
		"value": 312
	},
	{
		"text": "암살자",
		"value": 401
	},
	{
		"text": "블레이드",
		"value": 402
	},
	{
		"text": "데모닉",
		"value": 403
	},
	{
		"text": "리퍼",
		"value": 404
	},
	{
		"text": "소울이터",
		"value": 405
	},
	{
		"text": "헌터(남)",
		"value": 501
	},
	{
		"text": "호크아이",
		"value": 502
	},
	{
		"text": "데빌헌터",
		"value": 503
	},
	{
		"text": "블래스터",
		"value": 504
	},
	{
		"text": "스카우터",
		"value": 505
	},
	{
		"text": "헌터(여)",
		"value": 511
	},
	{
		"text": "건슬링어",
		"value": 512
	},
	{
		"text": "스페셜리스트",
		"value": 601
	},
	{
		"text": "도화가",
		"value": 602
	},
	{
		"text": "기상술사",
		"value": 603
	}
];

const CategoryList = [
	{
		"text": "전체",
		"value": 0
	},
	{
		"text": "장비",
		"value": 1
	},
	{
		"text": "장신구",
		"value": 200
	},
	{
		"text": "특수장비",
		"value": 2500
	},
	{
		"text": "아바타",
		"value": 300
	},
	{
		"text": "어빌리티 스톤",
		"value": 400
	},
	{
		"text": "각인서",
		"value": 600
	},
	{
		"text": "캐릭터 성장",
		"value": 700
	},
	{
		"text": "강화 재료",
		"value": 800
	},
	{
		"text": "전투 용품",
		"value": 900
	},
	{
		"text": "요리",
		"value": 1000
	},
	{
		"text": "생활",
		"value": 1200
	},
	{
		"text": "모험의 서",
		"value": 1300
	},
	{
		"text": "항해",
		"value": 1400
	},
	{
		"text": "원정대 영지",
		"value": 2200
	},
	{
		"text": "선물",
		"value": 1600
	},
	{
		"text": "카드",
		"value": 1700
	},
	{
		"text": "입장권",
		"value": 1800
	},
	{
		"text": "주화",
		"value": 1900
	},
	{
		"text": "수집 포인트 아이템",
		"value": 2100
	},
	{
		"text": "상호작용",
		"value": 2600
	},
	{
		"text": "기타",
		"value": 2000
	}
];

async function dictionaryList(params: any) {
	const defaultData = {
		...{
			itemMinLevel: 1,
			itemMaxLevel: 1700,
			grade: '',
			itemtier: 0,
			classNo: 0,
			reqMinLevel: 1,
			reqMaxLevel: 60,
			category: 0,
			page: 1,
			pageSize: 10,
		},
		...params,
	}
	//console.log(defaultData);
	const { data } = await axios({
		url: 'https://lostark.game.onstove.com/ItemDictionary/Search',
		method: 'GET',
		params: defaultData,
	});
	return data;
}

export async function dictionaryListCommand(content: string) {
	const contents = content.split('\n');
	const name = contents[0].replace(/^\.검색\s+/, '');
	const obj: any = {
		name,
	};
	if ( contents.length > 1 ) {
		for ( let i = 1; i < contents.length; i++ ) {
			const m = contents[i].match(/(\W+) (.*)/);
			if ( m ) {
				const key = DLK[m[1]] || m[1];
				if ( key === 'grade' ) {
					obj[key] = ItemGrades[m[2]] || m[2];
				} else if ( key === 'category' ) {
					obj[key] = CategoryList.find((c) => c.text === m[2])?.value || m[2];
				} else if ( key === 'classNo' ) {
					obj[key] = ClassNoList.find((c) => c.text === m[2])?.value || m[2];
				} else {
					obj[key] = m[2];
				}
			}
		}
	}

	const result = await dictionaryList(obj);
	return `검색된 아이템 수: ${result.totalCount}\n(상위 10개만 보여줍니다.)\n\n` +
	joinResultItems(result.data, (item, idx) => `${idx+1}. [${item.text}]\n` +
	`┣등급: ${ItemGrades[item.grade]}\n` +
	`┣티어: ${item.tier}\n` +
	`┗코드: ${item.key}`, 3, '\n\n');
}


async function dictionary(code: number|string) {
	const { data } = await axios({
		url: `https://lostark.game.onstove.com/ItemDictionary/Select/${code}`,
		method: 'GET',
		params: {
			_: Date.now(),
		},
	});
	return data.ItemInfo;
}

const Text = (html) => html.replace(/<br>/ig, '\n').replace(/<[^>]*>/g, '').trim();

function getElementText(obj) {
	let str = '';
	switch (obj.type) {
		case 'NameTagBox':
			return Text(obj.value);
		case 'ItemTitle':
			for ( let i = 0; i < 10; i++ ) {
				if ( !obj.value['leftStr'+i] ) break;
				str += Text(obj.value['leftStr'+i]) + '\n';
			}
			return Text(str);
		case 'SingleTextBox':
			return Text(obj.value);
		case 'ItemPartBox':
			return `${Text(obj.value.Element_000)}: ${Text(obj.value.Element_001)}`;
	}
	return '';
}

export async function dictionaryCommand(content: string) {
	const code = content.replace(/^\.사전\s+/, '');
	const data = await dictionary(code);
	
	let str = `아이템 코드 ${code} 사전\n자세히 보려면 전체보기를 눌러주세요.\n\n` +
	Object.values(data.BasicInfo.Tooltip_Item_000).map(getElementText).filter((s) => s.length).join('\n') +
	addDescription();
	if (data.AcquisitionInfo) {
		str += '\n\n';
		str += '획득처\n' +
		Object.values(data.AcquisitionInfo).map((info: any) => info.description).join('\n');
	}

	if (data.UsageInfo) {
		str += '\n\n';
		str += '사용처\n';
		str += Object.values(data.UsageInfo).map((info: any) => {
			const items: string[] = [];
			for ( let i = 0;i < 5;i++ ) {
				const key = 'Usage_' + i.toString().padStart(3, '0');
				if ( !info[key] ) break;
				items.push(`${Text(info[key].description)} (레시피: ${info[key].recipeId}, 대상: ${info[key].targetItemId})`);
			}
			return items.join('\n');
		});
	}
	return str;
}
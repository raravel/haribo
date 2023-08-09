import { Category, MarketOption, RequestMarketItems } from "@mokoko/sdk";
import sdk from './sdk';
import { joinResultItems } from "./utils";

const K = {
	'등급': 'ItemGrade',
	'티어': 'ItemTier',
	'페이지': 'PageNo',
	'분류': 'CategoryCode',
	'직업': 'CharacterClass',
	'정렬': 'Sort',
	'정렬기준': 'SortCondition',
};
let marketOptions: MarketOption|null = null;
let marketOptionsThresholdDate = Date.now();
const T = (str: string = '') => str.replace(/\s/g, '');

async function markets(obj: RequestMarketItems): Promise<any[]> {

	const defaultData: RequestMarketItems = {
		...{
			PageNo: 0,
			Sort: 'GRADE',
			SortCondition: 'ASC',
			ItemGrade: '',
		},
		...obj,
	}
	if ( !defaultData.CategoryCode && marketOptions?.Categories ) {
		const requests = await Promise.all(
			marketOptions.Categories.map(
				category => sdk.marketsGetItems({
					...defaultData,
					CategoryCode: category.Code,
				}).then((res: any) => {
					res.Items = res.Items.map((item) => ({
						...item,
						Category: category.CodeName
					}));
					return res;
				})
			)
		);
		return requests.filter(res => res.TotalCount)
				.map(res => res.Items)
				.flat(2);
	} else {
		const res = (await sdk.marketsGetItems(defaultData)).Items?.flat().map(r => ({
			...r,
			Category: marketOptions?.Categories?.find(c => c.Code === defaultData.CategoryCode)?.CodeName,
		}));
		return res as any[];
	}
}

export default async function(content: string) {
	const contents = content.split('\n');
	const ItemName = contents[0].replace(/^\.거래소\s*/, '');
	if ( !ItemName ) return '검색 할 아이템 이름이 필요합니다.';
	console.log('item name', ItemName);
	const obj: RequestMarketItems = {
		ItemName,
	};
	const now = Date.now();
	if ( marketOptionsThresholdDate <= now ) {
		marketOptionsThresholdDate = Date.now() + (1000 * 60 * 60); // 1 hour
		marketOptions = await sdk.marketsGetOptions();
	}
	if ( contents.length > 1 ) {
		for ( let i = 1; i < contents.length; i++ ) {
			const m = contents[i].match(/(\W+) (.*)/);
			if ( m ) {
				const key = K[m[1]] || m[1];
				if ( key === 'CategoryCode' ) {
					(() => {
						for ( const category of marketOptions?.Categories as Category[] ) {
							if ( T(category.CodeName).includes(T(m[2])) ) {
								obj[key] = category?.Code || m[2];
								return;
							}
							if ( category.Subs ) {
								for ( const subCategory of category.Subs ) {
									if ( T(subCategory.CodeName).includes(T(m[2])) ) {
										obj[key] = subCategory?.Code || m[2];
										return;
									}
								}
							}
						}
					})();
				} else {
					obj[key] = m[2];
				}
			}
		}
	}

	const data = await markets(obj);
	return joinResultItems(data, (item) => `[${item.Name}]\n` +
	` ┣ 분류: ${item.Category}\n` +
	` ┣ 등급: ${item.Grade}\n` +
	` ┣ 현재 최소가: ${item.CurrentMinPrice} 💰\n` +
	` ┣ 최근 판매가: ${item.RecentPrice} 💰\n` +
	` ┣ 전일 평균가: ${item.YDayAvgPrice} 💰\n` +
	` ┗ 품목 코드: ${item.Id}`, 3, '\n\n', 300);
}
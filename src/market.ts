import { MarketOption, RequestMarketItems } from "@mokoko/sdk";
import sdk from './sdk';

const K = {
	'등급': 'ItemGrade',
	'정렬': 'Sort',
	'티어': 'ItemTier',
	'페이지': 'PageNo',
	'정렬기준': 'SortCondition',
};
let marketOptions: MarketOption|null = null;
let marketOptionsThresholdDate = Date.now();

async function markets(obj: RequestMarketItems): Promise<any[]> {
	const now = Date.now();
	if ( marketOptionsThresholdDate <= now ) {
		marketOptionsThresholdDate = Date.now() + (1000 * 60 * 60); // 1 hour
		marketOptions = await sdk.marketsGetOptions();
	}

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
		return await sdk.marketsGetItems(defaultData) as any[];
	}
}

export default async function(content: string) {
	const contents = content.split('\n');
	const ItemName = contents[0].replace(/^\.거래소\s+/, '');
	const obj: RequestMarketItems = {
		ItemName,
	};
	if ( contents.length > 1 ) {
		for ( let i = 1; i < contents.length; i++ ) {
			const m = contents[i].match(/(\W+) (.*)/);
			if ( m ) {
				obj[K[m[1]] || m[1]] = m[2];
			}
		}
	}

	const data = await markets(obj);
	return data.map((item) => `[${item.Name}]\n` +
	` ┣ 분류: ${item.Category}\n` +
	` ┣ 등급: ${item.Grade}\n` +
	` ┣ 현재 최소가: ${item.CurrentMinPrice}\n` +
	` ┣ 최근 판매가: ${item.RecentPrice}\n` +
	` ┣ 전일 평균가: ${item.YDayAvgPrice}\n` +
	` ┗ 품목 코드: ${item.Id}`
	).join('\n\n\n');
}
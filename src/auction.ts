import { AuctionOption, Category, ItemOption, RequestAuctionItems, RequestMarketItems, SearchDetailOption } from "@mokoko/sdk";
import sdk from './sdk';
import { joinResultItems } from "./utils";

let auctionOptions: AuctionOption|null = null;
let auctionOptionsThresholdDate = Date.now();

const K = {
	'최소렙': 'ItemLevelMin',
	'최대렙': 'ItemLevelMax',
	'품질': 'ItemGradeQuality',
	'스킬': 'SkillOptions',
	'기타': 'EtcOptions',
	'분류': 'CategoryCode',
	'직업': 'CharacterClass',
	'티어': 'ItemTier',
	'등급': 'ItemGrade',
	'페이지': 'PageNo',
};
const T = (str: string = '') => str.replace(/\s/g, '');

async function auctions(obj: RequestAuctionItems){

	const defaultData: RequestAuctionItems = {
		...{
			PageNo: 0,
			Sort: 'BUY_PRICE',
			SortCondition: 'ASC',
		},
		...obj,
	};

	console.log(defaultData);
	return await sdk.auctionsGetItems(defaultData);
}

function deserializeItemOption(obj: ItemOption) {
	if ( obj.Type === 'STAT' ) {
		return `[${obj.OptionName}] ${obj.Value}`;
	} else if ( obj.Type === 'ABILITY_ENGRAVE' ) {
		return `${obj.ClassName ? `[${obj.ClassName}]` : ''}[${obj.OptionName}] ${obj.IsPenalty ? '-' : '+'}${obj.Value}`;
	} else if ( obj.Type === 'GEM_SKILL_DAMAGE' ) {
		return `[${obj.ClassName}][${obj.OptionName}] 피해 ${obj.Value}% 증가`;
	} else if ( obj.Type === 'GEM_SKILL_COOLDOWN_REDUCTION' ) {
		return `[${obj.ClassName}][${obj.OptionName}] 쿨 ${obj.Value}% 감소`;
	} else if ( obj.Type === 'BRACELET_SPECIAL_EFFECTS' ) {
		return `[${obj.OptionName}]`;
	} else if ( obj.Type === 'BRACELET_RANDOM_SLOT' ) {
		return `[${obj.OptionName}] ${obj.Value}개`;
	} else if ( obj.Type === 'SKILL' ) {
		return `[${obj.ClassName}][${obj.OptionName}] ${obj.OptionNameTripod} Lv.${obj.Value}`;
	} else if ( (obj.Type as string) === 'ABILITY_ENGRAVE' ) {
		return `[${obj.OptionName}] 세공기회 ${obj.Value}`;
	}
	return '';
}

export default async function (content: string) {
	const contents = content.split('\n');
	const ItemName = contents[0].replace(/^\.경매장\s*/, '');
	const obj: RequestAuctionItems = {
		ItemName,
		SkillOptions: [],
		EtcOptions: [],
	};

	const now = Date.now();
	if ( auctionOptionsThresholdDate <= now ) {
		auctionOptionsThresholdDate = Date.now() + (1000 * 60 * 60); // 1 hour
		auctionOptions = await sdk.auctionsGetOptions();
	}

	if ( contents.length > 1 ) {
		for ( let i = 1; i < contents.length;i++ ) {
			const m = contents[i].match(/(\W+?) (.*)/);
			if ( m ) {
				const key = K[m[1]] || m[1];
				if ( key === 'CategoryCode' ) {
					(() => {
						for ( const category of auctionOptions?.Categories as Category[] ) {
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
				} else if ( key === 'SkillOptions' ) {
					const opts = m[2].split(',');
					const value: SearchDetailOption = {};
					const skill = auctionOptions?.SkillOptions?.find(
						(skill) => T(skill.Text?.toLowerCase()) === T(opts[0].toLowerCase())
					);
					if ( skill ) {
						value.FirstOption = skill.Value;
						const sub = skill.Tripods?.find((tridpod) => T(tridpod.Text?.toLowerCase()).includes(T(opts[1].toLowerCase())));
						if ( sub ) {
							value.SecondOption = sub.Value;
						}
						if ( opts[2] ) {
							value.MinValue = +opts[2];
						}
						if ( opts[3] ) {
							value.MaxValue = +opts[3];
						}
					}
					obj.SkillOptions?.push(value);
				} else if ( key === 'EtcOptions' ) {
					const opts = m[2].split(',');
					const value: SearchDetailOption = {};
					const etc = auctionOptions?.EtcOptions?.find(
						(etc) => T(etc.Text?.toLowerCase()).includes(T(opts[0].toLowerCase()))
					);
					console.log(opts, etc);
					if ( etc ) {
						value.FirstOption = etc.Value;
						const sub = etc.EtcSubs?.find((sub) => T(sub.Text?.toLowerCase()).includes(T(opts[1].toLowerCase())));
						if ( sub ) {
							value.SecondOption = sub.Value;
						}
						if ( opts[2] ) {
							value.MinValue = +opts[2];
						}
						if ( opts[3] ) {
							value.MaxValue = +opts[3];
						}
						obj.EtcOptions?.push(value);
					}
				} else {
					obj[key] = m[2];
				}
			}
		}
	}

	if ( !obj.CategoryCode ) {
		return '카테고리 코드가 필요합니다.';
	}

	const data = await auctions(obj);
	return `검색된 총 아이템 수: ${data.TotalCount}\n(상위 10개의 아이템만 보여줍니다.)\n\n` +
	joinResultItems(data.Items as any[], (item, idx) => `${idx+1}. [${item.Name}]\n` +
	`┣ 등급: ${item.Grade}\n` +
	`┣ 티어: ${item.Tier}\n` +
	(item.GradeQuality ? `┣ 품질: ${item.GradeQuality}\n` : '') +
	`┣ 최소 입찰가: ${item.AuctionInfo?.BidStartPrice} 💰\n` +
	`┣ 즉시 구매가: ${item.AuctionInfo?.BuyPrice || '-'} 💰\n` +
	(Number.isInteger(item.AuctionInfo?.TradeAllowCount) ? `┣ 구매 후 남은 거래 횟수: ${item.AuctionInfo?.TradeAllowCount}\n` : '') +
	'┣ ' + item.Options?.map(deserializeItemOption).filter((s) => s).join('\n┣ '), 1, '\n\n', 0);
}
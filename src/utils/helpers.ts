import { AssetBase, ITraitFrequency } from 'index';

export function addTraitCountAsTrait(nfts: AssetBase[]): void {
    nfts.forEach(nft => {
        let traitCount = Object.keys(nft.tokenAttributes).length;
        if (nft.tokenAttributes.find(ta => ta.key === 'STATUS' && ta.value === 'UNREVEALED') && traitCount > 1)
            traitCount--;
        nft.tokenAttributes.push({ key: 'TraitCount', type: 'NUMBER', value: traitCount.toString() }); // Add TraitCount as an artificial trait
    });
}

export function calculatePercentages(traitFrequencies: ITraitFrequency, assetsTotal: number) {
    const percentages: ITraitFrequency = {};
    for (const category in traitFrequencies) {
        percentages[category] = {};
        for (const trait in traitFrequencies[category]) {
            const count = traitFrequencies[category][trait];
            const percentage = (count / assetsTotal) * 100;
            percentages[category][trait] = parseFloat(percentage.toFixed(2)); // Keeping two decimal places for readability
        }
    }
    return percentages;
}

export function calculateTraitFrequencies(nfts: AssetBase[]): ITraitFrequency {
    const frequencies: ITraitFrequency = {};
    nfts.forEach(nft => {
        nft.tokenAttributes.forEach(({ key, value }) => {
            if (!frequencies[key]) {
                frequencies[key] = {};
            }
            if (!frequencies[key][value]) {
                frequencies[key][value] = 1;
            } else {
                frequencies[key][value]++;
            }
        });
    });
    if (frequencies['STATUS'] && frequencies['STATUS']['UNREVEALED'] && Object.keys(frequencies).length > 1) {
        delete frequencies['STATUS']['UNREVEALED'];
    }
    return frequencies;
}

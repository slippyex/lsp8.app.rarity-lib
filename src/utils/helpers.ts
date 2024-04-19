import { IAssetBase, TraitFrequency } from 'index';

export function addTraitCountAsTrait(nfts: IAssetBase[]): void {
    nfts.forEach(nft => {
        let traitCount = Object.keys(nft.tokenAttributes).length;
        if (nft.tokenAttributes.find(ta => ta.key === 'STATUS' && ta.value === 'UNREVEALED') && traitCount > 1)
            traitCount--;
        nft.tokenAttributes.push({ key: 'TraitCount', type: 'NUMBER', value: traitCount.toString() }); // Add TraitCount as an artificial trait
    });
}

export function calculatePercentages(traitFrequencies: TraitFrequency, assetsTotal: number) {
    const percentages: TraitFrequency = {};
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

export function calculateTraitFrequencies(nfts: IAssetBase[]): TraitFrequency {
    const frequencies: TraitFrequency = {};
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
